import { useState, useEffect, useRef } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// ── Pixel ────────────────────────────────────────────────────────────────────

function firePixelPurchase() {
  try {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: 97.00,
        currency: 'USD',
        content_name: 'The Luxe Editorial Vault - Founding Access',
        content_type: 'product',
      });
    }
  } catch (_) {}
}

// ── Stripe Payment Step ──────────────────────────────────────────────────────

function PaymentStep({ stripe, clientSecret, email }) {
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mountRef = useRef(null);

  useEffect(() => {
    if (!stripe || !clientSecret || !mountRef.current) return;
    const appearance = {
      theme: 'night',
      variables: {
        colorPrimary: '#B89A61',
        colorBackground: '#171615',
        colorText: '#EFE7DC',
        colorTextSecondary: '#8A8177',
        colorDanger: '#c0392b',
        fontFamily: 'Jost, sans-serif',
        borderRadius: '0px',
        spacingUnit: '5px',
      },
      rules: {
        '.Input': { border: '0.5px solid rgba(184,154,97,0.3)', color: '#EFE7DC' },
        '.Input:focus': { border: '0.5px solid rgba(184,154,97,0.75)', boxShadow: 'none' },
        '.Label': { color: '#8A8177', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' },
        '.Tab': { border: '0.5px solid rgba(184,154,97,0.2)' },
        '.Tab--selected': { borderColor: '#B89A61', color: '#B89A61' },
      },
    };
    const els = stripe.elements({ clientSecret, appearance });
    const pe = els.create('payment', {
      layout: 'tabs',
      wallets: { applePay: 'auto', googlePay: 'auto' },
    });
    pe.on('loaderror', (e) => console.error('[Luxe Stripe] Payment Element load error:', e));
    pe.mount(mountRef.current);
    setElements(els);
    return () => { try { pe.unmount(); } catch (_) {} };
  }, [stripe, clientSecret]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements || loading) return;
    setLoading(true);
    setError('');

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: window.location.origin + '/access-confirmed-luxe',
        receipt_email: email,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed. Please try again.');
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      firePixelPurchase();
      fetch('/.netlify/functions/post-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, payment_intent_id: paymentIntent.id }),
      }).catch(() => {});
      window.location.href = '/access-confirmed-luxe?session_id=' + paymentIntent.id;
    } else {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div ref={mountRef} style={{ minHeight: '140px' }} />
      {error && (
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', color: '#c0392b', marginTop: '12px', lineHeight: 1.5 }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !elements}
        style={{
          display: 'block', width: '100%', marginTop: '24px',
          background: loading || !elements ? 'rgba(216,197,165,0.4)' : '#D8C5A5',
          color: '#0D0D0D', border: 'none',
          cursor: loading || !elements ? 'default' : 'pointer',
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
          letterSpacing: '0.15em', textTransform: 'uppercase', padding: '18px 24px',
          transition: 'opacity 0.2s', minHeight: '44px',
        }}
      >
        {loading ? 'Processing...' : 'Complete Founding Access →'}
      </button>
    </form>
  );
}

// ── Inline Payment Form ──────────────────────────────────────────────────────

function InlinePaymentForm() {
  const [stripeInstance, setStripeInstance] = useState(null);
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!PUBLISHABLE_KEY) return;
    if (window.Stripe) { setStripeInstance(window.Stripe(PUBLISHABLE_KEY)); return; }
    if (document.querySelector('script[src*="js.stripe.com/v3"]')) {
      const check = setInterval(() => {
        if (window.Stripe) { setStripeInstance(window.Stripe(PUBLISHABLE_KEY)); clearInterval(check); }
      }, 100);
      return () => clearInterval(check);
    }
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => setStripeInstance(window.Stripe(PUBLISHABLE_KEY));
    document.head.appendChild(script);
  }, []);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!stripeInstance) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/create-payment-intent-luxe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch (err) {
      setError(err.message || 'Unable to start checkout. Please check your connection and try again.');
    }
    setLoading(false);
  }

  if (step === 'payment' && stripeInstance && clientSecret) {
    return (
      <div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: 'rgba(239,231,220,0.45)', marginBottom: '20px', letterSpacing: '0.05em' }}>
          Payment for {email}
        </p>
        <PaymentStep stripe={stripeInstance} clientSecret={clientSecret} email={email} />
      </div>
    );
  }

  return (
    <form onSubmit={handleEmailSubmit}>
      <label style={{
        display: 'block', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px',
        letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8177', marginBottom: '8px',
      }}>
        Your Email Address
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
        placeholder="you@example.com"
        required
        autoComplete="email"
        style={{
          display: 'block', width: '100%', padding: '14px',
          background: 'rgba(239,231,220,0.06)',
          border: error ? '0.5px solid #c0392b' : '0.5px solid rgba(184,154,97,0.35)',
          color: '#EFE7DC', fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px',
          outline: 'none', WebkitAppearance: 'none',
        }}
      />
      {error && (
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', color: '#e07070', marginTop: '6px', lineHeight: 1.5 }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !stripeInstance}
        style={{
          display: 'block', width: '100%', marginTop: '16px',
          background: loading || !stripeInstance ? 'rgba(216,197,165,0.4)' : '#D8C5A5',
          color: '#0D0D0D', border: 'none',
          cursor: loading || !stripeInstance ? 'default' : 'pointer',
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
          letterSpacing: '0.15em', textTransform: 'uppercase', padding: '18px 24px',
          minHeight: '44px',
        }}
      >
        {loading ? 'Just a moment...' : !stripeInstance ? 'Loading...' : 'Complete Founding Access →'}
      </button>
    </form>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What exactly is ♛ The Luxe Editorial Vault™?',
    a: 'It is a private creative and strategic environment — The Luxury Brand Studio — for founders who want to build brands with clarity, distinction and intention.',
  },
  {
    q: 'Is this an AI prompt library?',
    a: 'It goes beyond prompts. Every scene is written as a complete creative brief with context, mood and direction. The Studio, Director Bot and strategy modules add a full creative and strategic architecture.',
  },
  {
    q: 'What is Founding Access?',
    a: 'A one-time $97 payment that gives you permanent access at the founding price — including all future volumes and features as they release.',
  },
  {
    q: 'What is the Director Bot™?',
    a: '♛ The Luxe Branding System™ Director Bot™ is a strategic AI companion for luxury positioning, brand strategy, messaging, visual direction, campaigns and content — available to Premium Members.',
  },
  {
    q: 'Who is this for?',
    a: 'Founders, creatives and consultants building personal or business brands who want their brand to feel more intentional, premium and distinctive.',
  },
  {
    q: 'What happens after I join?',
    a: 'You receive instant access to the Vault where you can set up your Brand Profile and begin exploring the editorial library and creative tools immediately.',
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
      {faqs.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid #D8C5A5' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', textAlign: 'left', background: 'none', border: 'none',
              padding: '1.4rem 0', cursor: 'pointer', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
            }}
          >
            <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '18px', color: '#0D0D0D', lineHeight: 1.4 }}>
              {item.q}
            </span>
            <span style={{ color: '#8A8177', fontSize: '1.1rem', flexShrink: 0, fontFamily: "'Jost', sans-serif" }}>
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px',
              color: '#2A211C', lineHeight: 1.8, paddingBottom: '1.4rem',
            }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Vault Bullets ────────────────────────────────────────────────────────────

const vaultItems = [
  '110+ luxury editorial AI prompts and scenes across all volumes',
  'Creative Director Studio™ (Prompt Builder, Campaign Builder, Editorial Calendar)',
  'Director Bot™ — strategic AI brand companion',
  'Brand Profile — save your house codes and voice',
  'Favorites and personal shelf',
  'All future volume releases included',
  'Founding member price — locked forever',
];

function VaultBullets() {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {vaultItems.map((item) => (
        <li key={item} style={{
          display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
          marginBottom: '0.9rem',
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '15px',
          lineHeight: 1.7, color: '#EFE7DC',
        }}>
          <span style={{ color: '#B89A61', flexShrink: 0, marginTop: '2px' }}>♛</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LuxePage() {
  useEffect(() => {
    document.title = '♛ The Luxe Editorial Vault™ | The Luxury Brand Studio';

    const metaTags = {
      'description': '♛ The Luxe Editorial Vault™ is a Luxury Brand Studio for women building distinctive brands with curated editorial scenes, creative direction, strategic tools and premium brand systems.',
      'og:title': '♛ The Luxe Editorial Vault™ | The Luxury Brand Studio',
      'og:description': 'The Luxury Brand Studio for founders building brands with distinction, clarity and intention.',
      'og:url': 'https://bossfacelessmentor.com/luxe',
      'robots': 'index, follow',
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    });
  }, []);

  function scrollTo(id) {
    return (e) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
  }

  const label = (text, overrides = {}) => (
    <p style={{
      fontFamily: "'Jost', sans-serif", fontWeight: 300,
      fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
      color: '#B89A61', marginBottom: '20px', ...overrides,
    }}>{text}</p>
  );

  const divider = (
    <div style={{ width: '40px', height: '1px', background: '#B89A61', margin: '40px auto' }} />
  );

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", color: '#2A211C', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3 { font-family: 'Bodoni Moda', Georgia, serif; font-weight: 400; }

        .luxe-hero { display: grid; grid-template-columns: 55% 45%; min-height: 90vh; }
        .luxe-hero-img { height: 100%; object-fit: cover; border-radius: 2px; width: 100%; display: block; }
        .luxe-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .luxe-four-col { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
        .luxe-two-col-studio { display: grid; grid-template-columns: 45% 55%; gap: 60px; }
        .luxe-five-col { display: grid; grid-template-columns: repeat(5,1fr); gap: 0; }
        .luxe-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem 3rem; }
        .luxe-lifestyle { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .luxe-hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
        .luxe-final-btns { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

        @media (max-width: 900px) {
          .luxe-four-col { grid-template-columns: 1fr 1fr; }
          .luxe-two-col-studio { grid-template-columns: 1fr; gap: 40px; }
          .luxe-five-col { grid-template-columns: 1fr 1fr; }
          .luxe-lifestyle { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .luxe-hero { grid-template-columns: 1fr; min-height: auto; }
          .luxe-hero-mobile-img { display: block; }
          .luxe-hero-desktop-img { display: none; }
          .luxe-two-col { grid-template-columns: 1fr; }
          .luxe-four-col { grid-template-columns: 1fr; }
          .luxe-five-col { grid-template-columns: 1fr; }
          .luxe-benefits-grid { grid-template-columns: 1fr; }
          .luxe-hero-btns { flex-direction: column; }
        }
        @media (min-width: 641px) {
          .luxe-hero-mobile-img { display: none; }
          .luxe-hero-desktop-img { display: block; }
        }
      `}</style>

      {/* ── SECTION 1 — HERO ── */}
      <section style={{ background: '#0D0D0D', padding: 0 }}>
        <div className="luxe-hero">
          {/* Left: Copy */}
          <div style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,6%,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {label('The Luxury Brand Studio', { fontSize: '14px' })}
            <h1 style={{ lineHeight: 1.15, color: '#F7F2EA', fontWeight: 400 }}>
              <span style={{ display: 'block', fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', whiteSpace: 'nowrap', marginBottom: '6px' }}>
                ♛ The Luxe Editorial Vault™
              </span>
              <span style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                <em style={{ fontStyle: 'italic' }}>is the Luxury Brand Studio</em><br />
                for women building<br />
                distinctive brands<br />
                <em style={{ color: '#D8C5A5', fontStyle: 'italic' }}>with editorial taste,</em><br />
                <em style={{ color: '#D8C5A5', fontStyle: 'italic' }}>strategic direction</em><br />
                <em style={{ color: '#D8C5A5', fontStyle: 'italic' }}>and intention.</em>
              </span>
            </h1>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300,
              fontSize: 'clamp(17px, 2vw, 20px)',
              color: '#8A8177', lineHeight: 1.8, maxWidth: '560px', marginTop: '32px',
            }}>
              110+ curated editorial scenes & creative prompts, plus the tools and strategic direction to build your brand world with intention.
            </p>
            {/* Mobile image */}
            <img
              className="luxe-hero-mobile-img"
              src="/images/lume-hero.jpg"
              alt="Lumé in an elegant European café surrounded by warm golden light and refined Mediterranean-inspired architecture."
              style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'left top', borderRadius: '2px', marginTop: '32px' }}
            />
            <div className="luxe-hero-btns" style={{ marginTop: '40px' }}>
              <a
                href="#payment"
                onClick={scrollTo('payment')}
                style={{
                  background: '#D8C5A5', color: '#0D0D0D', textDecoration: 'none',
                  fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '16px 40px', display: 'inline-block',
                }}
              >
                ENTER THE VAULT — $97
              </a>
              <a
                href="#vault-section"
                onClick={scrollTo('vault-section')}
                style={{
                  border: '1px solid #B89A61', color: '#D8C5A5', background: 'transparent',
                  textDecoration: 'none',
                  fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '16px 40px', display: 'inline-block',
                }}
              >
                EXPLORE INSIDE
              </a>
            </div>
          </div>

          {/* Right: Image (desktop only) */}
          <div className="luxe-hero-desktop-img" style={{ overflow: 'hidden', minHeight: '90vh' }}>
            <img
              src="/images/lume-hero.jpg"
              alt="Lumé in an elegant European café surrounded by warm golden light and refined Mediterranean-inspired architecture."
              className="luxe-hero-img"
              style={{ height: '100%', minHeight: '90vh', objectPosition: 'left top' }}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — THE SHIFT ── */}
      <section style={{ background: '#F7F2EA', padding: '100px 6%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {label('More Than a Prompt Vault.')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '24px' }}>
            A Private Creative and Strategic Environment.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '20px', color: '#2A211C', lineHeight: 1.8 }}>
            ♛ The Luxe Editorial Vault™ is designed to help you decide what your brand should say, show, build and become.
          </p>
          {divider}
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8177', marginBottom: '20px' }}>
            The Luxury Brand Operating System
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#2A211C', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto' }}>
            The system combines creative direction, editorial resources, visual storytelling, brand strategy, campaign thinking, strategic AI and member tools — in one private environment.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 — 110+ LIBRARY ── */}
      <section id="vault-section" style={{ background: '#0D0D0D', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {label('The Creative Library')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F7F2EA', marginBottom: '24px' }}>
            110+ Curated Editorial Scenes & Creative Prompts.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#8A8177', lineHeight: 1.8, maxWidth: '640px', marginBottom: '60px' }}>
            An evolving library of cinematic scenes, visual concepts, quote aesthetics and founder storytelling — designed to help you build a distinctive visual world.
          </p>
          <div className="luxe-two-col">
            <div style={{ border: '1px solid #2A211C', padding: '40px', background: '#171615' }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B89A61', marginBottom: '20px' }}>
                51 Scenes
              </p>
              {[
                '41 Editorial Scenes™ across Volumes I–IV',
                '10 Founder Symbols™ storytelling scenes',
              ].map((item) => (
                <p key={item} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#EFE7DC', lineHeight: 2 }}>
                  · {item}
                </p>
              ))}
            </div>
            <div style={{ border: '1px solid #2A211C', padding: '40px', background: '#171615' }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B89A61', marginBottom: '20px' }}>
                59 Creative Prompts
              </p>
              {[
                '24 Premium Quote Aesthetics™',
                '10 Viral Quote Images™',
                '15 Premium Aesthetic Scenes™',
                '10 Luxury Object Quotes™',
              ].map((item) => (
                <p key={item} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#EFE7DC', lineHeight: 2 }}>
                  · {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — EDITORIAL VOLUMES ── */}
      <section style={{ background: '#F7F2EA', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {label('Editorial Volumes')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '48px' }}>
            Four Volumes. One Brand World.
          </h2>
          <div className="luxe-four-col">
            {[
              { vol: 'Volume I', title: 'Morning Rituals', count: '12 scenes', badge: null },
              { vol: 'Volume II', title: 'The Travelled Life', count: '4 scenes', badge: null },
              { vol: 'Volume III', title: 'The House Codes', count: '10 scenes', badge: null },
              { vol: 'Volume IV', title: 'CEO Life™', count: '15 scenes', badge: 'FULLY AUTHORED — IN STUDIO' },
            ].map((v) => (
              <div key={v.vol} style={{ background: '#EFE7DC', border: '1px solid #D8C5A5', padding: '40px', borderRadius: '2px' }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8177', marginBottom: '12px' }}>
                  {v.vol}
                </p>
                <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '24px', color: '#0D0D0D', marginBottom: '8px', lineHeight: 1.3 }}>
                  {v.title}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '14px', color: '#8A8177' }}>
                  {v.count}
                </p>
                {v.badge && (
                  <p style={{
                    marginTop: '16px', display: 'inline-block',
                    border: '1px solid #B89A61', color: '#B89A61',
                    fontFamily: "'Jost', sans-serif", fontWeight: 300,
                    fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '4px 10px',
                  }}>
                    {v.badge}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — BONUS COLLECTIONS ── */}
      <section style={{ background: '#0D0D0D', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {label('Bonus Collections')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F7F2EA', marginBottom: '48px' }}>
            Beyond the Volumes.
          </h2>
          <div className="luxe-five-col">
            {[
              { name: 'Premium Quote Aesthetics™', count: '24 prompts' },
              { name: 'Viral Quote Images™', count: '10 prompts' },
              { name: 'Premium Aesthetic Scenes™', count: '15 prompts' },
              { name: 'Luxury Object Quotes™', count: '10 prompts' },
              { name: 'Founder Symbols™', count: '10 scenes' },
            ].map((c) => (
              <div key={c.name} style={{ borderTop: '1px solid #2A211C', padding: '32px 24px 32px 0' }}>
                <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '17px', color: '#EFE7DC', marginBottom: '8px', lineHeight: 1.4 }}>
                  {c.name}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px', color: '#8A8177' }}>
                  {c.count}
                </p>
              </div>
            ))}
          </div>
          <div style={{ background: '#171615', border: '1px solid #2A211C', padding: '32px', marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#8A8177', marginBottom: '8px' }}>
              Editorial Campaign Concepts™
            </p>
            <p style={{
              display: 'inline-block', border: '1px solid #2A211C', color: '#8A8177',
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10px',
              letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: '12px',
            }}>
              Coming Soon
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '14px', color: '#8A8177', lineHeight: 1.7 }}>
              A new collection currently in development.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — FOUR PILLARS ── */}
      <section style={{ background: '#F7F2EA', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {label('The System')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '48px' }}>
            The House, in Four Pillars.
          </h2>
          <div className="luxe-four-col">
            {[
              { pillar: 'Pillar I', name: 'Editorial Vault™', desc: 'Create the visual world.', badge: null },
              { pillar: 'Pillar II', name: 'Creative Director Studio™', desc: 'Direct the work.', badge: null },
              { pillar: 'Pillar III', name: 'Director Bot™', desc: 'Think strategically.', badge: null },
              { pillar: 'Pillar IV', name: 'Member Academy™', desc: 'Master the system.', badge: 'COMING SOON' },
            ].map((p) => (
              <div key={p.pillar} style={{ background: '#EFE7DC', border: '1px solid #D8C5A5', padding: '40px' }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A8177', marginBottom: '12px' }}>
                  {p.pillar}
                </p>
                <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '20px', color: '#0D0D0D', marginBottom: '8px', lineHeight: 1.35 }}>
                  {p.name}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '15px', color: '#8A8177' }}>
                  {p.desc}
                </p>
                {p.badge && (
                  <p style={{
                    marginTop: '16px', display: 'inline-block',
                    border: '1px solid #8A8177', color: '#8A8177',
                    fontFamily: "'Jost', sans-serif", fontWeight: 300,
                    fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '4px 10px',
                  }}>
                    {p.badge}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — CREATIVE DIRECTOR STUDIO ── */}
      <section style={{ background: '#171615', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="luxe-two-col-studio">
            <div>
              {label('Pillar II')}
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F7F2EA', marginBottom: '24px' }}>
                Your Creative World. In One Place.
              </h2>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#8A8177', lineHeight: 1.8 }}>
                A private creative environment for building your brand deliberately — not reactively.
              </p>
            </div>
            <div>
              {[
                'Prompt Builder',
                'Campaign Builder',
                'Editorial Calendar',
                'Brand Profile',
                'Scene Detail',
                'Favorites & Personal Shelf',
                'Notes & Workspace',
                'Progress Tracking',
                'Editorial Reading Mode',
              ].map((item) => (
                <div key={item} style={{ borderBottom: '1px solid #2A211C', padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#B89A61', flexShrink: 0, fontSize: '14px' }}>♛</span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#EFE7DC' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8 — DIRECTOR BOT ── */}
      <section style={{ background: '#F7F2EA', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {label('Pillar III')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '24px' }}>
            Your Brand Deserves a Strategic Director.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#2A211C', lineHeight: 1.8, maxWidth: '600px', marginBottom: '48px' }}>
            ♛ The Luxe Branding System™ Director Bot™ helps members develop positioning, brand strategy, messaging, visual direction, campaigns and content systems.
          </p>
          <div className="luxe-two-col" style={{ marginBottom: '32px' }}>
            <div style={{ background: '#EFE7DC', border: '1px solid #D8C5A5', padding: '40px', borderRadius: '2px' }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B89A61', marginBottom: '12px' }}>
                Premium Editorial Image Direction
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#8A8177' }}>
                10 resources
              </p>
            </div>
            <div style={{ background: '#EFE7DC', border: '1px solid #D8C5A5', padding: '40px', borderRadius: '2px' }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B89A61', marginBottom: '12px' }}>
                Luxury Brand Strategy™
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#8A8177', marginBottom: '16px' }}>
                10 modules
              </p>
              {[
                'Positioning Architecture', 'Offer Architecture', 'Signature Method Creation',
                'Category Design', 'Luxury Brand Perception', 'Brand Narrative',
                'Messaging Frameworks', 'Content Ecosystem Design', 'Authority Building',
                'Premium Pricing Psychology',
              ].map((m) => (
                <p key={m} style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '15px', color: '#2A211C', lineHeight: 2 }}>
                  · {m}
                </p>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              display: 'inline-block', background: '#0D0D0D', padding: '16px 32px',
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12px',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D8C5A5',
            }}>
              Reserved for Premium Members
            </p>
          </div>
          <a
            href="#payment"
            onClick={scrollTo('payment')}
            style={{
              display: 'inline-block', border: '1px solid #B89A61', color: '#B89A61',
              background: 'transparent', textDecoration: 'none',
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
              letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 36px',
            }}
          >
            Meet the Director Bot™
          </a>
        </div>
      </section>

      {/* ── SECTION 9 — BEAUTIFUL IS NOT A STRATEGY ── */}
      <section style={{ background: '#0D0D0D', padding: '100px 6%' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F7F2EA', marginBottom: '24px' }}>
            Beautiful Is Not a Strategy.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#8A8177', lineHeight: 1.8, marginBottom: '48px' }}>
            Behind every distinctive brand is a clear strategic architecture.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              'Positioning Architecture', 'Offer Architecture', 'Signature Method Creation',
              'Category Design', 'Luxury Brand Perception', 'Brand Narrative',
              'Messaging Frameworks', 'Content Ecosystem Design', 'Authority Building',
              'Premium Pricing Psychology',
            ].map((pill) => (
              <span key={pill} style={{
                border: '1px solid #2A211C', padding: '12px 24px',
                fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '14px',
                color: '#EFE7DC', borderRadius: '1px',
              }}>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10 — BUILD WITH INTENTION ── */}
      <section style={{ background: '#F7F2EA', padding: '120px 6%' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          {label('The Philosophy', { textAlign: 'center' })}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '48px' }}>
            Build With Intention.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '20px', color: '#2A211C', lineHeight: 2, whiteSpace: 'pre-line' }}>
            {`Luxury is not about adding more.\n\nIt is about knowing what belongs.\n\nEvery image.\nEvery sentence.\nEvery offer.\nEvery decision.\n\nBecomes part of a world.\n\nBuild with intention.`}
          </p>
          <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '20px', color: '#B89A61', marginTop: '40px' }}>
            ♛ The Luxe Editorial Vault™
          </p>
        </div>
      </section>

      {/* ── SECTION 11 — WHO IT IS FOR ── */}
      <section style={{ background: '#171615', padding: '100px 6%' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {label('Who It Is For')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F7F2EA', maxWidth: '620px', marginBottom: '48px', lineHeight: 1.3 }}>
            For the Woman Who Is Done Building a Brand That Looks Like Everyone Else.
          </h2>
          <div className="luxe-two-col" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[
              { type: 'The Builder', quote: 'I know I have something. I need the direction to build it properly.' },
              { type: 'The Refiner', quote: 'My brand exists. Now I want it to feel distinctive, intentional and premium.' },
              { type: 'The Founder', quote: 'I want my brand to become an asset — not another thing I constantly have to manage.' },
            ].map((c) => (
              <div key={c.type} style={{ background: '#0D0D0D', border: '1px solid #2A211C', padding: '48px', borderRadius: '2px' }}>
                <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '20px', color: '#D8C5A5', marginBottom: '16px' }}>
                  {c.type}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#8A8177', lineHeight: 1.8 }}>
                  "{c.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12 — MEMBER EXPERIENCE ── */}
      <section style={{ background: '#F7F2EA', padding: '100px 6%' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          {label('The Studio Evolves')}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '48px' }}>
            The Studio Evolves as Your Brand Evolves.
          </h2>
          <div className="luxe-benefits-grid">
            {[
              'Evolving editorial collections',
              'New strategic modules',
              'Director Bot development',
              'Campaign systems',
              'New visual concepts',
              'Personalized brand profile',
              'Saved work and notes',
              'Favorites',
              'Progress tracking',
              'Editorial reading mode',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '6px 0' }}>
                <span style={{ color: '#B89A61', flexShrink: 0 }}>♛</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '16px', color: '#2A211C', lineHeight: 2 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 13 — LIFESTYLE IMAGE ── */}
      <section style={{ background: '#EFE7DC', padding: '100px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="luxe-lifestyle">
            {/* Image */}
            <div>
              <img
                src="/images/lume-lifestyle.jpg"
                alt="Lumé in an elegant European café surrounded by warm golden light and refined Mediterranean-inspired architecture."
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '2px', display: 'block' }}
              />
            </div>
            {/* Copy */}
            <div style={{ paddingLeft: '0' }}>
              {label('The Woman Who Uses This')}
              <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '32px', color: '#0D0D0D', marginBottom: '24px', lineHeight: 1.3 }}>
                She Already Knows What She Wants.
              </h2>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#2A211C', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {`She has an audience, an offer, a presence.\n\nWhat she is building now is distinction.\n\nA brand world that feels unmistakably hers — considered, elevated and impossible to imitate.`}
              </p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: '16px', color: '#8A8177', marginTop: '24px' }}>
                50+ scenes. Her story. Her brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 14 — AFFILIATE ── */}
      <section style={{ background: '#F7F2EA', padding: '80px 6%' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          {label('Share the Vault', { textAlign: 'center' })}
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '24px' }}>
            Love It? Share It.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '18px', color: '#2A211C', lineHeight: 1.8, marginBottom: '32px' }}>
            Our founding affiliate program pays 70% commission — $67.90 per sale. Share your unique link and earn every time someone joins through you.
          </p>
          <a
            href="mailto:bossdigitalera@gmail.com?subject=Luxe Affiliate Application"
            style={{
              display: 'inline-block', border: '1px solid #B89A61', color: '#B89A61',
              background: 'transparent', textDecoration: 'none',
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 36px',
            }}
          >
            Apply to Become an Affiliate
          </a>
        </div>
      </section>

      {/* ── SECTION 15 — PAYMENT ── */}
      <section id="payment" style={{ background: '#0D0D0D', padding: '100px 6%' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            {label('Founding Access', { textAlign: 'center' })}
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#F7F2EA', marginBottom: '1rem', lineHeight: 1.25 }}>
              Founding Access. One Time. Yours Forever.
            </h2>
            <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: 'clamp(3.5rem,9vw,5.5rem)', color: '#D8C5A5', lineHeight: 1 }}>
                $97
              </span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(216,197,165,0.35)', textDecoration: 'line-through' }}>
                  Future price: $27/month
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A8177', marginTop: '4px' }}>
                  One time · Forever
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'left', margin: '1.5rem 0 2.5rem', padding: '1.5rem', border: '0.5px solid rgba(184,154,97,0.25)' }}>
              <VaultBullets />
            </div>
          </div>
          <InlinePaymentForm />
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12px',
            color: '#8A8177', lineHeight: 1.7, marginTop: '1.5rem', textAlign: 'center',
          }}>
            Results shown are examples only and are not guaranteed. Individual outcomes depend on effort, experience and market conditions.
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '9px',
            color: 'rgba(138,129,119,0.5)', marginTop: '0.75rem', textAlign: 'center', letterSpacing: '0.08em',
          }}>
            Secured by Stripe · 256-bit SSL
          </p>
        </div>
      </section>

      {/* ── SECTION 16 — FAQ ── */}
      <section style={{ background: '#F7F2EA', padding: '100px 6%' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#0D0D0D', marginBottom: '48px' }}>
            Questions.
          </h2>
          <FAQ />
        </div>
      </section>

      {/* ── SECTION 17 — FINAL CTA ── */}
      <section style={{ background: '#0D0D0D', padding: '120px 6%' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F7F2EA', marginBottom: '16px', lineHeight: 1.2 }}>
            Build a Brand That Feels Like Your Next Era.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: '18px', color: '#8A8177', marginBottom: '48px' }}>
            Build with intention.
          </p>
          <div className="luxe-final-btns">
            <a
              href="#payment"
              onClick={scrollTo('payment')}
              style={{
                background: '#D8C5A5', color: '#0D0D0D', textDecoration: 'none',
                fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '18px 48px', display: 'inline-block',
              }}
            >
              Enter the Luxe Editorial Vault™ — $97
            </a>
            <a
              href="#vault-section"
              onClick={scrollTo('vault-section')}
              style={{
                border: '1px solid #B89A61', color: '#D8C5A5', background: 'transparent',
                textDecoration: 'none',
                fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '13px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '18px 48px', display: 'inline-block',
              }}
            >
              Explore the Studio
            </a>
          </div>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '12px', color: '#8A8177', marginTop: '60px' }}>
            ♛ The Luxe Editorial Vault™ · All rights reserved
          </p>
        </div>
      </section>
    </div>
  );
}

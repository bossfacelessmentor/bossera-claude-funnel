import { useState, useEffect, useRef } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

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

function PaymentStep({ stripe, clientSecret, email, onError }) {
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mountRef = useRef(null);

  useEffect(() => {
    if (!stripe || !clientSecret || !mountRef.current) return;
    const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#1E1530',
        colorBackground: '#F5F0EA',
        colorText: '#2D1B3D',
        colorTextSecondary: '#8B7355',
        colorDanger: '#c0392b',
        fontFamily: 'Jost, sans-serif',
        borderRadius: '0px',
        spacingUnit: '5px',
      },
      rules: {
        '.Input': { border: '0.5px solid rgba(139,115,85,0.4)', color: '#2D1B3D' },
        '.Input:focus': { border: '0.5px solid #8B7355', boxShadow: 'none' },
        '.Label': { color: '#8B7355', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' },
        '.Tab': { border: '0.5px solid rgba(139,115,85,0.3)' },
        '.Tab--selected': { borderColor: '#1E1530', color: '#1E1530' },
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
          background: loading || !elements ? 'rgba(30,21,48,0.4)' : '#1E1530',
          color: '#C9A84C', border: 'none',
          cursor: loading || !elements ? 'default' : 'pointer',
          fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', padding: '20px 24px',
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

  const labelStyle = {
    display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '9px',
    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '8px',
  };

  if (step === 'payment' && stripeInstance && clientSecret) {
    return (
      <div>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: 'rgba(237,226,212,0.5)', marginBottom: '20px', letterSpacing: '0.05em' }}>
          Payment for {email}
        </p>
        <PaymentStep stripe={stripeInstance} clientSecret={clientSecret} email={email} />
      </div>
    );
  }

  return (
    <form onSubmit={handleEmailSubmit}>
      <label style={{ ...labelStyle, color: '#8B7355' }}>Your Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
        placeholder="you@example.com"
        required
        autoComplete="email"
        style={{
          display: 'block', width: '100%', padding: '14px',
          background: 'rgba(245,240,234,0.08)',
          border: error ? '0.5px solid #c0392b' : '0.5px solid rgba(139,115,85,0.4)',
          color: '#EDE2D4', fontFamily: "'Jost', sans-serif", fontSize: '16px',
          outline: 'none', WebkitAppearance: 'none',
        }}
      />
      {error && (
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: '#e07070', marginTop: '6px', lineHeight: 1.5 }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !stripeInstance}
        style={{
          display: 'block', width: '100%', marginTop: '16px',
          background: loading || !stripeInstance ? 'rgba(201,168,76,0.4)' : '#C9A84C',
          color: '#1E1530', border: 'none',
          cursor: loading || !stripeInstance ? 'default' : 'pointer',
          fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', padding: '20px 24px',
          minHeight: '44px',
        }}
      >
        {loading ? 'Just a moment...' : !stripeInstance ? 'Loading...' : 'Complete Founding Access →'}
      </button>
    </form>
  );
}

// ── FAQ Accordion ────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What exactly is The Luxe Editorial Vault™?',
    a: 'It is a private creative and strategic environment — a Luxury Brand Studio — for founders who want to build brands with clarity, distinction and intention.',
  },
  {
    q: 'Is this an AI prompt library?',
    a: 'It goes beyond prompts. Every scene is written as a complete creative brief with context, mood, and direction. The Studio and Director Bot add strategy and campaign architecture.',
  },
  {
    q: 'What is Founding Access?',
    a: 'A one-time $97 payment that gives you permanent access at the founding price — including all future volumes and features as they release.',
  },
  {
    q: 'What is the Director Bot™?',
    a: 'A strategic AI companion for luxury positioning, brand strategy, messaging, visual direction, campaigns and content — accessible inside the Studio.',
  },
  {
    q: 'Who is this for?',
    a: 'Founders, creatives, and consultants building personal or business brands who want their brand to feel more intentional, premium and distinctive.',
  },
  {
    q: 'What happens after I join?',
    a: 'You receive instant access to luxe-editorial-vault.lovable.app where you can set up your Brand Profile and begin exploring the Vault.',
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      {faqs.map((item, i) => (
        <div key={i} style={{ borderBottom: '0.5px solid rgba(139,115,85,0.25)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', textAlign: 'left', background: 'none', border: 'none',
              padding: '1.4rem 0', cursor: 'pointer', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
            }}
          >
            <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '1rem', color: '#2D1B3D', lineHeight: 1.4 }}>
              {item.q}
            </span>
            <span style={{ color: '#8B7355', fontSize: '1.1rem', flexShrink: 0, fontFamily: "'Jost', sans-serif" }}>
              {open === i ? '−' : '+'}
            </span>
          </button>
          {open === i && (
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.95rem',
              color: '#555', lineHeight: 1.75, paddingBottom: '1.4rem',
            }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── What's Inside bullets ────────────────────────────────────────────────────

const vaultItems = [
  '69+ luxury editorial AI prompts across 4 volumes',
  'Creative Director Studio™ (Prompt Builder, Campaign Builder, Editorial Calendar)',
  'Director Bot™ — strategic AI brand companion',
  'Brand Profile — save your house codes and voice',
  'Favorites and personal shelf',
  'All future volume releases included',
  'Founding member price — locked forever',
];

function VaultBullets({ onDark = false }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {vaultItems.map((item) => (
        <li key={item} style={{
          display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
          marginBottom: '0.9rem',
          fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.95rem',
          lineHeight: 1.6, color: onDark ? '#EDE2D4' : '#2D1B3D',
        }}>
          <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: '2px' }}>♛</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LuxePage() {
  useEffect(() => {
    document.title = "♛ The Luxe Editorial Vault™ | Founding Access — $97";

    const metaTags = {
      'description': 'A private creative and strategic environment for founders who want to build brands people recognize, trust, desire and remember. Founding access $97.',
      'og:title': '♛ The Luxe Editorial Vault™ | Founding Access',
      'og:description': 'The Luxury Brand Studio for founders building brands with distinction, clarity and intention.',
      'og:url': 'https://bossfacelessmentor.com/luxe',
      'robots': 'index, follow'
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

  function scrollToPayment(e) {
    e.preventDefault();
    const el = document.getElementById('payment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const sectionPad = { padding: 'clamp(4rem, 8vw, 6rem) 1.5rem' };
  const maxW = { maxWidth: '760px', margin: '0 auto' };
  const eyebrow = {
    fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em',
    textTransform: 'uppercase', color: '#8B7355',
  };

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", color: '#2D1B3D', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3 { font-family: 'Bodoni Moda', Georgia, serif; font-weight: 400; }
        .luxe-pillar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .luxe-who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 640px) {
          .luxe-pillar-grid { grid-template-columns: 1fr; }
          .luxe-who-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* A — HERO */}
      <section style={{ background: '#1E1530', color: '#EDE2D4', ...sectionPad }}>
        <div style={{ ...maxW, textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: 'rgba(201,168,76,0.7)', marginBottom: '1.5rem' }}>
            ♛ The Luxe Editorial Vault™
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.08, letterSpacing: '0.02em', marginBottom: '0.5rem', color: '#EDE2D4' }}>
            YOUR BRAND DOESN'T NEED MORE NOISE.
          </h1>
          <h2 style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', color: '#C9A84C', marginBottom: '2rem', lineHeight: 1.2 }}>
            It needs more clarity.
          </h2>
          <p style={{ fontWeight: 300, fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 2.5rem', color: 'rgba(237,226,212,0.8)' }}>
            A private creative and strategic environment for founders who want to build brands people recognize, trust, desire and remember.
          </p>
          <a
            href="#payment"
            onClick={scrollToPayment}
            style={{
              display: 'inline-block', background: '#C9A84C', color: '#1E1530',
              fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10px',
              letterSpacing: '0.22em', textTransform: 'uppercase', padding: '20px 48px',
              textDecoration: 'none',
            }}
          >
            Enter the Vault — $97 Founding Access
          </a>
        </div>
      </section>

      {/* B — WHAT IS IT */}
      <section style={{ background: '#F5F0EA', ...sectionPad }}>
        <div style={{ ...maxW, textAlign: 'center' }}>
          <p style={{ ...eyebrow, marginBottom: '1rem' }}>What Is It</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', marginBottom: '1.25rem', color: '#2D1B3D' }}>
            More Than a Prompt Library.
          </h2>
          <p style={{ fontWeight: 300, fontSize: '1rem', lineHeight: 1.8, color: '#555', maxWidth: '600px', margin: '0 auto 3rem' }}>
            The Luxe Editorial Vault™ is a curated creative and strategic environment designed to help you decide what your brand should say, show, build and become.
          </p>
          <div className="luxe-pillar-grid">
            {[
              { num: 'I.', title: 'Editorial Vault™', desc: '69+ curated editorial prompts and growing.' },
              { num: 'II.', title: 'Creative Director Studio™', desc: 'Prompt Builder, Campaign Builder, Editorial Calendar.' },
              { num: 'III.', title: 'Director Bot™', desc: 'Strategic AI companion for luxury positioning and brand strategy.' },
              { num: 'IV.', title: 'Member Academy™', desc: 'Coming Soon.' },
            ].map((p) => (
              <div key={p.num} style={{
                border: '0.5px solid #8B7355', padding: '1.75rem 1.5rem', textAlign: 'left',
              }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.2em', color: '#8B7355', marginBottom: '0.5rem' }}>
                  {p.num}
                </p>
                <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '1.05rem', color: '#2D1B3D', marginBottom: '0.5rem' }}>
                  {p.title}
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#666', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C — WHO IT'S FOR */}
      <section style={{ background: '#1E1530', ...sectionPad }}>
        <div style={{ ...maxW, textAlign: 'center' }}>
          <p style={{ ...eyebrow, color: 'rgba(201,168,76,0.6)', marginBottom: '1rem' }}>Who It's For</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#EDE2D4', maxWidth: '580px', margin: '0 auto 3rem', lineHeight: 1.3 }}>
            For the Woman Who Is Done Building a Brand That Looks Like Everyone Else.
          </h2>
          <div className="luxe-who-grid">
            {[
              { label: 'The Builder', desc: 'I know I have something. I need the clarity to build it properly.' },
              { label: 'The Refiner', desc: 'My brand exists. Now I need it to feel more distinctive and premium.' },
              { label: 'The Founder', desc: 'I am ready for my brand to become an asset rather than another thing I constantly manage.' },
            ].map((card) => (
              <div key={card.label} style={{
                border: '0.5px solid #8B7355', padding: '2rem 1.5rem', textAlign: 'left',
              }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '0.75rem' }}>
                  {card.label}
                </p>
                <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '1rem', color: '#EDE2D4', lineHeight: 1.6 }}>
                  "{card.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D — WHAT'S INSIDE */}
      <section style={{ background: '#F5F0EA', ...sectionPad }}>
        <div style={{ ...maxW }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ ...eyebrow, marginBottom: '1rem' }}>Everything Inside</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#2D1B3D' }}>
              Everything Inside Founding Access.
            </h2>
          </div>
          <VaultBullets onDark={false} />
        </div>
      </section>

      {/* E — MANIFESTO STRIP */}
      <section style={{ background: '#1E1530', padding: 'clamp(3.5rem, 7vw, 5rem) 1.5rem', textAlign: 'center' }}>
        <blockquote style={{
          fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: '#EDE2D4', lineHeight: 1.5,
          maxWidth: '580px', margin: '0 auto 1.5rem',
        }}>
          "Luxury is not about having more.<br />
          It is about knowing what belongs."
        </blockquote>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', color: '#C9A84C' }}>
          Clarity Before Action. ♛
        </p>
      </section>

      {/* F — AFFILIATE */}
      <section style={{ background: '#F5F0EA', ...sectionPad }}>
        <div style={{ ...maxW, textAlign: 'center' }}>
          <p style={{ ...eyebrow, marginBottom: '1rem' }}>Earn With Us</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', marginBottom: '1.25rem', color: '#2D1B3D' }}>
            Love It? Share It.
          </h2>
          <p style={{ fontWeight: 300, fontSize: '1rem', lineHeight: 1.8, color: '#555', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            Our founding affiliate program pays 70% commission — $67.90 per sale. Share your unique link and earn every time someone joins through you.
          </p>
          <a
            href="mailto:bossdigitalera@gmail.com?subject=Luxe Affiliate Application"
            style={{
              display: 'inline-block', background: 'transparent', color: '#8B7355',
              border: '0.5px solid #8B7355',
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '10px',
              letterSpacing: '0.22em', textTransform: 'uppercase', padding: '16px 40px',
              textDecoration: 'none',
            }}
          >
            Apply to Become an Affiliate
          </a>
        </div>
      </section>

      {/* G — PAYMENT */}
      <section id="payment" style={{ background: '#1E1530', ...sectionPad }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ ...eyebrow, color: 'rgba(201,168,76,0.6)', marginBottom: '1rem' }}>Founding Access</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#EDE2D4', marginBottom: '1rem', lineHeight: 1.25 }}>
              Founding Access. One Time. Yours Forever.
            </h2>

            {/* Price display */}
            <div style={{ margin: '1.5rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '1rem' }}>
                <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#C9A84C', lineHeight: 1 }}>
                  $97
                </span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(237,226,212,0.4)', textDecoration: 'line-through' }}>
                    $27/month
                  </p>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B7355', marginTop: '4px' }}>
                    One time · Forever
                  </p>
                </div>
              </div>
            </div>

            {/* Condensed bullet list */}
            <div style={{ textAlign: 'left', margin: '1.5rem 0 2.5rem', padding: '1.5rem', border: '0.5px solid rgba(139,115,85,0.3)' }}>
              <VaultBullets onDark={true} />
            </div>
          </div>

          {/* Payment form */}
          <InlinePaymentForm />

          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '10px',
            color: 'rgba(237,226,212,0.35)', lineHeight: 1.7, marginTop: '1.5rem', textAlign: 'center',
          }}>
            Results shown are examples only and are not guaranteed. Individual outcomes depend on effort, experience and market conditions.
          </p>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '9px',
            color: 'rgba(237,226,212,0.25)', marginTop: '0.75rem', textAlign: 'center', letterSpacing: '0.08em',
          }}>
            Secured by Stripe · 256-bit SSL
          </p>
        </div>
      </section>

      {/* H — FAQ */}
      <section style={{ background: '#F5F0EA', ...sectionPad }}>
        <div style={{ ...maxW }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ ...eyebrow, marginBottom: '1rem' }}>Questions</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#2D1B3D' }}>
              Frequently Asked
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* I — FINAL CTA */}
      <section style={{ background: '#1E1530', ...sectionPad }}>
        <div style={{ ...maxW, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: '#EDE2D4', maxWidth: '580px', margin: '0 auto 1rem', lineHeight: 1.25 }}>
            Build a Brand That Feels Like Your Next Era.
          </h2>
          <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: 'italic', fontSize: '1rem', color: '#8B7355', marginBottom: '2.5rem' }}>
            Clarity before action.
          </p>
          <a
            href="#payment"
            onClick={scrollToPayment}
            style={{
              display: 'inline-block', background: '#C9A84C', color: '#1E1530',
              fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10px',
              letterSpacing: '0.22em', textTransform: 'uppercase', padding: '20px 48px',
              textDecoration: 'none',
            }}
          >
            Enter the Luxe Editorial Vault™ — $97
          </a>
        </div>
      </section>

      <footer style={{ background: '#0F0B1A', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '12px', letterSpacing: '0.18em', color: '#C9A84C', marginBottom: '6px' }}>
          ♛ The Luxe Editorial Vault™
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: '#444', marginTop: '8px' }}>
          © 2026 Boss Era™ · <a href="/privacy" style={{ color: '#8B7355', textDecoration: 'none' }}>Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}

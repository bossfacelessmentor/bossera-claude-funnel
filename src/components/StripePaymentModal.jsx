import { useState, useEffect, useRef } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Fix 3: separate pixel helpers — Purchase stays on /access-confirmed-ai
function firePixelAddToCart() {
  try {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToCart', {
        value: 27.00,
        currency: 'USD',
        content_name: 'AI Content to Cash System',
        content_type: 'product',
      });
    }
  } catch (_) {}
}

function firePixelInitiateCheckout() {
  try {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout', {
        value: 27.00,
        currency: 'USD',
        content_name: 'AI Content to Cash System',
        content_type: 'product',
      });
    }
  } catch (_) {}
}

function firePixelPurchase() {
  try {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: 27.00,
        currency: 'USD',
        content_name: 'AI Content to Cash System',
        content_type: 'product',
      });
    }
  } catch (_) {}
}

function PaymentStep({ stripe, clientSecret, email }) {
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mountRef = useRef(null);

  // Fix 3: InitiateCheckout fires when the payment form first renders
  useEffect(() => {
    firePixelInitiateCheckout();
  }, []);

  useEffect(() => {
    if (!stripe || !clientSecret || !mountRef.current) return;
    const appearance = {
      theme: 'night',
      variables: {
        colorPrimary: '#C9A84C',
        colorBackground: '#000000',
        colorText: '#EDE2D4',
        colorTextSecondary: '#8B7340',
        colorDanger: '#f87171',
        fontFamily: 'Jost, sans-serif',
        borderRadius: '0px',
        spacingUnit: '5px',
      },
      rules: {
        '.Input': { border: '0.5px solid rgba(201,168,76,0.3)', color: '#EDE2D4' },
        '.Input:focus': { border: '0.5px solid rgba(201,168,76,0.75)', boxShadow: 'none' },
        '.Label': { color: '#8B7340', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' },
        '.Tab': { border: '0.5px solid rgba(201,168,76,0.2)' },
        '.Tab--selected': { borderColor: '#C9A84C', color: '#C9A84C' },
      },
    };
    const els = stripe.elements({ clientSecret, appearance });
    const pe = els.create('payment', { layout: 'tabs' });
    pe.on('loaderror', (e) => console.error('[Stripe] Payment Element load error:', e));
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
        // Fix 4: window.location.origin — no window.open anywhere in this flow
        return_url: window.location.origin + '/access-confirmed-ai',
        receipt_email: email,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed. Please try again.');
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      firePixelPurchase();
      try {
        await fetch('/.netlify/functions/post-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, payment_intent_id: paymentIntent.id }),
        });
      } catch (_) {}
      window.location.href = '/access-confirmed-ai?session_id=' + paymentIntent.id;
    } else {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ fontSize: '10px', fontFamily: "'Jost', sans-serif", color: '#8B7340', marginBottom: '16px', letterSpacing: '0.08em' }}>
        Payment for {email}
      </div>
      <div ref={mountRef} style={{ minHeight: '120px' }} />
      {error && (
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', color: '#f87171', marginTop: '12px', lineHeight: 1.5 }}>
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading || !elements}
        style={{
          display: 'block', width: '100%', marginTop: '20px',
          background: loading || !elements ? 'rgba(201,168,76,0.4)' : '#C9A84C',
          color: '#1E1530', border: 'none',
          cursor: loading || !elements ? 'default' : 'pointer',
          fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', padding: '18px 24px',
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? 'Processing...' : 'Get Instant Access — $27'}
      </button>
    </form>
  );
}

export default function StripePaymentModal({ isOpen, onClose }) {
  const [stripeInstance, setStripeInstance] = useState(null);
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen || !PUBLISHABLE_KEY) return;
    if (window.Stripe) {
      setStripeInstance(window.Stripe(PUBLISHABLE_KEY));
      return;
    }
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
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStep('email');
      setEmail('');
      setClientSecret('');
      setError('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  async function handleEmailSubmit(e) {
    e.preventDefault();

    // Fix 2: visible validation error instead of silent return
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!stripeInstance) return;

    // AddToCart + checkout-started fire together — both mark real purchase intent
    firePixelAddToCart();
    fetch('/.netlify/functions/checkout-started', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'ai-checkout-modal' }),
    }).catch(() => {});

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/create-payment-intent', {
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

  if (!isOpen) return null;

  // Fix 4: overlay uses overflowY:'auto' so modal is scrollable on small
  // screens; no window.open anywhere in this component or its children
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.88)',
        overflowY: 'auto',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '24px 16px 60px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#000000',
          width: '100%', maxWidth: '460px',
          position: 'relative',
          marginTop: '12px',
        }}
      >
        {/* Top bar */}
        <div style={{
          background: '#000000', padding: '14px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '0.5px solid rgba(201,168,76,0.15)',
        }}>
          <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '13px', letterSpacing: '0.15em', color: '#C9A84C' }}>
            Boss Era™
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#8B7340', cursor: 'pointer',
              fontFamily: "'Jost', sans-serif", fontSize: '20px', lineHeight: 1,
              padding: '4px 8px', opacity: 0.8,
              // Larger tap target for mobile
              minWidth: '44px', minHeight: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Product info */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <img
              src="/images/hero-mockup.png"
              alt="AI Content to Cash System"
              style={{ width: '52px', height: '68px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '15px', color: '#EDE2D4', lineHeight: 1.3, marginBottom: '6px' }}>
                AI Content to Cash System
              </div>
              <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '26px', color: '#C9A84C', lineHeight: 1 }}>
                $27
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', color: '#8B7340', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>
                One-time · No subscription
              </div>
            </div>
          </div>

          <div style={{ borderTop: '0.5px solid rgba(201,168,76,0.15)', paddingTop: '14px', marginBottom: '20px' }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: '#8B7340', letterSpacing: '0.08em', margin: 0, lineHeight: 1.6 }}>
              Instant digital access · Secure payment · No subscription
            </p>
          </div>

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit}>
              <label style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B7340', marginBottom: '8px' }}>
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
                  background: '#000000',
                  border: error ? '0.5px solid #f87171' : '0.5px solid rgba(201,168,76,0.3)',
                  color: '#EDE2D4', fontFamily: "'Jost', sans-serif", fontSize: '16px',
                  outline: 'none',
                  // font-size 16px prevents iOS auto-zoom on focus
                  WebkitAppearance: 'none',
                }}
              />
              {/* Fix 2: visible error message */}
              {error && (
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: '#f87171', marginTop: '6px', lineHeight: 1.5 }}>
                  {error}
                </div>
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
                  letterSpacing: '0.22em', textTransform: 'uppercase', padding: '18px 24px',
                  // Minimum 44px tap target height for mobile
                  minHeight: '44px',
                }}
              >
                {loading ? 'Just a moment...' : !stripeInstance ? 'Loading...' : 'Continue to Payment'}
              </button>
            </form>
          )}

          {step === 'payment' && stripeInstance && clientSecret && (
            <PaymentStep
              stripe={stripeInstance}
              clientSecret={clientSecret}
              email={email}
            />
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px 24px', marginTop: '16px', borderTop: '0.5px solid rgba(201,168,76,0.1)' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', color: 'rgba(139,115,64,0.5)', letterSpacing: '0.1em', textAlign: 'center', margin: 0 }}>
            Secured by Stripe · 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}

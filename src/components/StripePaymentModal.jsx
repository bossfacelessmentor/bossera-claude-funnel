import { useState, useEffect, useRef } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log('[Modal] PUBLISHABLE_KEY present at module load:', !!PUBLISHABLE_KEY);
if (PUBLISHABLE_KEY) console.log('[Modal] PUBLISHABLE_KEY prefix:', PUBLISHABLE_KEY.substring(0, 12) + '...');

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

  useEffect(() => {
    console.log('[PaymentStep] effect — stripe:', !!stripe, 'clientSecret:', !!clientSecret, 'mountRef:', !!mountRef.current);
    if (!stripe || !clientSecret || !mountRef.current) return;
    console.log('[PaymentStep] clientSecret prefix:', clientSecret.substring(0, 25) + '...');
    const appearance = {
      theme: 'night',
      variables: {
        colorPrimary: '#C9A84C',
        colorBackground: '#1E1530',
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
    console.log('[PaymentStep] calling stripe.elements()');
    const els = stripe.elements({ clientSecret, appearance });
    console.log('[PaymentStep] creating payment element');
    const pe = els.create('payment', { layout: 'tabs' });
    pe.on('ready', () => console.log('[PaymentStep] Payment Element READY — iframe loaded'));
    pe.on('loaderror', (e) => console.error('[PaymentStep] Payment Element LOAD ERROR:', e));
    pe.on('change', (e) => console.log('[PaymentStep] change event — complete:', e.complete, 'error:', e.error));
    console.log('[PaymentStep] mounting to DOM node:', mountRef.current);
    pe.mount(mountRef.current);
    console.log('[PaymentStep] mount() called — waiting for ready event');
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
        return_url: window.location.origin + '/access-confirmed-ai',
        receipt_email: email,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed. Please try again.');
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      firePixelPurchase();
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
          color: '#1E1530', border: 'none', cursor: loading || !elements ? 'default' : 'pointer',
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
    if (!email || !email.includes('@') || !stripeInstance) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log('[Modal] fetch response status:', res.status);
      console.log('[Modal] clientSecret received:', data.clientSecret ? data.clientSecret.substring(0, 25) + '...' : 'MISSING');
      console.log('[Modal] full data keys:', Object.keys(data));
      if (data.error) throw new Error(data.error);
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch (err) {
      setError(err.message || 'Unable to start checkout. Please check your connection and try again.');
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10, 6, 18, 0.88)',
        overflowY: 'auto',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '24px 16px 40px',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#2D1B3D',
          width: '100%', maxWidth: '460px',
          position: 'relative',
          marginTop: '12px',
        }}
      >
        {/* Top bar */}
        <div style={{
          background: '#1E1530', padding: '14px 20px',
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
              padding: '0 4px', opacity: 0.8,
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Product info */}
        <div style={{ padding: '24px 28px 0' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <img
              src="/images/hero-mockup.png"
              alt="AI Content to Cash System"
              style={{ width: '56px', height: '72px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '16px', color: '#EDE2D4', lineHeight: 1.3, marginBottom: '6px' }}>
                AI Content to Cash System
              </div>
              <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '28px', color: '#C9A84C', lineHeight: 1 }}>
                $27
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', color: '#8B7340', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>
                One-time · No subscription
              </div>
            </div>
          </div>

          <div style={{ borderTop: '0.5px solid rgba(201,168,76,0.15)', paddingTop: '16px', marginBottom: '20px' }}>
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={{
                  display: 'block', width: '100%', padding: '13px 14px',
                  background: '#1E1530', border: '0.5px solid rgba(201,168,76,0.3)',
                  color: '#EDE2D4', fontFamily: "'Jost', sans-serif", fontSize: '15px',
                  outline: 'none', marginBottom: '8px',
                  WebkitAppearance: 'none',
                }}
              />
              {error && (
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', color: '#f87171', marginBottom: '12px', lineHeight: 1.5 }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || !stripeInstance}
                style={{
                  display: 'block', width: '100%', marginTop: '4px',
                  background: loading || !stripeInstance ? 'rgba(201,168,76,0.4)' : '#C9A84C',
                  color: '#1E1530', border: 'none',
                  cursor: loading || !stripeInstance ? 'default' : 'pointer',
                  fontFamily: "'Jost', sans-serif", fontSize: '10px', fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase', padding: '18px 24px',
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
        <div style={{ padding: '20px 28px 24px', marginTop: '16px', borderTop: '0.5px solid rgba(201,168,76,0.1)' }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', color: 'rgba(139,115,64,0.5)', letterSpacing: '0.1em', textAlign: 'center', margin: 0 }}>
            Secured by Stripe · 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}

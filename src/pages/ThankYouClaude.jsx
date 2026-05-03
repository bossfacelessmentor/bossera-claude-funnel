import { useEffect, useState } from "react";

const PIXEL_ID = "1000857132611840";
const QAS_STRIPE = "https://buy.stripe.com/9B628s95k2NNfHM0bxbQY0o";
const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/13l6SKdu_m03LrRpH7kpbeN0YQ53xOyOx?usp=sharing";

function firePixelPurchase() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      value: 27.00,
      currency: "USD",
      content_name: "Claude AI Content to Cash",
      content_ids: ["claude-ai-content-to-cash"],
      content_type: "product",
    });
  }
}

function scrollToDelivery(e) {
  e.preventDefault();
  const el = document.getElementById("delivery");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function ThankYouClaude() {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!fired) {
      firePixelPurchase();
      setFired(true);
    }
  }, [fired]);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#0D1B2A", color: "#F2EEE4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gold-bar { display: block; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, #C1A062, transparent); }
        .btn-gold {
          display: inline-block; background: #C1A062; color: #0D1B2A;
          font-family: 'Instrument Sans', sans-serif; font-weight: 700;
          font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 1.1rem 2.5rem; text-decoration: none; transition: opacity 0.2s;
        }
        .btn-ghost {
          display: inline-block; border: 1px solid rgba(193,160,98,0.4); color: rgba(242,238,228,0.6);
          font-family: 'Instrument Sans', sans-serif; font-size: 0.8rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.75rem 2rem; text-decoration: none; margin-top: 1rem;
          transition: opacity 0.2s; cursor: pointer; background: transparent;
          border-style: solid;
        }
      `}</style>

      <span className="gold-bar" />

      {/* Upsell — shown first */}
      <section style={{ padding: "5rem 1.5rem 5rem", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1.5rem" }}>
          One-Time Offer · For New Customers Only
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 2rem" }} />
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.8rem)", lineHeight: 1.15, marginBottom: "1.2rem" }}>
          Your AI creates the content.<br />
          <em style={{ color: "#C1A062" }}>Now give it authority quotes to work with.</em>
        </h2>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.75, color: "rgba(242,238,228,0.78)", marginBottom: "1.5rem", maxWidth: "540px", margin: "0 auto 1.5rem" }}>
          The <strong style={{ color: "#F2EEE4" }}>Boss Era™ Quote Authority System</strong> gives you 127 curated authority quotes across 10 psychological pillars — identity, mindset, feminine authority, business, wealth, and more — with caption frameworks and a complete Instagram formatting system.
        </p>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.75, color: "rgba(242,238,228,0.78)", marginBottom: "2rem", maxWidth: "540px", margin: "0 auto 2rem" }}>
          Use it alongside your Claude AI system: let AI build your content strategy, let the vault supply the authority positioning. Together, they cover everything.
        </p>

        <div style={{ background: "#132236", border: "1px solid rgba(193,160,98,0.25)", padding: "2rem", margin: "2rem 0" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.85rem", color: "rgba(242,238,228,0.45)", textDecoration: "line-through" }}>$67</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#C1A062" }}>$47</span>
          </div>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(242,238,228,0.45)", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>
            New customer discount · This page only
          </p>
          <a href={QAS_STRIPE} className="btn-gold">
            Add Quote Authority System — $47
          </a>
          <br />
          <button onClick={scrollToDelivery} className="btn-ghost">
            No thanks, I'll pass on this offer
          </button>
        </div>

        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.75rem", color: "rgba(242,238,228,0.3)", marginTop: "2rem", lineHeight: 1.7 }}>
          Results depend on individual effort and consistency. This is an educational digital product.
        </p>
      </section>

      <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(193,160,98,0.2), transparent)" }} />

      {/* Product delivery — shown after upsell */}
      <section id="delivery" style={{ padding: "5rem 1.5rem", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1.5rem" }}>
          Boss Era™ · Order Confirmed
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 2rem" }} />
        <h1 style={{ fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          You're in.<br />
          <em style={{ color: "#C1A062" }}>Your system is ready.</em>
        </h1>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.75, color: "rgba(242,238,228,0.78)", marginBottom: "2.5rem", fontSize: "1rem" }}>
          Thank you for your order. The Claude AI · Content to Cash system is waiting for you. Click below to access your full digital product.
        </p>
        <a href={GOOGLE_DRIVE_LINK} className="btn-gold">
          Access My Product →
        </a>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(242,238,228,0.4)", marginTop: "1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>
      </section>

      <span className="gold-bar" />

      <footer style={{ padding: "2rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(193,160,98,0.1)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#C1A062", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Boss Era™</p>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", color: "rgba(242,238,228,0.3)" }}>
          © 2026 Boss Era™ · <a href="/privacy" style={{ color: "inherit" }}>Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";

const PIXEL_ID = "1000857132611840";
const QAS_DRIVE_LINK = "https://drive.google.com/drive/folders/11yYCtmDcQaexC83S09PoHC-8eQtUtTNS?usp=sharing";

function firePixelPurchase() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Purchase", {
      value: 47.00,
      currency: "USD",
      content_name: "Boss Era Quote Authority System",
      content_ids: ["quote-authority-system"],
      content_type: "product",
    });
  }
}

export default function ThankYouQuote() {
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
          padding: 1.1rem 2.5rem; text-decoration: none;
        }
        .check-row {
          display: flex; align-items: flex-start; gap: 1rem;
          margin-bottom: 0.85rem; font-family: 'Instrument Sans', sans-serif;
          font-size: 0.92rem; color: rgba(242,238,228,0.78); line-height: 1.5;
          text-align: left;
        }
        .check-icon {
          width: 20px; height: 20px; min-width: 20px; border-radius: 50%;
          background: rgba(193,160,98,0.15); border: 1px solid #C1A062;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px; font-size: 0.65rem; color: #C1A062;
        }
      `}</style>

      <span className="gold-bar" />

      <section style={{ padding: "5rem 1.5rem", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1.5rem" }}>
          Boss Era™ · Order Confirmed
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 2rem" }} />
        <h1 style={{ fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Your authority vault<br />
          <em style={{ color: "#C1A062" }}>is ready.</em>
        </h1>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.75, color: "rgba(242,238,228,0.78)", marginBottom: "2.5rem" }}>
          The Boss Era™ Quote Authority System is now yours. 127 authority quotes. 10 psychological pillars. The complete Instagram formatting system and monetization roadmap — all inside.
        </p>

        <div style={{ background: "#132236", border: "1px solid rgba(193,160,98,0.2)", padding: "2rem", marginBottom: "2.5rem", textAlign: "left" }}>
          {[
            "127 curated Boss Era™ authority quotes across 10 pillars",
            "Instagram Formatting System — dimensions, fonts, templates",
            "Caption & CTA Architecture — hook → body → call to action",
            "Brand & Aesthetic Positioning — build authority without your face",
            "Growth Strategy Framework — posting cadence, hashtag logic",
            "Monetization Roadmap — 5 income streams sequenced by readiness",
            "Simple Funnel Explanation — from first post to first sale",
          ].map(item => (
            <div key={item} className="check-row">
              <span className="check-icon">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <a href={QAS_DRIVE_LINK} className="btn-gold">
          Access My Quote Authority System →
        </a>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(242,238,228,0.4)", marginTop: "1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>

        <div style={{ marginTop: "3rem", padding: "2rem", border: "1px solid rgba(193,160,98,0.15)" }}>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C1A062", marginBottom: "0.75rem" }}>
            Want a private diagnosis?
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#F2EEE4", marginBottom: "0.75rem" }}>
            Instagram Authority & Monetization Audit
          </p>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "rgba(242,238,228,0.65)", lineHeight: 1.7, marginBottom: "1.2rem" }}>
            A 1:1 diagnostic call where we go through your account across six layers — bio, content, offer, funnel, DMs, and positioning. You leave with a 30-day action plan built around your specific gaps.
          </p>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(242,238,228,0.45)", letterSpacing: "0.08em" }}>
            DM the word <strong style={{ color: "#C1A062" }}>AUDIT</strong> on Instagram → @bossdigitalbusiness
          </p>
        </div>
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

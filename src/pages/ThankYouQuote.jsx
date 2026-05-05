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

const modules = [
  { n: "01", title: "Identity Shift & Brand Foundation", desc: "Niche clarity, brand voice, visual identity decisions, target audience definition" },
  { n: "02", title: "The Boss Era™ Authority Vault", desc: "427+ curated quotes across 10 psychological pillars, organized and ready to deploy" },
  { n: "03", title: "Boss Era™ Intellectual Property Quotes", desc: "Original thought leadership quotes, philosophical frameworks, signature statements" },
  { n: "04", title: "Instagram Quote Page Blueprint", desc: "Page setup strategy, bio formula, highlight covers, content grid planning" },
  { n: "05", title: "Monetization Roadmap", desc: "Five income streams sequenced by readiness level, long-term strategy" },
  { n: "06", title: "Content Framework System", desc: "Posting cadence, caption frameworks, hashtag strategy, engagement triggers" },
  { n: "07", title: "Boss Era 0-10k Faceless Formula™", desc: "Step-by-step growth system for faceless quote pages" },
  { n: "08", title: "Authority & Scale Strategy", desc: "Advanced positioning, brand collaborations, community building" },
  { n: "09", title: "Empire Assets Vault™", desc: "Templates, swipe files, checklists, tools and resources" },
];

const sampleQuotes = [
  "I created authority to be a choice and built a life that required no permission.",
  "I show women build empires.",
  "The goal isn't to go viral. The goal is to become sustainable.",
  "Transition your trial. It's positioned to be viral.",
];

const valueStack = [
  ["Module 1: Identity Shift & Brand Foundation", "$29"],
  ["Module 2: The Boss Era™ Authority Vault (427+ quotes)", "$49"],
  ["Module 3: Boss Era™ Intellectual Property Quotes", "$29"],
  ["Module 4: Instagram Quote Page Blueprint", "$29"],
  ["Module 5: Monetization Roadmap", "$29"],
  ["Module 6: Content Framework System", "$29"],
  ["Module 7: Boss Era 0-10k Faceless Formula™", "$29"],
  ["Module 8: Authority & Scale Strategy", "$29"],
  ["Module 9: Empire Assets Vault™", "$29"],
];

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
        .module-card {
          background: #132236; border: 1px solid rgba(193,160,98,0.18);
          padding: 1.4rem 1.6rem; margin-bottom: 0.75rem; position: relative; text-align: left;
        }
        .module-num {
          position: absolute; top: 1.2rem; right: 1.4rem;
          font-family: 'Cormorant Garamond', serif; font-size: 2.5rem;
          font-weight: 300; color: rgba(193,160,98,0.1); line-height: 1;
        }
        .quotes-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem;
        }
        @media (max-width: 600px) {
          .quotes-grid { grid-template-columns: 1fr; }
          .for-grid { grid-template-columns: 1fr !important; }
        }
        .quote-card {
          background: #132236; border-left: 2px solid #C1A062;
          padding: 1.4rem 1.6rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-style: italic; font-weight: 300;
          color: #C1A062; line-height: 1.55; text-align: left;
        }
        .for-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem;
        }
        .for-col {
          background: #132236; border: 1px solid rgba(193,160,98,0.18); padding: 1.6rem;
        }
        .for-col h4 {
          font-family: 'Instrument Sans', sans-serif; font-size: 0.72rem;
          letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 1.1rem;
        }
        .for-item {
          font-family: 'Instrument Sans', sans-serif; font-size: 0.88rem;
          color: rgba(242,238,228,0.75); line-height: 1.6; margin-bottom: 0.65rem;
          padding-left: 1.2rem; position: relative;
        }
        .for-item::before {
          content: attr(data-marker); position: absolute; left: 0;
          color: #C1A062; font-weight: 700;
        }
        .value-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.75rem 0; border-bottom: 1px solid rgba(193,160,98,0.1);
          font-family: 'Instrument Sans', sans-serif; font-size: 0.88rem;
          color: rgba(242,238,228,0.72);
        }
        .value-price { color: #C1A062; font-weight: 600; font-size: 0.85rem; white-space: nowrap; margin-left: 1rem; }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(193,160,98,0.2), transparent); margin: 3rem 0; }
      `}</style>

      <span className="gold-bar" />

      {/* Hero / confirmation */}
      <section style={{ padding: "5rem 1.5rem 3rem", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1.5rem" }}>
          Boss Era™ · Order Confirmed
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 2rem" }} />
        <h1 style={{ fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Your authority vault<br />
          <em style={{ color: "#C1A062" }}>is ready.</em>
        </h1>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.75, color: "rgba(242,238,228,0.78)", marginBottom: "2.5rem" }}>
          The Boss Era™ Quote Authority System is now yours. 427+ authority quotes. 10 psychological pillars. The complete Instagram formatting system and monetization roadmap — all inside.
        </p>
        <a href={QAS_DRIVE_LINK} className="btn-gold">
          Access My Quote Authority System →
        </a>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(242,238,228,0.4)", marginTop: "1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>
      </section>

      <div className="divider" style={{ margin: "0 1.5rem" }} />

      {/* 9 Modules */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1rem", textAlign: "center" }}>
          What's Inside
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 2rem" }} />
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", lineHeight: 1.15, marginBottom: "2rem", textAlign: "center" }}>
          Nine Modules.<br />
          <em style={{ color: "#C1A062" }}>One Complete System.</em>
        </h2>
        {modules.map((mod) => (
          <div key={mod.n} className="module-card">
            <span className="module-num">{mod.n}</span>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C1A062", marginBottom: "0.3rem" }}>
              Module {mod.n}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400, color: "#F2EEE4", marginBottom: "0.35rem" }}>
              {mod.title}
            </p>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.87rem", color: "rgba(242,238,228,0.65)", lineHeight: 1.6 }}>
              {mod.desc}
            </p>
          </div>
        ))}
      </section>

      <div className="divider" style={{ margin: "0 1.5rem" }} />

      {/* Sample Quotes */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1rem", textAlign: "center" }}>
          A Taste of the Vault
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 1rem" }} />
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", lineHeight: 1.15, marginBottom: "0.5rem", textAlign: "center" }}>
          Words That Build Empires.
        </h2>
        <div className="quotes-grid">
          {sampleQuotes.map((q) => (
            <div key={q} className="quote-card">
              "{q}"
            </div>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 1.5rem" }} />

      {/* Built for Her */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1rem", textAlign: "center" }}>
          Clarity Before You Use It
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 1.5rem" }} />
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", lineHeight: 1.15, marginBottom: "2rem", textAlign: "center" }}>
          Built for Her.<br />
          <em style={{ color: "#C1A062" }}>Not for Everyone.</em>
        </h2>
        <div className="for-grid">
          <div className="for-col">
            <h4 style={{ color: "#C1A062" }}>✦ This IS for you if...</h4>
            {[
              "Who's building authority-based Instagram pages",
              "Wants to build a faceless business with quiet authority",
              "Building something that generates income and impact",
              "Proven and values strategy over random posting",
              "Wants to become a voice others follow and trust",
            ].map((t) => <p key={t} className="for-item" data-marker="✓">{t}</p>)}
          </div>
          <div className="for-col">
            <h4 style={{ color: "rgba(242,238,228,0.45)" }}>✗ This is NOT for you if...</h4>
            {[
              "You want overnight results without consistent action",
              "You're looking for a get-rich-quick shortcut or magic formula",
              "You're comfortable staying in random-posting mode indefinitely",
              "You refuse to invest in your own education or tools",
              "You need every step to feel comfortable before you move",
            ].map((t) => <p key={t} className="for-item" data-marker="✗" style={{ color: "rgba(242,238,228,0.4)" }}>{t}</p>)}
          </div>
        </div>
      </section>

      <div className="divider" style={{ margin: "0 1.5rem" }} />

      {/* What You Walk Away With */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1rem" }}>
          Your Outcome
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 1.5rem" }} />
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          What You Walk Away With.
        </h2>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.8, color: "rgba(242,238,228,0.78)", maxWidth: "560px", margin: "0 auto 1.5rem", fontSize: "0.97rem" }}>
          A complete authority system for building a quote page that generates income and impact. Everything you need is immediately. A roadmap to your income calling. A framework for authority building that is unmistakable.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: "#C1A062", margin: "0 auto" }}>
          "This isn't hustle culture. This is authority culture."
        </p>
      </section>

      <div className="divider" style={{ margin: "0 1.5rem" }} />

      {/* Value Stack */}
      <section style={{ padding: "3rem 1.5rem 5rem", maxWidth: "720px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C1A062", marginBottom: "1rem", textAlign: "center" }}>
          What You're Getting
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C1A062", margin: "0 auto 1.5rem" }} />
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", lineHeight: 1.15, marginBottom: "2rem", textAlign: "center" }}>
          Everything Inside.<br />
          <em style={{ color: "#C1A062" }}>One Price.</em>
        </h2>

        {valueStack.map(([item, val]) => (
          <div key={item} className="value-row">
            <span>{item}</span>
            <span className="value-price">{val}</span>
          </div>
        ))}

        {/* Price tiers */}
        <div style={{ marginTop: "1.5rem", padding: "1.5rem", background: "#132236", border: "1px solid rgba(193,160,98,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0.5rem 0", fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.85rem" }}>
            <span style={{ color: "rgba(242,238,228,0.45)" }}>Total Value</span>
            <span style={{ color: "rgba(242,238,228,0.35)", textDecoration: "line-through", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>$261</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0.5rem 0", fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.85rem", borderTop: "1px solid rgba(193,160,98,0.1)" }}>
            <span style={{ color: "rgba(242,238,228,0.45)" }}>Standard Price</span>
            <span style={{ color: "rgba(242,238,228,0.35)", textDecoration: "line-through", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>$67</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0.75rem 0 0.25rem", borderTop: "1px solid rgba(193,160,98,0.25)" }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C1A062" }}>Your Investment Today</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, color: "#C1A062", lineHeight: 1 }}>$47</span>
          </div>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.75rem", color: "rgba(242,238,228,0.35)", letterSpacing: "0.05em", textAlign: "right", marginTop: "0.4rem" }}>
            New customer discount · This page only
          </p>
        </div>
      </section>

      {/* Private diagnosis callout */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ padding: "2rem", border: "1px solid rgba(193,160,98,0.15)", textAlign: "center" }}>
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

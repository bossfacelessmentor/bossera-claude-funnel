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
  "It's not the money I'm after. It's the freedom to live life on my own terms.",
  "Either I am going to make it, or I am going to make it. No other options.",
  "Every time you hesitate, someone less talented takes your spot. The world rewards audacity, not potential.",
  "Saying no is the ultimate luxury.",
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

export default function ThankYouClaude() {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!fired) {
      firePixelPurchase();
      setFired(true);
    }
  }, [fired]);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#E8D5C4", color: "#1A1025", minHeight: "100vh" }}>
      <header style={{ background:"#1A1025", borderBottom:"1px solid rgba(201,169,110,0.15)", padding:"0.85rem 2rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"1.1rem", color:"#C9A96E", letterSpacing:"0.12em" }}>Boss Era™</span>
      </header>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gold-bar { display: block; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, #C9A96E, transparent); }
        .btn-gold {
          display: inline-block; background: #1A1025; color: #C9A96E;
          font-family: 'Instrument Sans', sans-serif; font-weight: 700;
          font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 1.1rem 2.5rem; text-decoration: none; transition: opacity 0.2s;
        }
        .btn-ghost {
          display: inline-block; border: 1px solid rgba(201,169,110,0.4); color: rgba(26,16,37,0.5);
          font-family: 'Instrument Sans', sans-serif; font-size: 0.8rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.75rem 2rem; text-decoration: none; margin-top: 1rem;
          transition: opacity 0.2s; cursor: pointer; background: transparent;
          border-style: solid;
        }
        .module-card {
          background: #F5EDE8; border: 1px solid rgba(201,169,110,0.2);
          padding: 1.2rem 1.4rem; margin-bottom: 0.65rem; position: relative; text-align: left;
        }
        .module-num {
          position: absolute; top: 1rem; right: 1.2rem;
          font-family: 'Cormorant Garamond', serif; font-size: 2.2rem;
          font-weight: 300; color: rgba(201,169,110,0.1); line-height: 1;
        }
        .quotes-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; text-align: left;
        }
        @media (max-width: 580px) {
          .quotes-grid { grid-template-columns: 1fr; }
        }
        .quote-card {
          border-left: 2px solid #C9A96E; padding: 1.2rem 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-style: italic; font-weight: 300;
          color: #C9A96E; line-height: 1.55;
        }
        .value-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.6rem 0; border-bottom: 1px solid rgba(201,169,110,0.1);
          font-family: 'Instrument Sans', sans-serif; font-size: 0.85rem;
          color: #3D2B1F; text-align: left;
        }
        .value-price { color: #C9A96E; font-weight: 600; font-size: 0.82rem; white-space: nowrap; margin-left: 1rem; }
        .upsell-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent); margin: 2.5rem 0; }
      `}</style>

      <span className="gold-bar" />

      {/* Upsell — shown first */}
      <section style={{ padding: "5rem 1.5rem 5rem", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ width:"160px", margin:"0 auto 1.5rem", display:"block" }} />
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.5rem" }}>
          One-Time Offer · For New Customers Only
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C9A96E", margin: "0 auto 2rem" }} />

        {/* Bridge headline */}
        <h2 style={{ fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.8rem)", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          Your AI creates the content.<br />
          <em style={{ color: "#C9A96E" }}>Now give it authority quotes to work with.</em>
        </h2>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.8, color: "rgba(26,16,37,0.7)", maxWidth: "580px", margin: "0 auto 1.25rem", fontSize: "0.97rem" }}>
          Your Claude AI system builds your content strategy.
        </p>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.8, color: "rgba(26,16,37,0.6)", maxWidth: "580px", margin: "0 auto 2rem", fontSize: "0.92rem" }}>
          The <strong style={{ color: "#1A1025" }}>Boss Era™ Quote Authority System</strong> supplies the authority positioning. Together, they cover every layer of a faceless brand that converts — content, voice, identity, and direction.
        </p>

        <div className="upsell-divider" />

        {/* 9 Modules */}
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.25rem" }}>
          What's Inside — 9 Modules
        </p>
        {modules.map((mod) => (
          <div key={mod.n} className="module-card" style={mod.n === "02" ? { borderColor: "rgba(201,169,110,0.5)" } : undefined}>
            <span className="module-num">{mod.n}</span>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.25rem" }}>
              Module {mod.n}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#1A1025", marginBottom: "0.25rem" }}>
              {mod.title}
            </p>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.84rem", color: "rgba(26,16,37,0.55)", lineHeight: 1.6 }}>
              {mod.desc}
            </p>
          </div>
        ))}

        <div className="upsell-divider" />

        {/* Sample quotes */}
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.75rem" }}>
          Words That Build Empires
        </p>
        <div className="quotes-grid">
          {sampleQuotes.map((q) => (
            <div key={q} className="quote-card">"{q}"</div>
          ))}
        </div>

        <div className="upsell-divider" />

        {/* Value stack */}
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.25rem" }}>
          Value Stack
        </p>
        {valueStack.map(([item, val]) => (
          <div key={item} className="value-row">
            <span>{item}</span>
            <span className="value-price">{val}</span>
          </div>
        ))}

        {/* Price tiers + CTA */}
        <div style={{ background: "#F5EDE8", border: "1px solid rgba(201,169,110,0.25)", padding: "2rem", marginTop: "1.5rem" }}>
          <div style={{ borderTop:"1px solid rgba(201,169,110,0.2)", marginTop:"0.5rem", paddingTop:"1rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"0.5rem 0" }}>
              <span style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.82rem", color:"rgba(26,16,37,0.5)", letterSpacing:"0.05em" }}>Total Value</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", color:"rgba(26,16,37,0.5)", textDecoration:"line-through", textDecorationThickness:"2px" }}>$261</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"0.5rem 0" }}>
              <span style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.82rem", color:"rgba(26,16,37,0.5)", letterSpacing:"0.05em" }}>Standard Price</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", color:"rgba(26,16,37,0.5)", textDecoration:"line-through", textDecorationThickness:"2px" }}>$67</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"0.75rem 0 0.25rem", borderTop:"1px solid rgba(201,169,110,0.2)", marginTop:"0.5rem" }}>
              <span style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.82rem", color:"#C9A96E", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:"600" }}>Your Price Today</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", color:"#C9A96E", fontWeight:"300" }}>$47</span>
            </div>
            <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.75rem", color:"rgba(26,16,37,0.35)", textAlign:"right", margin:"0 0 1.5rem" }}>New customer discount · This page only</p>
          </div>

          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.92rem", color: "#C9A96E", fontWeight: "600", lineHeight: 1.6, marginBottom: "1.25rem", textAlign: "center" }}>
            This offer is available on this page only. Once you leave, the $47 price is gone.
          </p>
          <a href={QAS_STRIPE} className="btn-gold" style={{ display: "block", textAlign: "center" }}>
            Add Quote Authority System — $47
          </a>
          <div style={{ textAlign: "center" }}>
            <button onClick={scrollToDelivery} className="btn-ghost">
              No thanks, I'll pass on this offer
            </button>
          </div>
        </div>

        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.75rem", color: "rgba(26,16,37,0.3)", marginTop: "1.5rem", lineHeight: 1.7 }}>
          Results depend on individual effort and consistency. This is an educational digital product.
        </p>
      </section>

      <div style={{ background: "#F5EDE8", borderTop: "2px solid rgba(201,169,110,0.3)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,16,37,0.4)" }}>
          Scroll down to access your product
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "rgba(26,16,37,0.3)", margin: "0.5rem 0 0" }}>↓</p>
      </div>

      {/* Product delivery — shown after upsell */}
      <section id="delivery" style={{ padding: "5rem 1.5rem", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.5rem" }}>
          Boss Era™ · Order Confirmed
        </p>
        <div style={{ width: "48px", height: "2px", background: "#C9A96E", margin: "0 auto 2rem" }} />
        <h1 style={{ fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          You're in.<br />
          <em style={{ color: "#C9A96E" }}>Your system is ready.</em>
        </h1>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.75, color: "rgba(26,16,37,0.7)", marginBottom: "2.5rem", fontSize: "1rem" }}>
          Thank you for your order. The Claude AI · Content to Cash system is waiting for you. Click below to access your full digital product.
        </p>
        <a href={GOOGLE_DRIVE_LINK} className="btn-gold">
          Access My Product →
        </a>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.78rem", color: "rgba(26,16,37,0.35)", marginTop: "1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>
      </section>

      <span className="gold-bar" />

      <footer style={{ padding: "2rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#C9A96E", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Boss Era™</p>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", color: "rgba(26,16,37,0.3)" }}>
          © 2026 Boss Era™ · <a href="/privacy" style={{ color: "inherit" }}>Privacy Policy</a>
        </p>
        <div style={{ borderTop:"1px solid rgba(201,169,110,0.15)", paddingTop:"1.2rem", marginTop:"1.2rem" }}>
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(26,16,37,0.35)", marginBottom:"0.5rem" }}>Partner offer</p>
          <a href="/aimuse" style={{ display:"inline-block" }}>
            <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ height:"22px", width:"auto", opacity:"0.7" }} />
          </a>
        </div>
      </footer>
    </div>
  );
}

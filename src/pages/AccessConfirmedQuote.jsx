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

export default function AccessConfirmedQuote() {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!fired) {
      firePixelPurchase();
      setFired(true);
    }
  }, [fired]);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#E8D5C4", color: "#1A1025", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gold-bar { display: block; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, #C9A96E, transparent); }
        .btn-gold {
          display: inline-block; background: #1A1025; color: #C9A96E;
          font-family: 'Instrument Sans', sans-serif; font-weight: 700;
          font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 1.1rem 2.5rem; text-decoration: none;
        }
        .check-row {
          display: flex; align-items: flex-start; gap: 1rem;
          margin-bottom: 0.85rem; font-family: 'Instrument Sans', sans-serif;
          font-size: 0.92rem; color: rgba(26,16,37,0.7); line-height: 1.5;
          text-align: left;
        }
        .check-icon {
          width: 20px; height: 20px; min-width: 20px; border-radius: 50%;
          background: rgba(201,169,110,0.15); border: 1px solid #C9A96E;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px; font-size: 0.65rem; color: #C9A96E;
        }
        .module-card {
          background: #F5EDE8; border: 1px solid rgba(201,169,110,0.2);
          padding: 1.4rem 1.6rem; margin-bottom: 0.75rem; position: relative; text-align: left;
        }
        .module-num {
          position: absolute; top: 1.2rem; right: 1.4rem;
          font-family: 'Cormorant Garamond', serif; font-size: 2.5rem;
          font-weight: 300; color: rgba(201,169,110,0.1); line-height: 1;
        }
        .quotes-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem;
        }
        @media (max-width: 600px) {
          .quotes-grid { grid-template-columns: 1fr; }
          .for-grid { grid-template-columns: 1fr !important; }
        }
        .quote-card {
          background: #F5EDE8; border-left: 2px solid #C9A96E;
          padding: 1.4rem 1.6rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-style: italic; font-weight: 300;
          color: #C9A96E; line-height: 1.55; text-align: left;
        }
        .for-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem;
        }
        .for-col {
          background: #F5EDE8; border: 1px solid rgba(201,169,110,0.18); padding: 1.6rem;
        }
        .for-col h4 {
          font-family: 'Instrument Sans', sans-serif; font-size: 0.72rem;
          letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 1.1rem;
        }
        .for-item {
          font-family: 'Instrument Sans', sans-serif; font-size: 0.88rem;
          color: rgba(26,16,37,0.68); line-height: 1.6; margin-bottom: 0.65rem;
          padding-left: 1.2rem; position: relative;
        }
        .for-item::before {
          content: attr(data-marker); position: absolute; left: 0;
          color: #C9A96E; font-weight: 700;
        }
        .value-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.75rem 0; border-bottom: 1px solid rgba(201,169,110,0.1);
          font-family: 'Instrument Sans', sans-serif; font-size: 0.88rem;
          color: #3D2B1F;
        }
        .value-price { color: #C9A96E; font-weight: 600; font-size: 0.85rem; white-space: nowrap; margin-left: 1rem; }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent); margin: 3rem 0; }
      `}</style>

      <header style={{ background:"#1A1025", borderBottom:"1px solid rgba(201,169,110,0.15)", padding:"0.85rem 2rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"1.1rem", color:"#C9A96E", letterSpacing:"0.12em" }}>Boss Era™</span>
      </header>

      <span className="gold-bar" />

      {/* Confirmation + Delivery */}
      <section style={{ padding:"5rem 1.5rem 3rem", maxWidth:"680px", margin:"0 auto", textAlign:"center" }}>
        <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A96E", marginBottom:"1.5rem" }}>
          Boss Era™ · Order Confirmed
        </p>
        <div style={{ width:"48px", height:"2px", background:"#C9A96E", margin:"0 auto 2rem" }} />
        <h1 style={{ fontWeight:300, fontSize:"clamp(2.2rem,5vw,3.5rem)", lineHeight:1.1, marginBottom:"1.2rem" }}>
          Your authority vault<br />
          <em style={{ color:"#C9A96E" }}>is ready.</em>
        </h1>
        <p style={{ fontFamily:"'Instrument Sans',sans-serif", lineHeight:1.75, color:"rgba(26,16,37,0.7)", marginBottom:"0.75rem", maxWidth:"500px", margin:"0 auto 0.75rem" }}>
          The Boss Era™ Quote Authority System is now yours.
        </p>
        <p style={{ fontFamily:"'Instrument Sans',sans-serif", lineHeight:1.75, color:"rgba(26,16,37,0.7)", marginBottom:"2.5rem", maxWidth:"500px", margin:"0 auto 2.5rem" }}>
          427+ authority quotes. 10 psychological pillars. The complete Instagram formatting system and monetization roadmap — all inside.
        </p>
        <a href={QAS_DRIVE_LINK} className="btn-gold">
          Access My Quote Authority System →
        </a>
        <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.78rem", color:"rgba(26,16,37,0.35)", marginTop:"1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>
      </section>

      {/* 4 Sample Quotes */}
      <section style={{ padding:"3rem 1.5rem", maxWidth:"680px", margin:"0 auto" }}>
        <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#C9A96E", textAlign:"center", marginBottom:"0.75rem" }}>
          A taste of your vault
        </p>
        <div style={{ width:"48px", height:"2px", background:"#C9A96E", margin:"0 auto 2rem" }} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          {[
            "It's not the money I'm after. It's the freedom to live life on my own terms.",
            "Either I am going to make it, or I am going to make it. No other options.",
            "Every time you hesitate, someone less talented takes your spot. The world rewards audacity, not potential.",
            "Saying no is the ultimate luxury."
          ].map(q => (
            <div key={q} style={{ background:"#F5EDE8", border:"1px solid rgba(201,169,110,0.15)", padding:"1.5rem" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontStyle:"italic", fontWeight:300, color:"#C9A96E", lineHeight:1.6, margin:0 }}>
                "{q}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Audit CTA */}
      <section style={{ padding:"2rem 1.5rem 5rem", maxWidth:"680px", margin:"0 auto" }}>
        <div style={{ padding:"2rem", border:"1px solid rgba(201,169,110,0.15)", textAlign:"center" }}>
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.72rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#C9A96E", marginBottom:"0.75rem" }}>
            Want a private diagnosis?
          </p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontStyle:"italic", color:"#1A1025", marginBottom:"0.75rem" }}>
            Instagram Authority & Monetization Audit
          </p>
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.88rem", color:"rgba(26,16,37,0.6)", lineHeight:1.7, marginBottom:"1.2rem", maxWidth:"480px", margin:"0 auto 1.2rem" }}>
            A 1:1 diagnostic call across six layers — bio, content, offer, funnel, DMs, and positioning. You leave with a 30-day action plan built around your specific gaps.
          </p>
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.82rem", color:"rgba(26,16,37,0.5)", letterSpacing:"0.08em" }}>
            DM the word <strong style={{ color:"#C9A96E" }}>AUDIT</strong> on Instagram → @bossdigitalbusiness
          </p>
        </div>
      </section>

      <section style={{ padding:"1.5rem 1.5rem 4rem", maxWidth:"680px", margin:"0 auto" }}>
        <div style={{ background:"#F5EDE8", border:"1px solid rgba(122,158,155,0.2)", padding:"1.8rem", textAlign:"center" }}>
          <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ width:"140px", margin:"0 auto 1rem", display:"block" }} />
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.72rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#7A9E9B", marginBottom:"0.75rem" }}>
            Also available
          </p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontStyle:"italic", color:"#2C4A47", marginBottom:"0.75rem" }}>
            AiMUSE Alchemy
          </p>
          <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.88rem", color:"rgba(44,74,71,0.65)", lineHeight:1.7, marginBottom:"1.2rem", maxWidth:"440px", margin:"0 auto 1.2rem" }}>
            The complete AI creation and branding system — visuals, music, video, and brand DNA. A natural companion to your authority system.
          </p>
          <a href="/aimuse" style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.8rem", color:"#7A9E9B", letterSpacing:"0.08em", textDecoration:"underline" }}>
            Learn more →
          </a>
        </div>
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

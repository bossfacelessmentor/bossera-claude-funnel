import { useEffect, useState } from "react";

// DO NOT MODIFY — Pixel ID and purchase event
const PIXEL_ID = "1000857132611840";
const QAS_STRIPE = "https://buy.stripe.com/9B628s95k2NNfHM0bxbQY0o";
const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/13l6SKdu_m03LrRpH7kpbeN0YQ53xOyOx?usp=sharing";

// DO NOT MODIFY — Meta Pixel Purchase event
function firePixelPurchase() {
  if (typeof fbq !== "undefined") {
    fbq("track", "Purchase", {
      value: 27.00,
      currency: "USD",
      content_name: "AI Content to Cash System",
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

export default function AccessConfirmedAI() {
  const [allowed, setAllowed] = useState(null);

  // DO NOT MODIFY — session guard + noindex + pixel
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId && sessionId.trim() !== '') {
      setAllowed(true);
      firePixelPurchase();
    } else {
      window.location.replace('/ai');
    }

    return () => {
      if (document.head.contains(meta)) document.head.removeChild(meta);
    };
  }, []);

  if (!allowed) return null;

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: "#F0E8DC", color: "#1A1A1A", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3 { font-family: 'Bodoni Moda', Georgia, serif; }
        body, p, li, span, a, button, input, label { font-family: 'Jost', sans-serif; font-weight: 300; }
        .gold-accent { display: block; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); }
        .eyebrow {
          font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 0.25em;
          text-transform: uppercase; color: #8B7340;
        }
        .module-card-ai {
          background: #EDE2D4; border: 1px solid rgba(201,168,76,0.18);
          padding: 1.2rem 1.4rem; margin-bottom: 0.5rem; position: relative; text-align: left;
        }
        .value-row-ai {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.6rem 0; border-bottom: 1px solid rgba(201,168,76,0.12);
          font-family: 'Jost', sans-serif; font-size: 0.85rem; color: #444; text-align: left;
        }
        .value-price-ai { color: #C9A84C; font-weight: 500; font-size: 0.82rem; white-space: nowrap; margin-left: 1rem; }
        .upsell-divider { width: 100%; height: 0.5px; background: rgba(201,168,76,0.25); margin: 2.5rem 0; }
        .quote-card-ai {
          background: #EDE2D4; border-left: 2px solid #C9A84C; padding: 1.2rem 1.4rem;
          font-family: 'Bodoni Moda', Georgia, serif; font-size: 1.05rem; font-style: italic;
          color: #8B7340; line-height: 1.55;
        }
        .quotes-grid-ai { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 580px) { .quotes-grid-ai { grid-template-columns: 1fr; } }
      `}</style>

      {/* Nav */}
      <header style={{ background: "#1E1530", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "14px", letterSpacing: "0.15em", color: "#C9A84C" }}>Boss Era™</span>
      </header>

      <span className="gold-accent" />

      {/* Upsell — shown first */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ width: "160px", margin: "0 auto 1.5rem", display: "block" }} />
        <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>One-Time Offer · For New Customers Only</p>
        <div style={{ width: "40px", height: "0.5px", background: "#C9A84C", margin: "0 auto 2rem" }} />

        <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.7rem,4vw,2.6rem)", color: "#1A1A1A", lineHeight: 1.15, marginBottom: "1.5rem" }}>
          Your AI creates the content.<br />
          <em style={{ color: "#8B7340" }}>Now give it authority quotes to work with.</em>
        </h2>

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.8, color: "#555", maxWidth: "580px", margin: "0 auto 1.25rem", fontSize: "0.97rem" }}>
          Your AI Content to Cash System builds your content strategy.
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.8, color: "#666", maxWidth: "580px", margin: "0 auto 2rem", fontSize: "0.92rem" }}>
          The <strong style={{ color: "#1A1A1A", fontWeight: 500 }}>Boss Era™ Quote Authority System</strong> supplies the authority positioning. Together, they cover every layer of a faceless brand that converts — content, voice, identity, and direction.
        </p>

        <div className="upsell-divider" />

        <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>What's Inside — 9 Modules</p>
        {modules.map((mod) => (
          <div key={mod.n} className="module-card-ai">
            <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Module {mod.n}</p>
            <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "1rem", color: "#1A1A1A", marginBottom: "0.25rem" }}>{mod.title}</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.84rem", fontWeight: 300, color: "#666", lineHeight: 1.6 }}>{mod.desc}</p>
          </div>
        ))}

        <div className="upsell-divider" />

        <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Words That Build Empires</p>
        <div className="quotes-grid-ai">
          {sampleQuotes.map((q) => (
            <div key={q} className="quote-card-ai">"{q}"</div>
          ))}
        </div>

        <div className="upsell-divider" />

        <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Value Stack</p>
        {valueStack.map(([item, val]) => (
          <div key={item} className="value-row-ai">
            <span>{item}</span>
            <span className="value-price-ai">{val}</span>
          </div>
        ))}

        {/* Price tiers + Stripe CTA — DO NOT MODIFY STRIPE LOGIC */}
        <div style={{ background: "#EDE2D4", border: "1px solid rgba(201,168,76,0.2)", padding: "2rem", marginTop: "1.5rem" }}>
          <div style={{ borderTop: "0.5px solid rgba(201,168,76,0.2)", marginTop: "0.5rem", paddingTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "#AAA" }}>Total Value</span>
              <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.2rem", color: "#AAA", textDecoration: "line-through" }}>$261</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "#AAA" }}>Standard Price</span>
              <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.2rem", color: "#AAA", textDecoration: "line-through" }}>$67</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0.75rem 0 0.25rem", borderTop: "0.5px solid rgba(201,168,76,0.2)", marginTop: "0.5rem" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "#C9A84C", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Your Price Today</span>
              <span style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "3rem", color: "#2D1B3D" }}>$47</span>
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "#AAA", textAlign: "right", margin: "0 0 1.5rem" }}>New customer discount · This page only</p>
          </div>

          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", color: "#C9A84C", fontWeight: 500, lineHeight: 1.6, marginBottom: "1.25rem", textAlign: "center" }}>
            This offer is available on this page only. Once you leave, the $47 price is gone.
          </p>
          {/* DO NOT MODIFY — Stripe upsell button */}
          <a
            href={QAS_STRIPE}
            style={{
              display: "block", textAlign: "center", background: "#2D1B3D", color: "#C9A84C",
              fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: "10px",
              letterSpacing: "0.22em", textTransform: "uppercase", padding: "16px 40px",
              textDecoration: "none",
            }}
          >
            Add Quote Authority System — $47
          </a>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={scrollToDelivery}
              style={{
                display: "inline-block", border: "1px solid rgba(201,168,76,0.3)", color: "#AAA",
                fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.08em",
                textTransform: "uppercase", padding: "0.75rem 2rem", marginTop: "1rem",
                cursor: "pointer", background: "transparent",
              }}
            >
              No thanks, I'll pass on this offer
            </button>
          </div>
        </div>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "#AAA", marginTop: "1.5rem", lineHeight: 1.7 }}>
          Results depend on individual effort and consistency. This is an educational digital product.
        </p>
      </section>

      <div style={{ background: "#EDE2D4", borderTop: "2px solid rgba(201,168,76,0.2)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p className="eyebrow">Scroll down to access your product</p>
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "1.5rem", color: "#8B7340", margin: "0.5rem 0 0" }}>↓</p>
      </div>

      {/* Product delivery — DO NOT MODIFY delivery link */}
      <section id="delivery" style={{ padding: "5rem 1.5rem", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Boss Era™ · Order Confirmed</p>
        <div style={{ width: "40px", height: "0.5px", background: "#C9A84C", margin: "0 auto 2rem" }} />
        <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 400, fontSize: "clamp(2.2rem,5vw,3.2rem)", lineHeight: 1.1, marginBottom: "1.5rem", color: "#1A1A1A" }}>
          You're in.<br />
          <em style={{ color: "#8B7340" }}>Your system is ready.</em>
        </h1>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75, color: "#555", marginBottom: "2.5rem", fontSize: "1rem" }}>
          Thank you for your order. The AI Content to Cash System is waiting for you. Click below to access your full digital product.
        </p>
        <a
          href={GOOGLE_DRIVE_LINK}
          style={{
            display: "inline-block", background: "#2D1B3D", color: "#C9A84C",
            fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: "10px",
            letterSpacing: "0.22em", textTransform: "uppercase",
            padding: "16px 40px", textDecoration: "none",
          }}
        >
          Access My Product →
        </a>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", color: "#AAA", marginTop: "1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>
      </section>

      <span className="gold-accent" />

      <footer style={{ background: "#0F0B1A", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "12px", letterSpacing: "0.18em", color: "#C9A84C", marginBottom: "6px" }}>Boss Era™</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#8B7340", letterSpacing: "0.1em", marginBottom: "12px" }}>@bossdigitalbusiness</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: "#444" }}>
          © 2026 Boss Era™ · <a href="/privacy" style={{ color: "#8B7340", textDecoration: "none" }}>Privacy Policy</a>
        </p>
        <div style={{ borderTop: "0.5px solid rgba(201,168,76,0.15)", paddingTop: "1.2rem", marginTop: "1.2rem" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(139,115,64,0.5)", marginBottom: "0.5rem" }}>Partner offer</p>
          <a href="/aimuse" style={{ display: "inline-block" }}>
            <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ height: "22px", width: "auto", opacity: 0.6 }} />
          </a>
        </div>
      </footer>
    </div>
  );
}

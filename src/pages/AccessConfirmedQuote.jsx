import { useEffect, useState } from "react";

// DO NOT MODIFY — Pixel ID and purchase event
const PIXEL_ID = "1000857132611840";
const QAS_DRIVE_LINK = "https://drive.google.com/drive/folders/11yYCtmDcQaexC83S09PoHC-8eQtUtTNS?usp=sharing";

// DO NOT MODIFY — Meta Pixel Purchase event
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
        .eyebrow-q { font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: #8B7340; }
        .module-card-q {
          background: #EDE2D4; border: 1px solid rgba(201,168,76,0.18);
          padding: 1.2rem 1.4rem; margin-bottom: 0.5rem; text-align: left;
        }
        .value-row-q {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0.6rem 0; border-bottom: 1px solid rgba(201,168,76,0.12);
          font-family: 'Jost', sans-serif; font-size: 0.85rem; color: #444; text-align: left;
        }
        .value-price-q { color: #C9A84C; font-weight: 500; font-size: 0.82rem; white-space: nowrap; margin-left: 1rem; }
        .quotes-grid-q { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 600px) { .quotes-grid-q { grid-template-columns: 1fr; } }
        .quote-card-q {
          background: #EDE2D4; border-left: 2px solid #C9A84C; padding: 1.4rem 1.6rem;
          font-family: 'Bodoni Moda', Georgia, serif; font-size: 1.1rem; font-style: italic;
          color: #8B7340; line-height: 1.55; text-align: left;
        }
      `}</style>

      {/* Nav */}
      <header style={{ background: "#1E1530", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "14px", letterSpacing: "0.15em", color: "#C9A84C" }}>Boss Era™</span>
      </header>

      <span className="gold-accent" />

      {/* Confirmation + Delivery */}
      <section style={{ padding: "5rem 1.5rem 3rem", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p className="eyebrow-q" style={{ marginBottom: "1.5rem" }}>Boss Era™ · Order Confirmed</p>
        <div style={{ width: "40px", height: "0.5px", background: "#C9A84C", margin: "0 auto 2rem" }} />
        <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 400, fontSize: "clamp(2.2rem,5vw,3.2rem)", lineHeight: 1.1, marginBottom: "1.2rem", color: "#1A1A1A" }}>
          Your authority vault<br />
          <em style={{ color: "#8B7340" }}>is ready.</em>
        </h1>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75, color: "#555", marginBottom: "0.75rem", maxWidth: "500px", margin: "0 auto 0.75rem" }}>
          The Boss Era™ Quote Authority System is now yours.
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, lineHeight: 1.75, color: "#555", marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
          427+ authority quotes. 10 psychological pillars. The complete Instagram formatting system and monetization roadmap — all inside.
        </p>
        {/* DO NOT MODIFY — delivery link */}
        <a
          href={QAS_DRIVE_LINK}
          style={{
            display: "inline-block", background: "#2D1B3D", color: "#C9A84C",
            fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: "10px",
            letterSpacing: "0.22em", textTransform: "uppercase",
            padding: "16px 40px", textDecoration: "none",
          }}
        >
          Access My Quote Authority System →
        </a>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", color: "#AAA", marginTop: "1rem" }}>
          A confirmation has been sent to your email via Stripe.
        </p>
      </section>

      {/* Sample Quotes */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: "680px", margin: "0 auto" }}>
        <p className="eyebrow-q" style={{ textAlign: "center", marginBottom: "0.75rem" }}>A taste of your vault</p>
        <div style={{ width: "40px", height: "0.5px", background: "#C9A84C", margin: "0 auto 2rem" }} />
        <div className="quotes-grid-q">
          {sampleQuotes.map(q => (
            <div key={q} className="quote-card-q">"{q}"</div>
          ))}
        </div>
      </section>

      {/* Audit CTA */}
      <section style={{ padding: "2rem 1.5rem 5rem", maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ padding: "2rem", border: "1px solid rgba(201,168,76,0.18)", textAlign: "center", background: "#EDE2D4" }}>
          <p className="eyebrow-q" style={{ marginBottom: "0.75rem" }}>Want a private diagnosis?</p>
          <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "1.4rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "0.75rem" }}>
            Instagram Authority & Monetization Audit
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "#555", lineHeight: 1.7, marginBottom: "1.2rem", maxWidth: "480px", margin: "0 auto 1.2rem" }}>
            A 1:1 diagnostic call across six layers — bio, content, offer, funnel, DMs, and positioning. You leave with a 30-day action plan built around your specific gaps.
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "#8B7340", letterSpacing: "0.08em" }}>
            DM the word <strong style={{ color: "#C9A84C", fontWeight: 500 }}>AUDIT</strong> on Instagram → @bossdigitalbusiness
          </p>
        </div>
      </section>

      {/* AiMUSE cross-sell */}
      <section style={{ padding: "1.5rem 1.5rem 4rem", maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ background: "#EDE2D4", border: "1px solid rgba(139,115,64,0.2)", padding: "1.8rem", textAlign: "center" }}>
          <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ width: "140px", margin: "0 auto 1rem", display: "block" }} />
          <p className="eyebrow-q" style={{ marginBottom: "0.75rem" }}>Also available</p>
          <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "1.4rem", fontStyle: "italic", color: "#1A1A1A", marginBottom: "0.75rem" }}>
            AiMUSE Alchemy
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "#555", lineHeight: 1.7, marginBottom: "1.2rem", maxWidth: "440px", margin: "0 auto 1.2rem" }}>
            The complete AI creation and branding system — visuals, music, video, and brand DNA. A natural companion to your authority system.
          </p>
          <a href="/aimuse" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "#8B7340", letterSpacing: "0.08em", textDecoration: "underline" }}>
            Learn more →
          </a>
        </div>
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

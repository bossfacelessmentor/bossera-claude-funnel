import { useState, useEffect, useRef } from "react";
import LeadMagnetPopup from "../components/LeadMagnetPopup";

const STRIPE_LINK = "https://buy.stripe.com/fZu00ka9ofAzcvA2jFbQY0n";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// DO NOT MODIFY — Meta Pixel AddToCart handler
const handleStripeClick = () => {
  try {
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: 27.00,
        currency: 'USD',
        content_name: 'AI Content to Cash System',
        content_type: 'product'
      });
    }
  } catch (e) {}
};

const Tag = ({ children }) => (
  <span style={{
    display: "inline-block",
    fontFamily: "'Jost', sans-serif",
    fontSize: "9px",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#8B7340",
    border: "0.5px solid rgba(139,115,64,0.35)",
    padding: "5px 14px",
    marginBottom: "20px",
  }}>{children}</span>
);

const modules = [
  { n: "01", title: "AI Foundations", desc: "Understand exactly how AI works, why most people use it wrong, and the single shift that changes your results immediately." },
  { n: "02", title: "How to Think When Using AI", desc: "The ROLE · CONTEXT · TASK · FORMAT system that produces professional-grade output every time — and how to iterate until it's perfect." },
  { n: "03", title: "Content Creation System", desc: "Ten high-converting content prompts, the carousel structure that drives saves, and the difference between content that gets likes versus content that builds buyers." },
  { n: "04", title: "Content to Cash Assets", desc: "How to turn posts into leads, the CTA swipe file that works without pressure, and how to use keywords and DMs to close sales — calmly." },
  { n: "05", title: "DM Sales System", desc: "The exact DM conversation flow from first message to confirmed purchase — without chasing, without pressure, and without losing the sale at the objection stage." },
  { n: "06", title: "Brand & Trust System", desc: "Use your AI assistant to design, name, price, and position a digital product. The framework for creating an offer people feel they'd be foolish to pass up." },
  { n: "07", title: "Small & Scaled Strategy", desc: "How to build a simple email funnel using AI — from lead magnet to welcome sequence to conversion emails — without a tech background." },
  { n: "08", title: "Offer Ideas & Access Plans", desc: "A realistic, day-by-day plan for your first 10 sales. Foundation, visibility, offers, and closing — sequenced so nothing falls through." },
  { n: "09", title: "Design Ideas & Access Plans", desc: "Why people fail with AI, how to diagnose your specific block, and the 72-hour reset that gets you back to forward momentum." },
];

const bonuses = [
  { name: "9 Sales Prompts", price: "$17" },
  { name: "33 AI Prompts", price: "$27" },
  { name: "50 Cowork Skills", price: "$37" },
  { name: "100 Secret Codes for Claude", price: "$47" },
  { name: "Claude AI Founder Thinking Mode", price: "$47" },
  { name: "The AI Instagram Business Kit", price: "$47" },
  { name: "How to Start Building an AI Influencer", price: "$47" },
  { name: "How To Use Claude Step-by-Step", price: "$27" },
  { name: "Claude + Higgsfield MCP", price: "$47" },
];

export default function AILandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: "#F0E8DC", color: "#1A1A1A", minHeight: "100vh", overflowX: "hidden" }}>
      <LeadMagnetPopup />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3, h4 { font-family: 'Bodoni Moda', Georgia, serif; }
        body, p, li, span, a, button, input, label { font-family: 'Jost', sans-serif; font-weight: 300; }
        body { font-size: 18px; line-height: 1.7; color: #1A1A1A; }
        @media (max-width: 768px) { body, p, li { font-size: 16px; } }

        .sticky-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: #1E1530; padding: 14px 32px;
          display: flex; justify-content: space-between; align-items: center;
          transition: transform 0.3s ease;
        }
        .nav-brand { font-family: 'Bodoni Moda', Georgia, serif; font-size: 14px; letter-spacing: 0.15em; color: #C9A84C; text-decoration: none; }
        .nav-cta-btn {
          background: transparent; border: 1px solid #C9A84C; color: #C9A84C;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; padding: 10px 20px;
          text-decoration: none; cursor: pointer; transition: opacity 0.2s; display: inline-block;
        }
        .nav-cta-btn:hover { opacity: 0.75; }

        .hero-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
          max-width: 980px; margin: 0 auto; padding: 52px 32px 60px;
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px; }
          .hero-image-col { order: -1; }
        }
        .hero-image-wrap { position: relative; height: 480px; overflow: hidden; }
        @media (max-width: 768px) { .hero-image-wrap { height: 260px; } }
        .hero-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(transparent, rgba(26,18,8,0.55));
          padding: 20px 24px;
          font-family: 'Bodoni Moda', Georgia, serif; font-style: italic; font-size: 13px; color: #E8D5A3;
        }

        .stats-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          max-width: 980px; margin: 0 auto;
        }
        .stat-cell { padding: 28px 24px; text-align: center; border-right: 0.5px solid rgba(201,168,76,0.15); }
        .stat-cell:last-child { border-right: none; }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
          .stat-cell { border-right: none; border-bottom: 0.5px solid rgba(201,168,76,0.15); }
          .stat-cell:last-child { border-bottom: none; }
        }

        .system-top-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
          max-width: 980px; margin: 0 auto 48px;
        }
        @media (max-width: 768px) { .system-top-grid { grid-template-columns: 1fr; } }

        .modules-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2px; }
        @media (max-width: 768px) { .modules-grid { grid-template-columns: 1fr; } }

        .bonus-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start;
          max-width: 980px; margin: 44px auto 0;
        }
        @media (max-width: 768px) {
          .bonus-grid { grid-template-columns: 1fr; }
          .bonus-image-col { order: -1; }
        }

        .built-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 980px; margin: 0 auto; }
        @media (max-width: 768px) { .built-grid { grid-template-columns: 1fr; } }

        .outcomes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; max-width: 980px; margin: 40px auto 0; }
        @media (max-width: 640px) { .outcomes-grid { grid-template-columns: 1fr; } }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(201,168,76,0.35); }
          70% { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        }
      `}</style>

      {/* Sticky Nav */}
      <nav className="sticky-nav" style={{ transform: scrolled ? "translateY(0)" : "translateY(-100%)" }}>
        <span className="nav-brand">Boss Era™</span>
        <a href={STRIPE_LINK} className="nav-cta-btn" onClick={handleStripeClick}>Get Access — $27</a>
      </nav>

      {/* Static Header */}
      <header style={{ background: "#1E1530", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "14px", letterSpacing: "0.15em", color: "#C9A84C" }}>Boss Era™</span>
        <a href={STRIPE_LINK} className="nav-cta-btn" onClick={handleStripeClick}>Get Access — $27</a>
      </header>

      {/* Hero */}
      <section style={{ background: "#F0E8DC" }}>
        <div className="hero-grid">
          {/* Left col */}
          <div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.28em", color: "#8B7340", textTransform: "uppercase", borderBottom: "0.5px solid rgba(139,115,64,0.25)", paddingBottom: "12px", marginBottom: "20px" }}>
              Boss Era™ · For Creators
            </div>
            <h1 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "54px", fontWeight: 400, lineHeight: 1.05, marginBottom: "16px" }}>
              Stop Using AI.<br />
              <em style={{ color: "#8B7340" }}>Start Building</em><br />
              With It.
            </h1>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "16px", fontWeight: 300, color: "#555", lineHeight: 1.75, marginBottom: "28px", maxWidth: "380px" }}>
              Clone my exact AI system — generate 30 days of high-converting content in 15 minutes.
            </p>
            <a
              href={STRIPE_LINK}
              onClick={handleStripeClick}
              style={{
                display: "inline-block", background: "#2D1B3D", color: "#E8D5A3",
                fontFamily: "'Jost', sans-serif", fontSize: "10px", fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                padding: "18px 40px", textDecoration: "none",
                animation: "pulse 2.5s ease-in-out infinite",
              }}
            >
              Get Instant Access — $27
            </a>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#999", marginTop: "10px", letterSpacing: "0.04em" }}>
              Instant digital access · $27 one-time · No subscription
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#8B7340", fontStyle: "italic", marginTop: "6px" }}>
              Access to all future updates included
            </p>
          </div>

          {/* Right col */}
          <div className="hero-image-col">
            <div className="hero-image-wrap">
              <img
                src="/images/hero-mockup.png"
                alt="AI Content to Cash System displayed on device — Boss Era™"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                loading="eager"
              />
              <div className="hero-caption">The system that runs your content.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "#1E1530", padding: "0 32px" }}>
        <div className="stats-grid">
          {[
            ["150+", "AI Prompts & Content Formulas"],
            ["9", "Complete Modules"],
            ["$27", "One-Time Access"],
          ].map(([num, label]) => (
            <div key={label} className="stat-cell">
              <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "38px", color: "#C9A84C", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "#8B7340", textTransform: "uppercase", marginTop: "6px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* System Section */}
      <section style={{ background: "#F0E8DC", padding: "72px 32px" }}>
        <div className="system-top-grid">
          <div>
            <Tag>The System</Tag>
            <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "44px", lineHeight: 1.1, marginBottom: "16px" }}>
              A Start-to-Finish<br />
              <em style={{ color: "#8B7340" }}>AI Business Blueprint</em>
            </h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "18px", fontWeight: 300, color: "#444", lineHeight: 1.75 }}>
              From uncertain how to prompt, to running a structured content and income system with AI doing the heavy work.
            </p>
          </div>
          <div>
            <img
              src="/images/library-mockup.png"
              alt="Boss Era™ Digital Library on phone — AI Content to Cash System included files"
              style={{ maxWidth: "180px", width: "100%", aspectRatio: "9/16", borderRadius: "24px", display: "block", margin: "0 auto", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>

        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div className="modules-grid">
            {modules.map((mod) => {
              const isOdd = parseInt(mod.n) % 2 !== 0;
              return (
                <FadeIn key={mod.n}>
                  <div style={{ background: isOdd ? "#1E1530" : "#EDE2D4", padding: "22px 20px", height: "100%" }}>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "8px" }}>
                      {mod.n}
                    </div>
                    <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "16px", color: isOdd ? "#F0E8DC" : "#1A1A1A", marginBottom: "6px", lineHeight: 1.25 }}>
                      {mod.title}
                    </div>
                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 300, color: isOdd ? "#8B7340" : "#666", lineHeight: 1.6 }}>
                      {mod.desc}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section style={{ background: "#2D1B3D", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "0.5px", background: "#C9A84C", margin: "0 auto 28px" }} />
          <blockquote style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "26px", fontStyle: "italic", color: "#F0E8DC", lineHeight: 1.55, marginBottom: "20px" }}>
            "Most creators are using AI to consume content. Almost none are using it to build income."
          </blockquote>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#8B7340", textTransform: "uppercase", margin: 0 }}>
            Boss Era™ · The difference that changes everything
          </p>
        </div>
      </section>

      {/* Bonus Vault */}
      <section style={{ background: "#EDE2D4", padding: "72px 32px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <Tag>Bonus Vault</Tag>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "44px" }}>
            Everything Included.<br />
            <em style={{ color: "#8B7340" }}>All at No Extra Cost.</em>
          </h2>
        </div>
        <div className="bonus-grid">
          {/* Left — list */}
          <div>
            {bonuses.map((b) => (
              <div key={b.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "0.5px solid rgba(139,115,64,0.2)" }}>
                <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "15px", color: "#1A1A1A", paddingRight: "12px" }}>{b.name}</span>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#AAA", textDecoration: "line-through" }}>{b.price}</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: "#8B7340", letterSpacing: "0.1em", textTransform: "uppercase" }}>Included</div>
                </div>
              </div>
            ))}

            {/* Urgency bar */}
            <div style={{ background: "#1E1530", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", fontStyle: "italic", color: "#C9A84C", lineHeight: 1.5, margin: 0 }}>
                Launch pricing only. This bonus stack will be sold separately once the launch phase closes.
              </p>
              <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "28px", color: "#C9A84C", textDecoration: "line-through", textDecorationColor: "rgba(201,168,76,0.5)", flexShrink: 0 }}>$343</span>
            </div>

            {/* Price bar */}
            <div style={{ background: "#2D1B3D", padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase" }}>Your investment today</span>
              <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "34px", color: "#C9A84C" }}>$27</span>
            </div>
          </div>

          {/* Right — image */}
          <div className="bonus-image-col">
            <img
              src="/images/bonus-mockup.png"
              alt="Boss Era™ Bonus Vault contents on phone screen"
              style={{ maxWidth: "260px", width: "100%", aspectRatio: "9/16", borderRadius: "28px", display: "block", margin: "0 auto", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section style={{ background: "#C9A84C", padding: "14px 32px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2D1B3D", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: "12px", color: "#2D1B3D", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Launch Price Ending Soon
          </span>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2D1B3D", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontStyle: "italic", fontSize: "13px", color: "#2D1B3D", opacity: 0.75 }}>
            $27 is the launch price. Once this phase closes, the price increases. No exceptions.
          </span>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2D1B3D", flexShrink: 0 }} />
        </div>
      </section>

      {/* Built For You */}
      <section style={{ background: "#2D1B3D", padding: "72px 32px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "38px", color: "#F0E8DC", marginBottom: "6px" }}>
            This Was Built For You.
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#8B7340", letterSpacing: "0.08em", marginBottom: "44px" }}>
            If any of this sounds familiar, you are exactly who this is for
          </p>
          <div className="built-grid">
            <div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.22em", color: "#8B7340", textTransform: "uppercase", borderBottom: "0.5px solid rgba(139,115,64,0.3)", paddingBottom: "10px", marginBottom: "16px" }}>
                This is for you if
              </div>
              {[
                "You use AI to scroll and consume, not to build and earn",
                "You post consistently but make no sales from your content",
                "You want a system, not another course to sit through",
                "You are ready to treat your content like a business",
                "$27 is nothing if it gives you back your time every month",
              ].map(t => (
                <div key={t} style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "16px", fontWeight: 300, color: "#E0D8CE", padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)", lineHeight: 1.5, display: "flex", gap: "12px" }}>
                  <span style={{ color: "#C9A84C", flexShrink: 0 }}>→</span>{t}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.22em", color: "#8B7340", textTransform: "uppercase", borderBottom: "0.5px solid rgba(139,115,64,0.3)", paddingBottom: "10px", marginBottom: "16px" }}>
                This is not for you if
              </div>
              {[
                "You want overnight results without implementation",
                "You are looking for motivation, not a system",
                "You will not spend time each day on your content",
                "You believe AI will do everything without your direction",
              ].map(t => (
                <div key={t} style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "16px", fontWeight: 300, color: "#E0D8CE", padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)", lineHeight: 1.5, display: "flex", gap: "12px" }}>
                  <span style={{ color: "#555", flexShrink: 0 }}>×</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section style={{ background: "#F0E8DC", padding: "72px 32px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <Tag>What You Walk Away With</Tag>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "44px" }}>
            The Outcomes That<br />
            <em style={{ color: "#8B7340" }}>Actually Matter</em>
          </h2>
        </div>
        <div className="outcomes-grid">
          {[
            { n: "01", title: "A repeatable content framework", desc: "30 days of content planned and written in a single session. Every month." },
            { n: "02", title: "An AI sales system", desc: "Content that moves people from follower to buyer without a sales call." },
            { n: "03", title: "A creative method that scales", desc: "The same system works whether you have 500 or 50,000 followers." },
            { n: "04", title: "A prompt library that compounds", desc: "150+ prompts and codes that get sharper every time you use them." },
          ].map(card => (
            <FadeIn key={card.n}>
              <div style={{ background: "#EDE2D4", padding: "30px 26px" }}>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase", marginBottom: "10px" }}>{card.n}</div>
                <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "20px", color: "#1A1A1A", marginBottom: "8px", lineHeight: 1.2 }}>{card.title}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "13px", fontWeight: 300, color: "#666", lineHeight: 1.65 }}>{card.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#1E1530", padding: "80px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "52px", fontStyle: "italic", color: "#F0E8DC", lineHeight: 1.05, letterSpacing: "-0.01em", wordSpacing: "0.02em", marginBottom: "16px" }}>
          Your AI Era Starts Now.
        </h2>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "15px", fontWeight: 300, color: "#8B7340", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 40px" }}>
          The difference between creators building with AI and creators watching others build is one $27 decision.
        </p>
        <div style={{ background: "#F0E8DC", padding: "48px 40px", maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "72px", color: "#2D1B3D", lineHeight: 1, marginBottom: "6px" }}>$27</div>
          <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.18em", color: "#8B7340", textTransform: "uppercase", marginBottom: "28px" }}>
            One-time · Instant access · Lifetime updates
          </div>
          <a
            href={STRIPE_LINK}
            onClick={handleStripeClick}
            style={{
              display: "inline-block", background: "#2D1B3D", color: "#C9A84C",
              fontFamily: "'Jost', sans-serif", fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "18px 52px", textDecoration: "none", marginBottom: "12px",
              animation: "pulse 2.5s ease-in-out infinite",
            }}
          >
            Get Instant Access
          </a>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#999", letterSpacing: "0.06em" }}>
            Instant digital access · $27 one-time · No subscription
          </p>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", color: "#8B7340", fontStyle: "italic", marginTop: "6px" }}>
            Access to all future updates included
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ background: "#F0E8DC", borderTop: "0.5px solid rgba(139,115,64,0.2)", padding: "36px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.18em", color: "#AAA", textTransform: "uppercase", marginBottom: "12px" }}>
          Secure Checkout · Instant Delivery · Lifetime Access
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 300, fontStyle: "italic", color: "#AAA", letterSpacing: "0.06em" }}>
          Processed securely via Stripe · Visa · Mastercard · PayPal · Apple Pay
        </p>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0F0B1A", padding: "32px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "12px", letterSpacing: "0.18em", color: "#C9A84C", marginBottom: "6px" }}>Boss Era™</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#8B7340", letterSpacing: "0.1em", marginBottom: "12px" }}>@bossdigitalbusiness</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: "#444", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
          Results depend on your individual effort, consistency, and market conditions. This is an educational digital product. Income figures mentioned are examples, not guarantees.
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: "#444", marginTop: "12px" }}>
          © 2026 Boss Era™ · <a href="/privacy" style={{ color: "#8B7340", textDecoration: "none" }}>Privacy Policy</a>
        </p>
        <div style={{ borderTop: "0.5px solid rgba(201,168,76,0.15)", paddingTop: "16px", marginTop: "16px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(139,115,64,0.5)", marginBottom: "8px" }}>Partner offer</p>
          <a href="/aimuse" style={{ display: "inline-block" }}>
            <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ height: "22px", width: "auto", opacity: 0.6 }} />
          </a>
        </div>
      </footer>
    </div>
  );
}

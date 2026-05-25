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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const GoldLine = () => (
  <div style={{ width: "48px", height: "2px", background: "var(--gold)", margin: "0 auto 2rem" }} />
);

const CTAButton = ({ label = "Get Instant Access · $27", sub }) => (
  <div style={{ textAlign: "center" }}>
    <a
      href={STRIPE_LINK}
      style={{
        display: "inline-block",
        background: "#1A1025",
        color: "#C9A96E",
        fontFamily: "var(--font-sans)",
        fontWeight: "700",
        fontSize: "1.05rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "1.4rem 3.5rem",
        textDecoration: "none",
        transition: "opacity 0.2s, transform 0.2s",
        animation: "pulse 2.5s ease-in-out infinite",
      }}
      onClick={() => { console.log("AddToCart firing"); if (typeof fbq !== "undefined") { fbq("track", "AddToCart", { value: 27.00, currency: "USD", content_name: "Claude AI Content to Cash", content_type: "product" }); } }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {label}
    </a>
    {sub && (
      <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--cream-muted)", letterSpacing: "0.05em", fontFamily: "var(--font-sans)" }}>
        {sub}
      </p>
    )}
  </div>
);

export default function ClaudeLandingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-serif)", background: "var(--navy)", color: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
      <LeadMagnetPopup />
      <header style={{ background:"#1A1025", borderBottom:"1px solid rgba(201,169,110,0.15)", padding:"0.85rem 2rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"var(--font-serif)", fontSize:"1.1rem", color:"var(--gold)", letterSpacing:"0.12em" }}>Boss Era™</span>
      </header>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        :root {
          --navy: #E8D5C4;
          --navy-light: #F5EDE8;
          --gold: #C9A96E;
          --gold-light: #D4B87A;
          --cream: #1A1025;
          --cream-muted: rgba(26,16,37,0.55);
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Instrument Sans', Helvetica, sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: var(--navy); }

        .section { padding: 5rem 1.5rem; max-width: 780px; margin: 0 auto; }

        .eyebrow {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A5C3E;
          margin-bottom: 1.2rem;
        }

        h1 {
          font-family: var(--font-serif);
          font-weight: 300;
          font-size: clamp(2.6rem, 6vw, 4.2rem);
          line-height: 1.1;
          color: var(--cream);
          margin-bottom: 1.5rem;
        }

        h2 {
          font-family: var(--font-serif);
          font-weight: 300;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.15;
          color: var(--cream);
          margin-bottom: 1.2rem;
        }

        h3 {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: 1.35rem;
          color: var(--cream);
          margin-bottom: 0.5rem;
        }

        p {
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(26,16,37,0.75);
        }

        .gold-bar {
          display: block;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .sticky-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(26,16,37,0.97);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 2rem;
          transition: transform 0.3s ease;
        }

        .module-card {
          background: var(--navy-light);
          border: 1px solid rgba(201,169,110,0.2);
          padding: 1.8rem 2rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .module-number {
          position: absolute;
          top: 1.5rem; right: 1.8rem;
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 300;
          color: rgba(201,169,110,0.12);
          line-height: 1;
        }

        .check-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: rgba(26,16,37,0.75);
          line-height: 1.5;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          min-width: 20px;
          border-radius: 50%;
          background: rgba(201,169,110,0.15);
          border: 1px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          font-size: 0.65rem;
          color: var(--gold);
        }

        .value-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(201,169,110,0.1);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #3D2B1F;
        }

        .value-price {
          color: var(--gold);
          font-weight: 600;
          font-size: 0.88rem;
          white-space: nowrap;
          margin-left: 1rem;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent);
          margin: 4rem 0;
        }

        .for-notfor {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 640px) {
          .for-notfor { grid-template-columns: 1fr; }
          .section { padding: 4rem 1.25rem; }
          .sticky-bar { padding: 0.75rem 1.25rem; }
        }

        .for-col {
          background: var(--navy-light);
          border: 1px solid rgba(201,169,110,0.18);
          padding: 1.8rem;
        }

        .for-col h4 {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 1.2rem;
        }

        .for-item {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: rgba(26,16,37,0.7);
          line-height: 1.6;
          margin-bottom: 0.75rem;
          padding-left: 1.2rem;
          position: relative;
        }

        .for-item::before {
          content: attr(data-marker);
          position: absolute;
          left: 0;
          color: var(--gold);
          font-weight: 700;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(201,169,110,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(201,169,110,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,169,110,0); }
        }

        blockquote {
          border-left: 2px solid var(--gold);
          padding: 1.2rem 1.8rem;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-style: italic;
          font-weight: 300;
          color: var(--cream);
          line-height: 1.5;
          background: var(--navy-light);
          margin: 2rem 0;
        }
      `}</style>

      {/* Sticky Nav */}
      <div className="sticky-bar" style={{ transform: scrolled ? "translateY(0)" : "translateY(-100%)" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--gold)", letterSpacing: "0.05em" }}>
          Boss Era™
        </span>
        <a
          href={STRIPE_LINK}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1A1025",
            background: "#C9A96E",
            padding: "0.55rem 1.4rem",
            textDecoration: "none",
          }}
        >
          Get Access — $27
        </a>
      </div>

      {/* Hero */}
      <section style={{ background: "var(--navy)", paddingTop: "1.5rem", paddingBottom: "5rem" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <div
            style={{
              opacity: 1,
              animation: "fadeDown 0.9s ease both",
            }}
          >
            <style>{`@keyframes fadeDown { from { opacity:0; transform: translateY(-18px); } to { opacity:1; transform: translateY(0); } }`}</style>
            <p className="eyebrow">Boss Era™ · Premium Edition</p>
            <svg width="160" height="110" viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{margin: "0 auto 2rem", display: "block"}} aria-hidden="true">
              <circle cx="80" cy="55" r="5" fill="#C9A96E"/>
              <circle cx="26.6" cy="20.6" r="3.5" fill="#C9A96E" opacity="0.7"/>
              <circle cx="133" cy="20.6" r="3.5" fill="#C9A96E" opacity="0.7"/>
              <circle cx="13.3" cy="75.6" r="3" fill="#C9A96E" opacity="0.5"/>
              <circle cx="146.3" cy="75.6" r="3" fill="#C9A96E" opacity="0.5"/>
              <circle cx="46.6" cy="93.5" r="3" fill="#C9A96E" opacity="0.5"/>
              <circle cx="113.1" cy="93.5" r="3" fill="#C9A96E" opacity="0.5"/>
              <circle cx="53.2" cy="13.75" r="2.5" fill="#C9A96E" opacity="0.4"/>
              <circle cx="106.4" cy="13.75" r="2.5" fill="#C9A96E" opacity="0.4"/>
              <line x1="80" y1="55" x2="26.6" y2="20.6" stroke="#C9A96E" strokeWidth="0.75" opacity="0.4"/>
              <line x1="80" y1="55" x2="133" y2="20.6" stroke="#C9A96E" strokeWidth="0.75" opacity="0.4"/>
              <line x1="80" y1="55" x2="13.3" y2="75.6" stroke="#C9A96E" strokeWidth="0.75" opacity="0.3"/>
              <line x1="80" y1="55" x2="146.3" y2="75.6" stroke="#C9A96E" strokeWidth="0.75" opacity="0.3"/>
              <line x1="80" y1="55" x2="46.6" y2="93.5" stroke="#C9A96E" strokeWidth="0.75" opacity="0.3"/>
              <line x1="80" y1="55" x2="113.1" y2="93.5" stroke="#C9A96E" strokeWidth="0.75" opacity="0.3"/>
              <line x1="26.6" y1="20.6" x2="53.2" y2="13.75" stroke="#C9A96E" strokeWidth="0.5" opacity="0.25"/>
              <line x1="133" y1="20.6" x2="106.4" y2="13.75" stroke="#C9A96E" strokeWidth="0.5" opacity="0.25"/>
              <line x1="26.6" y1="20.6" x2="13.3" y2="75.6" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2"/>
              <line x1="133" y1="20.6" x2="146.3" y2="75.6" stroke="#C9A96E" strokeWidth="0.5" opacity="0.2"/>
            </svg>
            <h1>
              Stop Using AI<br />
              <em style={{ color: "#8B5E3C" }}>Start Building With It.</em>
            </h1>
            <p style={{ maxWidth: "560px", margin: "0 auto 2.5rem", fontSize: "1.1rem" }}>
              The complete system that turns Claude AI into your personal content engine, offer builder, and income strategy — built for women who are done experimenting and ready to convert.
            </p>
            <CTAButton sub="Instant digital access · $27 one-time · No subscription" />
          </div>
        </div>
        <span className="gold-bar" />
      </section>

      {/* The Problem */}
      <section style={{ background: "var(--navy-light)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">The Real Problem</p>
            <GoldLine />
            <h2>Most women are using AI.<br />Almost none are building with it.</h2>
            <p style={{ maxWidth: "580px", margin: "0 auto 2rem" }}>
              You've opened Claude. You've typed a prompt. You got something generic back and thought: <em>"This isn't that useful."</em>
            </p>
            <p style={{ maxWidth: "580px", margin: "0 auto 2rem" }}>
              That moment isn't AI failing you. It's the absence of a system. The tool is powerful. The missing piece is how to use it with precision — for content that converts, offers that sell, and a business that compounds.
            </p>
            <blockquote style={{ maxWidth: "620px", margin: "2rem auto 0", textAlign: "left" }}>
              "The better your input, the better its output. That single principle is the foundation of everything."
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <div className="divider" style={{ margin: 0 }} />

      {/* What It Is */}
      <section style={{ background: "var(--navy)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">Claude AI · Content to Cash</p>
            <GoldLine />
            <h2>A Start-to-Finish<br /><em style={{ color: "#8B5E3C" }}>AI Business Blueprint.</em></h2>
            <p style={{ maxWidth: "580px", margin: "0 auto" }}>
              Nine parts. Three levels. One outcome: you go from unsure how to prompt to running a structured content and income system — with AI doing the heavy work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Modules */}
      <section style={{ background: "var(--navy)", paddingTop: "1rem" }}>
        <div className="section" style={{ paddingTop: "1rem" }}>
          {[
            { n: "01", title: "AI Foundations", sub: "Mindset · Mechanics · Method", desc: "Understand exactly how Claude works, why most people use it wrong, and the single shift that changes your results immediately." },
            { n: "02", title: "How to Think When Using AI", sub: "The Four-Element Framework", desc: "The ROLE + CONTEXT + TASK + FORMAT system that produces professional-grade output every time — and how to iterate until it's perfect." },
            { n: "03", title: "Content Creation System", sub: "Hooks · Carousels · Viral Topics", desc: "Ten high-converting content prompts, the carousel structure that drives saves, and the difference between content that gets likes versus content that builds buyers." },
            { n: "04", title: "Content → Cash System", sub: "The Conversion Chain", desc: "How to turn posts into leads, the CTA swipe file that works without pressure, and how to use keywords and DMs to close sales — calmly." },
            { n: "05", title: "DM Sales System", sub: "Scripts · Flows · Closes", desc: "The exact DM conversation flow from first message to confirmed purchase — without chasing, without pressure, and without losing the sale at the objection stage." },
            { n: "06", title: "Offer Creation with AI", sub: "Build Something Worth Selling", desc: "Use Claude to design, name, price, and position a digital product. The framework for creating an offer people feel they'd be foolish to pass up." },
            { n: "07", title: "Email & Funnel Strategy", sub: "Sequences That Sell on Autopilot", desc: "How to build a simple email funnel using AI — from lead magnet to welcome sequence to conversion emails — without a tech background." },
            { n: "08", title: "First-Sales Roadmap", sub: "Weeks 1–4 Plan", desc: "A realistic, day-by-day plan for your first 10 sales. Foundation, visibility, offers, and closing — sequenced so nothing falls through." },
            { n: "09", title: "Mistakes & Reset Strategy", sub: "Fix It in 72 Hours", desc: "Why people fail with AI, how to diagnose your specific block, and the 72-hour reset that gets you back to forward momentum." },
          ].map((mod, i) => (
            <FadeIn key={mod.n} delay={i * 0.05}>
              <div className="module-card">
                <span className="module-number">{mod.n}</span>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.3rem" }}>
                  Part {mod.n} · {mod.sub}
                </p>
                <h3>{mod.title}</h3>
                <p style={{ fontSize: "0.92rem", marginTop: "0.5rem" }}>{mod.desc}</p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.1}>
            <div className="module-card" style={{ borderColor: "rgba(201,169,110,0.4)", background: "rgba(201,169,110,0.06)" }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>Bonus</p>
              <h3>Swipe Files & Action Plans</h3>
              <p style={{ fontSize: "0.92rem", marginTop: "0.5rem" }}>20 ready-to-use prompts across content creation, sales copywriting, business strategy, and mindset clarity. Quick-start checklist. 7-day action plan. Everything you need to go from reading to revenue.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Value Stack */}
      <section style={{ background: "var(--navy-light)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">What You're Getting</p>
            <GoldLine />
            <h2>Everything Inside.<br /><em style={{ color: "#8B5E3C" }}>One Price.</em></h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ marginTop: "2rem", textAlign: "left" }}>
              {[
                ["AI Foundations + Four-Element Framework", "$19"],
                ["Content Creation System (10 prompt templates)", "$19"],
                ["Content → Cash Conversion System", "$17"],
                ["DM Sales Scripts & Flow", "$19"],
                ["Offer Creation Framework with AI", "$17"],
                ["Email & Funnel Strategy", "$15"],
                ["First-Sales 4-Week Roadmap", "$15"],
                ["Mistakes & 72-Hour Reset Protocol", "$12"],
                ["20 Ready-to-Use Prompt Swipe File", "$15"],
                ["7-Day Action Plan + Quick-Start Checklist", "$12"],
              ].map(([item, val]) => (
                <div className="value-row" key={item}>
                  <span>{item}</span>
                  <span className="value-price">{val}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"1.2rem 0 0.5rem", borderTop:"1px solid rgba(201,169,110,0.3)", marginTop:"0.5rem" }}>
                <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(26,16,37,0.55)" }}>Total Value</span>
                <span style={{ fontFamily:"var(--font-serif)", fontSize:"1.5rem", color:"rgba(26,16,37,0.55)", textDecoration:"line-through", textDecorationColor:"rgba(26,16,37,0.55)", textDecorationThickness:"2px" }}>$160</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"0.5rem 0 1.5rem" }}>
                <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)" }}>Your Investment</span>
                <span style={{ fontFamily:"var(--font-serif)", fontSize:"3rem", color:"var(--gold)", fontWeight:"300" }}>$27</span>
              </div>
            </div>
            <CTAButton sub="Instant access · No subscription · Digital delivery" />
          </FadeIn>
        </div>
      </section>

      {/* For / Not For */}
      <section style={{ background: "var(--navy)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">Clarity Before You Buy</p>
            <GoldLine />
            <h2>Built for Her.<br /><em style={{ color: "#8B5E3C" }}>Not for Everyone.</em></h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="for-notfor" style={{ marginTop: "2.5rem", textAlign: "left" }}>
              <div className="for-col">
                <h4 style={{ color: "var(--gold)" }}>✦ This is for you if...</h4>
                {[
                  "You've tried AI but never felt like it was actually working for you",
                  "You want to create content that builds authority and converts — not just fills your grid",
                  "You're building a digital income stream and need a system, not scattered prompts",
                  "You want to work smarter — not grind harder — and AI is the leverage you haven't fully used yet",
                  "You're ready to move from experimenting to executing",
                ].map(t => <p key={t} className="for-item" data-marker="✓">{t}</p>)}
              </div>
              <div className="for-col">
                <h4 style={{ color: "var(--cream-muted)" }}>✗ This is not for you if...</h4>
                {[
                  "You want someone to run your business for you",
                  "You're looking for overnight income without consistent action",
                  "You refuse to invest in learning — even at $27",
                  "You want theory and inspiration instead of systems and execution",
                  "You're not building a real offer or digital product",
                ].map(t => <p key={t} className="for-item" data-marker="✗" style={{ color: "rgba(26,16,37,0.4)" }}>{t}</p>)}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ maxWidth: "520px", margin: "3rem auto 0", fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontStyle: "italic", color: "var(--cream-muted)" }}>
              "The woman this system is built for is not waiting to feel ready. She is building the readiness by moving."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What You Leave With */}
      <section style={{ background: "var(--navy-light)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">Your Outcome</p>
            <GoldLine />
            <h2>What You Walk Away With.</h2>
            <p style={{ maxWidth: "560px", margin: "0 auto 2.5rem" }}>
              Not inspiration. Not more content ideas. A complete, operational system.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ textAlign: "left", maxWidth: "580px", margin: "0 auto" }}>
              {[
                ["A prompting framework", "that produces professional output every single time — not luck-based results"],
                ["A content system", "built around conversion, not just engagement — posts that build trust and sell"],
                ["A DM sales flow", "you can use immediately to close buyers without pressure or scripts that feel fake"],
                ["An offer creation method", "to design or refine a digital product that people actually want to pay for"],
                ["A 4-week roadmap", "to your first 10 sales — structured, realistic, actionable"],
                ["20 ready prompts", "you can copy, customise, and deploy across every area of your business today"],
              ].map(([bold, rest]) => (
                <div key={bold} className="check-row">
                  <span className="check-icon">✓</span>
                  <span><strong style={{ color: "var(--cream)", fontWeight: "600" }}>{bold}</strong> {rest}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social proof bar */}
      <section style={{ background: "var(--navy-light)", borderTop: "1px solid rgba(201,169,110,0.1)", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2.5rem 1.5rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", textAlign: "center" }}>
          {[["427+", "Authority Quotes"], ["9", "Complete Modules"], ["$27", "One-Time Access"]].map(([num, label]) => (
            <div key={label}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: "300", color: "var(--gold)", margin: "0 0 0.25rem" }}>{num}</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,16,37,0.5)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "var(--navy)", borderTop: "1px solid rgba(201,169,110,0.15)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">Boss Era™ · Claude AI System</p>
            <GoldLine />
            <h2>Your AI Era<br /><em style={{ color: "#8B5E3C" }}>Starts Now.</em></h2>
            <p style={{ maxWidth: "520px", margin: "0 auto 2.5rem" }}>
              The difference between where you are and where you want to be is not information. It is implementation. This system gives you both.
            </p>
            <CTAButton label="Get Instant Access · $27" sub="One-time · Instant digital delivery · No subscription" />
            <p style={{ marginTop: "3rem", fontSize: "0.78rem", fontFamily: "var(--font-sans)", color: "var(--cream-muted)", maxWidth: "440px", margin: "3rem auto 0", lineHeight: "1.7" }}>
              Results depend on your individual effort, consistency, and market conditions. This is an educational digital product. Income figures mentioned are examples, not guarantees.
            </p>
          </FadeIn>
        </div>
        <span className="gold-bar" />
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--navy)", borderTop: "1px solid rgba(201,169,110,0.1)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--gold)", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          Boss Era™
        </p>
        <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", color: "var(--cream-muted)", letterSpacing: "0.05em" }}>
          © 2026 Boss Era™ · bossfacelessmentor.com
        </p>
        <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-sans)", color: "rgba(26,16,37,0.3)", marginTop: "0.5rem" }}>
          <a href="/privacy" style={{ color: "inherit", textDecoration: "underline" }}>Privacy Policy</a>
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

import { useState, useEffect, useRef } from "react";
import LeadMagnetPopup from "../components/LeadMagnetPopup";

const BEACON_LINK = "https://shop.beacons.ai/bossera.digital/9d39a1a8-a094-4381-b622-011dac59a0f5?t=1778939518112";

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

const CTAButton = () => (
  <div style={{ textAlign: "center" }}>
    <a href={BEACON_LINK} style={{
      display: "inline-block", background: "#2C4A47", color: "#F5EDE8",
      fontFamily: "'Instrument Sans', sans-serif", fontWeight: "700",
      fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase",
      padding: "1.2rem 3rem", textDecoration: "none", transition: "opacity 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      Get Instant Access →
    </a>
    <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", fontFamily: "'Instrument Sans', sans-serif", color: "rgba(44,74,71,0.6)", letterSpacing: "0.05em" }}>
      Instant access · Skool community · One-time payment
    </p>
  </div>
);

export default function AiMUSE() {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#F5EDE8", color: "#2C4A47", minHeight: "100vh", overflowX: "hidden" }}>
      <LeadMagnetPopup />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .teal-bar { display: block; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, #7A9E9B, transparent); }
        .section { padding: 5rem 1.5rem; max-width: 780px; margin: 0 auto; }
        .eyebrow { font-family: 'Instrument Sans', sans-serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: #7A9E9B; margin-bottom: 1.2rem; }
        h1 { font-weight: 300; font-size: clamp(2.4rem, 5vw, 3.8rem); line-height: 1.1; color: #2C4A47; margin-bottom: 1.5rem; }
        h2 { font-weight: 300; font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.15; color: #2C4A47; margin-bottom: 1.2rem; }
        h3 { font-weight: 400; font-size: 1.25rem; color: #2C4A47; margin-bottom: 0.5rem; }
        p { font-family: 'Instrument Sans', sans-serif; font-size: 1rem; line-height: 1.75; color: rgba(44,74,71,0.75); }
        .module-card { background: #EFE3D8; border: 1px solid rgba(122,158,155,0.2); padding: 1.6rem 1.8rem; margin-bottom: 0.75rem; }
        .check-row { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 0.85rem; font-family: 'Instrument Sans', sans-serif; font-size: 0.92rem; color: rgba(44,74,71,0.78); line-height: 1.5; }
        .check-icon { width: 20px; height: 20px; min-width: 20px; border-radius: 50%; background: rgba(122,158,155,0.2); border: 1px solid #7A9E9B; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #7A9E9B; margin-top: 1px; }
        @media (max-width: 640px) { .section { padding: 4rem 1.25rem; } }
      `}</style>

      <header style={{ background:"#2C4A47", borderBottom:"1px solid rgba(122,158,155,0.3)", padding:"0.85rem 2rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"1.5rem" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", color:"#D4B99A", letterSpacing:"0.12em" }}>Boss Era™</span>
        <span style={{ color:"rgba(212,185,154,0.3)", fontSize:"1rem" }}>×</span>
        <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ height:"28px", width:"auto" }} />
      </header>

      <span className="teal-bar" />

      {/* Hero */}
      <section style={{ background: "#F5EDE8", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="section" style={{ textAlign: "center", paddingTop: "1.5rem" }}>
          <img src="/aimuse-logo.png" alt="AiMUSE Alchemy" style={{ width:"220px", margin:"0 auto 2rem", display:"block" }} />
          <p className="eyebrow">Boss Era™ · Exclusive Partner Offer</p>
          <div style={{ width: "48px", height: "2px", background: "#7A9E9B", margin: "0 auto 2rem" }} />
          <h1>
            Your AI avatar isn't special.<br />
            <em style={{ color: "#7A9E9B", fontStyle: "italic" }}>Your brand identity is.</em>
          </h1>
          <p style={{ maxWidth: "560px", margin: "0 auto 2.5rem", fontSize: "1.05rem" }}>
            AiMUSE Alchemy is the complete AI creation and branding system for digital creators who are ready to build a distinctive visual identity — music, video, fashion, content, and brand DNA — all powered by AI.
          </p>
          <CTAButton />
        </div>
      </section>

      <span className="teal-bar" />

      {/* What it is */}
      <section style={{ background: "#EFE3D8" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">The Complete Suite</p>
            <div style={{ width: "48px", height: "2px", background: "#7A9E9B", margin: "0 auto 2rem" }} />
            <h2>Everything you need to create<br /><em style={{ color: "#7A9E9B" }}>with AI — consistently.</em></h2>
            <p style={{ maxWidth: "560px", margin: "0 auto" }}>
              1,450+ prompts, tools, and frameworks across 9 creation categories. One Skool community. Unlimited access.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Modules */}
      <section style={{ background: "#F5EDE8" }}>
        <div className="section" style={{ paddingTop: "2rem" }}>
          {[
            ["Create Your Muse", "Build a distinctive AI persona that feels unmistakably yours — not generic, not templated."],
            ["Storytelling Mastery & Brand DNA", "The system for creating content that carries your identity across every format and platform."],
            ["AI Fashion Hauls & Try-Ons", "Generate stunning AI fashion content without a photographer, studio, or wardrobe budget."],
            ["Visual Hooks to Stop the Scroll", "The visual frameworks that make your content impossible to skip — optimized for every platform."],
            ["AI Video Podcasting", "Turn your ideas into professional video podcast content using AI tools from script to screen."],
            ["UGC & Branded Product Visuals", "Create high-converting product content and UGC-style visuals entirely with AI."],
            ["Viral Trends & Dance Workflows", "Stay ahead of trends with AI-powered workflow systems for trend-based content creation."],
            ["AI Music", "Generate original background music and audio branding for your content — no studio required."],
            ["CapCut Editing Tutorials", "Master the editing workflows that turn raw AI content into polished, publishable pieces."],
          ].map(([title, desc], i) => (
            <FadeIn key={title} delay={i * 0.04}>
              <div className="module-card">
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A9E9B", marginBottom: "0.3rem" }}>
                  Module {String(i + 1).padStart(2, "0")}
                </p>
                <h3>{title}</h3>
                <p style={{ fontSize: "0.9rem", marginTop: "0.4rem" }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#2C4A47" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "3.5rem 1.5rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", textAlign: "center" }}>
          {[["1,450+", "Prompts & Tools"], ["9", "Creation Modules"], ["2", "AI Director Bots"]].map(([num, label]) => (
            <div key={label}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: "300", color: "#D4B99A", margin: "0 0 0.25rem" }}>{num}</p>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,237,232,0.5)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For / Not for */}
      <section style={{ background: "#EFE3D8" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">Clarity Before You Join</p>
            <div style={{ width: "48px", height: "2px", background: "#7A9E9B", margin: "0 auto 2rem" }} />
            <h2>Built for Her.<br /><em style={{ color: "#7A9E9B" }}>Not for Everyone.</em></h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem", textAlign: "left" }}>
              <div style={{ background: "#F5EDE8", border: "1px solid rgba(122,158,155,0.2)", padding: "1.8rem" }}>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A9E9B", marginBottom: "1.2rem" }}>✦ This is for you if...</p>
                {["You want to build a distinctive AI-powered visual brand", "You create content and want to level up every format", "You're ready to use AI as a creative tool — not a shortcut", "You want a complete system, not scattered tutorials", "You're building something that lasts"].map(t => (
                  <p key={t} style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "rgba(44,74,71,0.78)", lineHeight: "1.6", marginBottom: "0.65rem", paddingLeft: "1.1rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#7A9E9B" }}>✓</span>{t}
                  </p>
                ))}
              </div>
              <div style={{ background: "#F5EDE8", border: "1px solid rgba(122,158,155,0.2)", padding: "1.8rem" }}>
                <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(44,74,71,0.4)", marginBottom: "1.2rem" }}>✗ This is not for you if...</p>
                {["You want someone to create everything for you", "You're not willing to learn new creative tools", "You want overnight results without building real skills", "You're looking for a one-click content machine", "You're not serious about building your brand"].map(t => (
                  <p key={t} style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.88rem", color: "rgba(44,74,71,0.4)", lineHeight: "1.6", marginBottom: "0.65rem", paddingLeft: "1.1rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0 }}>✗</span>{t}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#F5EDE8", borderTop: "1px solid rgba(122,158,155,0.15)" }}>
        <div className="section" style={{ textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow">AiMUSE Alchemy · Partner Offer</p>
            <div style={{ width: "48px", height: "2px", background: "#7A9E9B", margin: "0 auto 2rem" }} />
            <h2>Your creative AI era<br /><em style={{ color: "#7A9E9B" }}>starts here.</em></h2>
            <p style={{ maxWidth: "500px", margin: "0 auto 2.5rem" }}>
              Join AiMUSE Alchemy and get instant access to the complete suite — 1,450+ prompts, 9 modules, 2 AI Director Bots, and a community of creators building with intention.
            </p>
            <CTAButton />
            <p style={{ marginTop: "3rem", fontSize: "0.75rem", fontFamily: "'Instrument Sans', sans-serif", color: "rgba(44,74,71,0.35)", maxWidth: "400px", margin: "3rem auto 0", lineHeight: "1.7" }}>
              Results depend on individual effort and creative commitment. This is an educational digital product.
            </p>
          </FadeIn>
        </div>
      </section>

      <span className="teal-bar" />

      <footer style={{ background: "#2C4A47", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#D4B99A", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Boss Era™</p>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,237,232,0.35)" }}>
          © 2026 Boss Era™ · <a href="/privacy" style={{ color: "inherit" }}>Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}

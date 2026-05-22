import { useState, useEffect } from "react";

const PDF_URL = "/downloads/free-guide-how-to-start-building-an-ai-influencer.pdf";

export default function LeadMagnetPopup() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("bossera_popup_seen")) return;
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccess = () => {
    localStorage.setItem("bossera_popup_seen", "true");
    setDone(true);
    window.open(PDF_URL, "_blank");
  };

  const handleClose = () => {
    localStorage.setItem("bossera_popup_seen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(26,16,37,0.75)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{
        background: "#F5EDE8", maxWidth: "480px", width: "100%",
        position: "relative", padding: "2.5rem 2rem",
        borderTop: "4px solid #C9A96E",
      }}>
        {/* Close */}
        <button onClick={handleClose} style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "none", border: "none", cursor: "pointer",
          fontSize: "1.2rem", color: "#7A5C3E", lineHeight: 1,
        }}>✕</button>

        {!done ? (
          <>
            <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.68rem",
              letterSpacing:"0.2em", textTransform:"uppercase", color:"#7A9E9B",
              marginBottom:"0.75rem" }}>Free Guide · Instant Access</p>
            <div style={{ width:"40px", height:"2px", background:"#C9A96E", marginBottom:"1.5rem" }} />
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontWeight:300,
              fontSize:"1.8rem", color:"#1A1025", lineHeight:1.2, marginBottom:"0.75rem" }}>
              How to Start Building<br />
              <em style={{ color:"#8B5E3C" }}>an AI Influencer</em>
            </h2>
            <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.9rem",
              color:"rgba(26,16,37,0.65)", lineHeight:1.7, marginBottom:"1.5rem" }}>
              The feminine framework for AI-powered content, authority, and digital income.
              Free PDF — no email required.
            </p>
            <ul style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.85rem",
              color:"rgba(26,16,37,0.7)", lineHeight:1.8, marginBottom:"1.8rem",
              paddingLeft:"1.2rem" }}>
              <li>The 6-step AI Influencer Starter Framework</li>
              <li>AiMUSE Alchemy™ sneak peek — 1,600+ Muses & 2K+ prompts</li>
              <li>Claude + Higgsfield MCP workflow guide</li>
              <li>7 sample luxury Muse prompts</li>
            </ul>
            <button onClick={handleAccess} style={{
              width:"100%", background:"#1A1025", color:"#C9A96E",
              fontFamily:"'Instrument Sans',sans-serif", fontWeight:"700",
              fontSize:"0.9rem", letterSpacing:"0.1em", textTransform:"uppercase",
              padding:"1rem", border:"none", cursor:"pointer",
              marginBottom:"0.75rem",
            }}>
              Get Instant Access →
            </button>
            <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.72rem",
              color:"rgba(26,16,37,0.35)", textAlign:"center", lineHeight:1.6 }}>
              By accessing this guide you agree to our{" "}
              <a href="/privacy" style={{ color:"#7A5C3E" }}>Privacy Policy</a>.
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <>
            <div style={{ textAlign:"center" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem",
                fontWeight:300, color:"#1A1025", marginBottom:"0.5rem" }}>
                Your guide is opening.
              </p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem",
                fontStyle:"italic", color:"#8B5E3C", marginBottom:"1.5rem" }}>
                Check your downloads.
              </p>
              <p style={{ fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.85rem",
                color:"rgba(26,16,37,0.6)", lineHeight:1.7, marginBottom:"1.5rem" }}>
                If it didn't open automatically,{" "}
                <a href={PDF_URL} target="_blank" style={{ color:"#8B5E3C" }}>
                  click here to download
                </a>.
              </p>
              <button onClick={handleClose} style={{
                background:"none", border:"1px solid rgba(26,16,37,0.2)",
                fontFamily:"'Instrument Sans',sans-serif", fontSize:"0.8rem",
                color:"rgba(26,16,37,0.5)", padding:"0.6rem 1.5rem",
                cursor:"pointer", letterSpacing:"0.05em",
              }}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: "#F0E8DC", color: "#444", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3 { font-family: 'Bodoni Moda', Georgia, serif; color: #1A1A1A; }
        body, p, li { font-family: 'Jost', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.8; color: #444; }
        h1 { font-size: 2.2rem; font-weight: 400; margin-bottom: 1.5rem; }
        h2 { font-size: 0.9rem; font-weight: 500; margin: 2rem 0 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: #8B7340; font-family: 'Jost', sans-serif; }
        p, li { margin-bottom: 0.75rem; }
        ul { padding-left: 1.5rem; }
        a { color: #8B7340; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .gold-accent { display: block; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); }
      `}</style>

      {/* Nav */}
      <header style={{ background: "#1E1530", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "14px", letterSpacing: "0.15em", color: "#C9A84C" }}>Boss Era™</span>
      </header>

      <span className="gold-accent" />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B7340", marginBottom: "1rem" }}>
          Boss Era™ · Legal
        </p>
        <h1>Privacy Policy</h1>
        <p>Last updated: April 2026</p>

        <h2>1. Who We Are</h2>
        <p>Boss Era™ operates bossfacelessmentor.com. We create and sell digital educational products for women building online businesses. Contact: via Instagram @bossdigitalbusiness.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect information you provide when purchasing our products (name, email, payment details processed by Stripe). We do not store your payment card information. We also collect usage data automatically through cookies and the Meta Pixel.</p>

        <h2>3. Meta Pixel</h2>
        <p>This website uses the Meta Pixel to measure the effectiveness of our advertising. The Meta Pixel collects data about your visit including pages viewed and actions taken (such as purchases). This data is used to show relevant advertisements on Facebook and Instagram and to measure ad performance. You can opt out of Meta's data use at <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">facebook.com/privacy</a>.</p>

        <h2>4. How We Use Your Information</h2>
        <ul>
          <li>To deliver your digital products via Google Drive</li>
          <li>To send order confirmations via Stripe</li>
          <li>To measure and improve our advertising</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>5. Data Sharing</h2>
        <p>We share data only with: Stripe (payment processing), Meta (advertising measurement), and Google (product delivery). We do not sell your personal data.</p>

        <h2>6. Your Rights (GDPR)</h2>
        <p>If you are in the European Union or European Economic Area, you have the right to access, correct, or delete your personal data. Contact us via Instagram @bossdigitalbusiness to exercise these rights.</p>

        <h2>7. Cookies</h2>
        <p>We use cookies necessary for the functioning of our website and for advertising measurement. By continuing to use our website, you consent to our use of cookies.</p>

        <h2>8. Data Retention</h2>
        <p>We retain your purchase information for as long as required by tax and legal obligations (typically 7 years). You may request deletion of personal data not required for legal compliance.</p>

        <h2>9. Children's Privacy</h2>
        <p>Our products are intended for adults aged 18 and over. We do not knowingly collect information from minors.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this policy periodically. Continued use of our website constitutes acceptance of any changes.</p>
      </div>

      <span className="gold-accent" />

      <footer style={{ background: "#0F0B1A", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: "12px", letterSpacing: "0.18em", color: "#C9A84C", marginBottom: "6px" }}>Boss Era™</p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: "#444" }}>
          © 2026 Boss Era™ · bossfacelessmentor.com · <a href="/privacy" style={{ color: "#8B7340" }}>Privacy Policy</a>
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

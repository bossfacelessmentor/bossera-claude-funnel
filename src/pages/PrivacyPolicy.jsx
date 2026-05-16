export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#E8D5C4", color: "#3D2B1F", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Instrument+Sans:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gold-bar { display: block; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, #C9A96E, transparent); }
        h1 { font-weight: 300; font-size: 2.2rem; margin-bottom: 1.5rem; color: #1A1025; }
        h2 { font-weight: 400; font-size: 1rem; color: #8B5E3C; margin: 2rem 0 0.75rem; font-family: 'Instrument Sans', sans-serif; letter-spacing: 0.05em; text-transform: uppercase; }
        p, li { font-family: 'Instrument Sans', sans-serif; font-size: 0.92rem; line-height: 1.8; color: rgba(26,16,37,0.72); margin-bottom: 0.75rem; }
        ul { padding-left: 1.5rem; }
        a { color: #8B5E3C; }
      `}</style>

      <header style={{ background: "#1A1025", borderBottom: "1px solid rgba(201,169,110,0.15)", padding: "0.85rem 2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#C9A96E", letterSpacing: "0.12em" }}>Boss Era™</span>
      </header>

      <span className="gold-bar" />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A5C3E", marginBottom: "1rem" }}>
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

      <span className="gold-bar" />

      <footer style={{ padding: "2rem 1.5rem", textAlign: "center", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: "0.72rem", color: "rgba(26,16,37,0.35)" }}>
          © 2026 Boss Era™ · bossfacelessmentor.com
        </p>
      </footer>
    </div>
  );
}

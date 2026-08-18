import { useEffect, useState } from 'react';

export default function AccessConfirmedLuxe() {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId && sessionId.trim() !== '') {
      setAllowed(true);
    } else {
      window.location.replace('/luxe');
    }

    return () => {
      if (document.head.contains(meta)) document.head.removeChild(meta);
    };
  }, []);

  if (!allowed) return null;

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: '#F5F0EA', color: '#2D1B3D', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h1, h2, h3 { font-family: 'Bodoni Moda', Georgia, serif; font-weight: 400; }
      `}</style>

      {/* Header */}
      <header style={{ background: '#1E1530', padding: '16px 32px', textAlign: 'center', borderBottom: '0.5px solid rgba(201,168,76,0.2)' }}>
        <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '14px', letterSpacing: '0.18em', color: '#C9A84C' }}>
          ♛ The Luxe Editorial Vault™
        </span>
      </header>

      <main style={{ maxWidth: '620px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
        {/* Crown mark */}
        <div style={{ fontSize: '2.5rem', color: '#C9A84C', marginBottom: '1.5rem', lineHeight: 1 }}>♛</div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, marginBottom: '1.25rem', color: '#2D1B3D' }}>
          You're In.<br />
          <em style={{ color: '#8B7355' }}>Welcome to the Vault.</em>
        </h1>

        <p style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: '#555', marginBottom: '2.5rem' }}>
          Your founding access is confirmed.<br />
          Everything is waiting for you inside.
        </p>

        <a
          href="https://luxe-editorial-vault.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', background: '#1E1530', color: '#C9A84C',
            fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '10px',
            letterSpacing: '0.22em', textTransform: 'uppercase', padding: '18px 48px',
            textDecoration: 'none',
          }}
        >
          Enter the Vault →
        </a>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(139,115,85,0.25)', margin: '3.5rem 0' }} />

        {/* First step */}
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B7355', marginBottom: '1.25rem' }}>
          Your First Step Inside
        </p>
        <p style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: '#555' }}>
          Begin by setting up your Brand Profile — save your brand name, voice and visual direction so every brief arrives in your voice.
        </p>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(139,115,85,0.25)', margin: '3.5rem 0' }} />

        {/* Affiliate */}
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '1.4rem', color: '#2D1B3D', marginBottom: '1rem' }}>
          Love the Vault? Share It.
        </p>
        <p style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.8, color: '#555', marginBottom: '2rem' }}>
          Earn 70% commission ($67.90) on every founding member you refer.<br />
          Email us to get your unique affiliate link.
        </p>
        <a
          href="mailto:bossdigitalera@gmail.com?subject=Luxe Affiliate Link Request"
          style={{
            display: 'inline-block', background: 'transparent', color: '#8B7355',
            border: '0.5px solid #8B7355',
            fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: '10px',
            letterSpacing: '0.22em', textTransform: 'uppercase', padding: '14px 36px',
            textDecoration: 'none',
          }}
        >
          Get My Affiliate Link
        </a>
      </main>

      <footer style={{ background: '#1E1530', padding: '2rem 1.5rem', textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '12px', letterSpacing: '0.18em', color: '#C9A84C', marginBottom: '6px' }}>
          ♛ The Luxe Editorial Vault™
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: 'rgba(237,226,212,0.35)', marginTop: '8px' }}>
          © 2026 Boss Era™
        </p>
      </footer>
    </div>
  );
}

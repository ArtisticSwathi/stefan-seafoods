import { useState, useEffect } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return (
    <div id="home" style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      padding: isMobile ? '80px 20px 40px' : '0 50px',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '24px' : '50px',
      minHeight: '100vh',
      scrollSnapAlign: 'start',
      boxSizing: 'border-box',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', width: '100%' }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '4rem',
          color: '#0A2540', margin: '0 0 16px',
          lineHeight: '1.1', fontWeight: '900',
          userSelect: 'none', textAlign: isMobile ? 'center' : 'left'
        }}>
          Premium Quality<br/>Straight from the Ocean.
        </h1>
        <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: '#3A506B', marginBottom: '28px', textAlign: isMobile ? 'center' : 'left' }}>
          Fresh catch delivered directly to your doorstep.
        </p>
        <button style={{ padding: '14px 30px', backgroundColor: '#FFB300', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}>
          Order Now 🛒
        </button>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px', aspectRatio: '16/9', borderRadius: '20px', border: '6px solid white', overflow: 'hidden' }}>
          <iframe width="100%" height="100%"
            src="https://www.youtube.com/embed/ycV_w0O36PQ?autoplay=1&mute=1"
            frameBorder="0" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

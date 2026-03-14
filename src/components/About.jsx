import { useState, useEffect } from 'react';

export default function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const statCard = {
    backgroundColor: 'white', padding: '24px', borderRadius: '20px',
    textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', color: '#0A2540',
    backgroundSize: 'cover', backgroundPosition: 'center',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '140px'
  };

  return (
    <div id="about" style={{
      minHeight: '100vh', scrollSnapAlign: 'start',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      padding: isMobile ? '80px 20px 40px' : '0 50px',
      boxSizing: 'border-box',
      gap: isMobile ? '28px' : '60px',
      justifyContent: 'center',
    }}>
      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start' }}>
        <h2 style={{ fontSize: isMobile ? '2rem' : '3.5rem', color: '#0A2540', fontWeight: '900', margin: '0 0 20px', userSelect: 'none', textAlign: isMobile ? 'center' : 'left' }}>
          Our Quality.
        </h2>
        <p style={{ fontSize: isMobile ? '0.95rem' : '1.2rem', color: '#3A506B', lineHeight: '1.6', textAlign: isMobile ? 'center' : 'left' }}>
          Based in Mimisal, we bring the ocean's best directly to you. Every catch is
          hand-selected to ensure you get the freshest seafood available. Our delivery
          speed matches our commitment to quality.
        </p>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.45)),url("/natural-about.jpg")' }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem' }}>100%</h3><p style={{ margin: 0, fontWeight: 'bold' }}>Natural</p>
        </div>
        <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.45)),url("/direct-source-about.jpg")' }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Direct</h3><p style={{ margin: 0, fontWeight: 'bold' }}>Source</p>
        </div>
        <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.45)),url("/DailyFresh-about.jpg")' }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Daily</h3><p style={{ margin: 0, fontWeight: 'bold' }}>Fresh</p>
        </div>
        <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0)),url("/safePacked-about.jpg")' }}>
          <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Safe</h3><p style={{ margin: 0, fontWeight: 'bold' }}>Packaged</p>
        </div>
      </div>
    </div>
  );
}

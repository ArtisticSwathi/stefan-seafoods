// src/components/Hero.jsx
export default function Hero() {
  return (
    <div id="home" style={{ 
      display: 'flex', padding: '0 50px', alignItems: 'center', 
      gap: '50px', height: '100vh', scrollSnapAlign: 'start', boxSizing: 'border-box' 
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ 
          fontSize: '4rem', color: '#0A2540', margin: '0 0 20px 0', 
          lineHeight: '1.1', fontWeight: '900', userSelect: 'none' 
        }}>
          Premium Quality<br/>Straight from the Ocean.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#3A506B', marginBottom: '30px' }}>
          Fresh catch delivered directly to your doorstep.
        </p>
        <button style={{ 
          padding: '15px 30px', backgroundColor: '#FFB300', border: 'none', 
          borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' 
        }}>
          Order Now 🛒
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          width: '100%', maxWidth: '600px', aspectRatio: '16/9', 
          borderRadius: '20px', border: '6px solid white', overflow: 'hidden' 
        }}>
          <iframe 
            width="100%" height="100%" 
            src="https://www.youtube.com/embed/ycV_w0O36PQ?autoplay=1&mute=1" 
            frameBorder="0" allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
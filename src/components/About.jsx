// src/components/About.jsx
const statCard = {
  backgroundColor: 'white', padding: '30px', borderRadius: '20px', 
  textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', color: '#0A2540', 
  backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', 
  overflow: 'hidden', display: 'flex', flexDirection: 'column', 
  justifyContent: 'center', minHeight: '160px'
};

export default function About() {
  return (
    <div id="about" style={{ 
  height: '100vh', 
  scrollSnapAlign: 'start', 
  display: 'flex',
  alignItems: 'center',
  padding: '0 50px',
  boxSizing: 'border-box',
  gap: '60px'
}}>
  <div style={{ flex: 1 }}>
      <h2 style={{ 
        fontSize: '3.5rem', 
        color: '#0A2540', 
        fontWeight: '900', 
        margin: '0 0 20px 0',
        userSelect: 'none' // ADD THIS LINE
      }}>
        Our Quality.
      </h2>
    <p style={{ fontSize: '1.2rem', color: '#3A506B', lineHeight: '1.6' }}>
      Based in Mimisal, we bring the ocean's best directly to you. Every catch is 
      hand-selected to ensure you get the freshest seafood available. Our delivery 
      speed matches our commitment to quality.
    </p>
  </div>
  
<div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
  {/* CARD 1: NATURAL */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45)), url("/natural-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>100%</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Natural</p>
  </div>

  {/* CARD 2: SOURCE */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45)), url("/direct-source-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>Direct</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Source</p>
  </div>

  {/* CARD 3: FRESH */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45)), url("/DailyFresh-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>Daily</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Fresh</p>
  </div>

  {/* CARD 4: PACKAGED */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255, 255, 255, 0)), url("/safePacked-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>Safe</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Packaged</p>
  </div>
</div>
</div>



  );
}
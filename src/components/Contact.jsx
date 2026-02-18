// src/components/Contact.jsx

const contactDetailStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  color: '#0e253d',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.7)', 
  padding: '12px 25px',
  borderRadius: '12px',
  width: 'fit-content', // This makes each box only as wide as the text
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
};

export default function Contact() {
  return (
    <div id="contact" style={{ 
      minHeight: '100vh', 
      scrollSnapAlign: 'start', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 40px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/contact-fish.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 40px', // Shorter padding for a "thinner" box
        borderRadius: '50px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        textAlign: 'center',
        maxWidth: '1350px', // Extra wide to match the second image
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centers everything inside
        gap: '20px' // Closer spacing between items
      }}>
        
        <h2 style={{ color: '#ffffff', fontSize: '4rem', margin: 0, fontWeight: '900' }}>
          Get in Touch.
        </h2>
        
        <p style={{ color: '#ffffff', fontSize: '1.4rem', maxWidth: '700px', fontWeight: '500', margin: '0 0 10px 0' }}>
          Ready for the freshest catch in Karur? Reach out to us directly or visit our dock.
        </p>
        
        {/* Container for Centered Details */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '15px', 
          width: '100%' 
        }}>
          <div style={contactDetailStyle}><span>📍</span> Mimisal, Tamil Nadu</div>
          <div style={contactDetailStyle}><span>📞</span> +91 93636 22272</div>
          <div style={contactDetailStyle}><span>✉️</span> fresh@stefanseafoods.com</div>
        </div>

      </div>
    </div>
  );
}
// src/components/Contact.jsx

// --- 1. THE STYLES (Moved from App.jsx) ---
const inputStyle = {
  padding: '15px',
  borderRadius: '12px',
  border: 'none', 
  backgroundColor: 'rgba(255, 255, 255, 0.5)',    
  color: '#0A2540',            
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box'
};

const contactDetailStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  color: '#0e253d',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  padding: '10px 20px',
  borderRadius: '12px',
  width: 'fit-content'
};

// --- 2. THE COMPONENT ---
// We pass the names and phone numbers as "props" so it can talk to App.jsx
export default function Contact({ 
  userName, setUserName, 
  userPhone, setUserPhone, 
  userAddress, setUserAddress, 
  handleOrder 
}) {
  return (
    <div id="contact" style={{ 
      minHeight: '100vh', 
      scrollSnapAlign: 'start', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 50px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(93, 163, 186, 0.17), rgba(20, 178, 231, 0)), url("/contact-fish.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px', 
        borderRadius: '40px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        display: 'flex',
        gap: '60px',
        maxWidth: '1100px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        
        {/* LEFT SIDE: INFO */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#ffffff', fontSize: '2.8rem', marginBottom: '20px', fontWeight: '900', userSelect: 'none' }}>Get in Touch.</h2>
          <p style={{ color: '#ffffff', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '35px', fontWeight: '500' }}>
            Ready for the freshest catch in Karur? Send us a message or visit our dock.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={contactDetailStyle}><span>📍</span> Mimisal, Tamil Nadu</div>
            <div style={contactDetailStyle}><span>📞</span> +91 93636 22272</div>
            <div style={contactDetailStyle}><span>✉️</span> fresh@stefanseafoods.com</div>
          </div>
        </div>

        {/* RIGHT SIDE: CHECKOUT FORM */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', zIndex: 100 }}>
          <h3 style={{ color: 'white', marginBottom: '5px' }}>Delivery Details</h3>
          
          <input type="text" placeholder="Full Name" style={inputStyle} value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="text" placeholder="WhatsApp Number" style={inputStyle} value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
          <textarea placeholder="Exact Delivery Address in Mimisal" rows="3" style={inputStyle} value={userAddress} onChange={(e) => setUserAddress(e.target.value)}></textarea>

          <button 
            onClick={handleOrder} 
            style={{ 
              padding: '18px',
              backgroundColor: '#FFB300', 
              color: '#0A2540', 
              border: 'none', 
              borderRadius: '15px', 
              fontSize: '1.1rem',
              fontWeight: '900', 
              cursor: 'pointer'
            }}
          >
            Confirm Order via WhatsApp 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
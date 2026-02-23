import React from 'react';

export default function Checkout({ 
  cart, setCart, onBack, 
  userName, setUserName, 
  userPhone, setUserPhone, 
  userAddress, setUserAddress, 
  handleOrder 
}) {
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const removeItem = (idToRemove) => {
    setCart(cart.filter(item => item.id !== idToRemove));
  };

  return (
    // FULL-SCREEN BLURRED OVERLAY (Guarantees perfect centering!)
    <div style={{ 
      position: 'fixed', 
      top: 0, left: 0, 
      width: '100vw', height: '100vh', 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      backgroundColor: 'rgba(255, 255, 255, 0.3)', 
      backdropFilter: 'blur(8px)', // Modern glass effect
      zIndex: 200, 
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* WHITE CART BOX */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '20px', 
        width: '100%', 
        maxWidth: '500px', 
        maxHeight: '90vh', // Prevents it from getting taller than the screen
        overflowY: 'auto', // Adds scrollbar inside the box if it gets too long
        boxShadow: '0 15px 50px rgba(0,0,0,0.15)' 
      }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
          <h2 style={{ color: '#0A2540', margin: 0, fontSize: '1.8rem' }}>Your Cart</h2>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#1ca3de', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            &larr; Back
          </button>
        </div>

        {/* CART LIST */}
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '15px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem', padding: '30px 0' }}>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '8px', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div>
                    <h4 style={{ margin: 0, color: '#0A2540', fontSize: '1.1rem' }}>{item.name}</h4>
                    <p style={{ margin: '3px 0 0 0', color: '#666', fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ff7675', cursor: 'pointer', padding: 0, fontSize: '0.8rem', marginTop: '5px' }}>Remove</button>
                  </div>
                </div>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#1ca3de', fontSize: '1.1rem' }}>₹{item.price * item.quantity}</p>
              </div>
            ))
          )}
        </div>

        {/* DELIVERY FORM & WHATSAPP BUTTON */}
        {cart.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '900', color: '#0A2540', borderTop: '2px solid #eee', paddingTop: '15px', marginBottom: '15px' }}>
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            {/* DELIVERY INPUTS */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#0A2540' }}>Delivery Details</h3>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                style={inputStyle} 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={userPhone} 
                onChange={(e) => setUserPhone(e.target.value)} 
                style={inputStyle} 
              />
              <textarea 
                placeholder="Full Delivery Address" 
                value={userAddress} 
                onChange={(e) => setUserAddress(e.target.value)} 
                style={{ ...inputStyle, height: '60px', resize: 'none' }} 
              />
            </div>

            {/* CONFIRM ORDER BUTTON */}
            <button 
              onClick={handleOrder} 
              style={{ width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.1s ease' }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Confirm via WhatsApp
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// Simple styling object to keep the inputs looking clean and consistent
const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: '8px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '0.95rem',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  outline: 'none'
};
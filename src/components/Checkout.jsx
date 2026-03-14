import React from 'react';

export default function Checkout({
  cart, setCart, onBack,
  userName, setUserName,
  userPhone, setUserPhone,
  userAddress, setUserAddress,
  handleOrder
}) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const removeItem = (idToRemove) => setCart(cart.filter(item => item.id !== idToRemove));

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.3)',
      backdropFilter: 'blur(8px)', zIndex: 200,
      padding: '16px', boxSizing: 'border-box',
    }}>
      <div style={{
        backgroundColor: 'white', padding: '28px',
        borderRadius: '20px', width: '100%', maxWidth: '480px',
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 15px 50px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '14px', marginBottom: '14px' }}>
          <h2 style={{ color: '#0A2540', margin: 0, fontSize: '1.6rem' }}>Your Cart</h2>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#1ca3de', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}>
            ← Back
          </button>
        </div>

        {/* Cart items */}
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '14px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '30px 0' }}>Your cart is empty.</p>
          ) : cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#f0f0f0', backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                <div>
                  <h4 style={{ margin: 0, color: '#0A2540', fontSize: '0.95rem' }}>{item.name}</h4>
                  <p style={{ margin: '2px 0 0', color: '#888', fontSize: '0.82rem' }}>Qty: {item.quantity}</p>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ff5252', cursor: 'pointer', padding: 0, fontSize: '0.78rem', marginTop: '4px' }}>Remove</button>
                </div>
              </div>
              <p style={{ margin: 0, fontWeight: '700', color: '#1ca3de' }}>₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900', color: '#0A2540', borderTop: '2px solid #eee', paddingTop: '14px', marginBottom: '14px' }}>
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            {/* Delivery form */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '14px', borderRadius: '12px', marginBottom: '18px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '1rem', color: '#0A2540' }}>Delivery Details</h3>
              <input type="text" placeholder="Full Name" value={userName} onChange={e => setUserName(e.target.value)} style={inputStyle} />
              <input type="tel"  placeholder="Phone Number" value={userPhone} onChange={e => setUserPhone(e.target.value)} style={inputStyle} />
              <textarea placeholder="Full Delivery Address" value={userAddress} onChange={e => setUserAddress(e.target.value)} style={{ ...inputStyle, height: '64px', resize: 'none' }} />
            </div>

            <button onClick={handleOrder}
              style={{ width: '100%', backgroundColor: '#25D366', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Confirm via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 12px', marginBottom: '8px',
  borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.9rem',
  boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none',
  display: 'block',
};

import React from 'react';

export default function Checkout({ onBack }) {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      // Your exact main page gradient:
      background: 'linear-gradient(135deg, #1ca3de 0%, #7ed0f5 70%, #ffffff 98%)', 
      zIndex: 500, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      paddingTop: '80px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#0A2540' }}>Checkout Page</h2>
        <p>This page is now ready for your content.</p>
        <button 
          onClick={onBack} 
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#1ca3de', color: 'white', border: 'none', borderRadius: '10px' }}
        >
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}
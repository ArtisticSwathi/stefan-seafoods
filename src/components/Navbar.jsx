import React from 'react';

export default function Navbar({ setView }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', padding: '20px 50px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 100, boxSizing: 'border-box', backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }}>
      <a href="#home" onClick={() => setView('main')} style={{ textDecoration: 'none' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#0A2540' }}>Stefan Sea Foods.</h1>
      </a>
      
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <a href="#home" onClick={() => setView('main')} style={{ textDecoration: 'none', color: '#333', fontWeight: '500', cursor: 'pointer' }}>Home</a>
        <a href="#about" onClick={() => setView('main')} style={{ textDecoration: 'none', color: '#333', fontWeight: '500', cursor: 'pointer' }}>About</a>
        <a href="#shop" onClick={() => setView('main')} style={{ textDecoration: 'none', color: '#333', fontWeight: '500', cursor: 'pointer' }}>Shop</a>
        <a href="#contact" onClick={() => setView('main')} style={{ textDecoration: 'none', color: '#333', fontWeight: '500', cursor: 'pointer' }}>Contact Us</a>
        
        <button onClick={() => setView('checkout')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#1ca3de', fontWeight: 'bold', fontSize: '1rem', padding: 0 }}>
          🛒 Cart
        </button>
      </div>
    </nav>
  );
}
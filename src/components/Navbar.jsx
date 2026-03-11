import React, { useState } from 'react';

export default function Navbar({ setView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        padding: '18px 50px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 100, boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(10,37,64,0.08)',
        boxShadow: '0 2px 12px rgba(10,37,64,0.07)',
      }}>
        <a href="#home" onClick={() => { setView('main'); close(); }}
          style={{ textDecoration: 'none', margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#0A2540' }}>
          Stefan Sea Foods.
        </a>

        {/* Desktop links — always right-aligned, never centered */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}
          className="nav-links-desktop">
          <a href="#home"    onClick={() => { setView('main'); close(); }} style={linkStyle}>Home</a>
          <a href="#about"   onClick={() => { setView('main'); close(); }} style={linkStyle}>About</a>
          <a href="#shop"    onClick={() => { setView('main'); close(); }} style={linkStyle}>Shop</a>
          <a href="#contact" onClick={() => { setView('main'); close(); }} style={linkStyle}>Contact Us</a>
          <button onClick={() => { setView('checkout'); close(); }} style={cartStyle}>🛒 Cart</button>
        </div>

        {/* Hamburger — only visible on mobile via CSS */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ display: 'none' }} /* CSS overrides this on mobile */
        >
          <span className={menuOpen ? 'open-1' : ''} />
          <span className={menuOpen ? 'open-2' : ''} />
          <span className={menuOpen ? 'open-3' : ''} />
        </button>
      </nav>

      {/* Mobile dim overlay */}
      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={close} />

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <a href="#home"    onClick={() => { setView('main'); close(); }} style={linkStyle}>Home</a>
        <a href="#about"   onClick={() => { setView('main'); close(); }} style={linkStyle}>About</a>
        <a href="#shop"    onClick={() => { setView('main'); close(); }} style={linkStyle}>Shop</a>
        <a href="#contact" onClick={() => { setView('main'); close(); }} style={linkStyle}>Contact Us</a>
        <button onClick={() => { setView('checkout'); close(); }} style={cartStyle}>🛒 Cart</button>
      </div>
    </>
  );
}

const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: '500', cursor: 'pointer' };
const cartStyle = {
  background: 'none', border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center', gap: '5px',
  color: '#1ca3de', fontWeight: 'bold', fontSize: '1rem',
  padding: 0, fontFamily: 'inherit',
};

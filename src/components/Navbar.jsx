import React, { useState, useEffect } from 'react';

export default function Navbar({ setView, cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        height: '64px', padding: '0 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 100, boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(10,37,64,0.08)',
        boxShadow: '0 2px 12px rgba(10,37,64,0.07)',
      }}>
        {/* Logo — always one line */}
        <a href="#home" onClick={() => { setView('main'); close(); }}
          style={{ textDecoration: 'none', fontSize: isMobile ? '1.1rem' : '1.4rem', fontWeight: '800', color: '#0A2540', whiteSpace: 'nowrap' }}>
          Stefan Sea Foods.
        </a>

        {/* Desktop nav — only rendered when NOT mobile */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#home"    onClick={() => setView('main')}    style={linkStyle}>Home</a>
            <a href="#about"   onClick={() => setView('main')}    style={linkStyle}>About</a>
            <a href="#shop"    onClick={() => setView('main')}    style={linkStyle}>Shop</a>
            <a href="#contact" onClick={() => setView('main')}    style={linkStyle}>Contact Us</a>
            <button onClick={() => setView('checkout')} style={cartBtnStyle}>
              🛒 Cart {cartCount > 0 && (
                <span style={{ background:'#ff5252', color:'white', borderRadius:'50%', width:'18px', height:'18px', fontSize:'0.65rem', fontWeight:'800', display:'inline-flex', alignItems:'center', justifyContent:'center', marginLeft:'4px' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Mobile: cart icon + hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setView('checkout')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', position: 'relative', padding: '4px' }}>
              🛒
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background:'#ff5252', color:'white', borderRadius:'50%', width:'16px', height:'16px', fontSize:'0.6rem', fontWeight:'800', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {cartCount}
                </span>
              )}
            </button>
            {/* Hamburger */}
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ display: 'block', width: '24px', height: '2.5px', background: '#0A2540', borderRadius: '3px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '2.5px', background: '#0A2540', borderRadius: '3px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '24px', height: '2.5px', background: '#0A2540', borderRadius: '3px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 140, backdropFilter: 'blur(2px)' }} />
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, right: 0,
          width: '72%', maxWidth: '280px', height: '100vh',
          background: '#ffffff',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          padding: '0 32px', gap: 0,
          zIndex: 150, boxShadow: '-6px 0 30px rgba(0,0,0,0.12)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}>
          {[['#home','Home'],['#about','About'],['#shop','Shop'],['#contact','Contact Us']].map(([href, label]) => (
            <a key={href} href={href} onClick={close}
              style={{ padding: '18px 0', fontSize: '1.1rem', fontWeight: '600', width: '100%', borderBottom: '1px solid #f0f4f8', color: '#0A2540', textDecoration: 'none', display: 'block' }}>
              {label}
            </a>
          ))}
          <button onClick={() => { setView('checkout'); close(); }}
            style={{ marginTop: '20px', background: '#1ca3de', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '25px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      )}
    </>
  );
}

const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: '500', fontSize: '0.95rem', cursor: 'pointer' };
const cartBtnStyle = { background: '#e8f7fe', border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#1ca3de', fontWeight: '700', fontSize: '0.95rem', fontFamily: 'inherit' };

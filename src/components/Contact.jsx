import React from 'react';

export default function Contact() {
  return (
    <div style={{
      width: '100%', minHeight: '60vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '100px 20px', boxSizing: 'border-box', scrollSnapAlign: 'start',
    }}>
      <div style={{
        width: '100%', maxWidth: '1200px', borderRadius: '28px',
        overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '130px 40px', textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        color:'rgba(240, 229, 229, 0.71)'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/fish1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -2 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(10, 37, 64, 0.75)', zIndex: -1 }} />

        <h2 className="contact-title">Get in Touch.</h2>
        <p className="contact-sub">Ready for the freshest catch? Reach out to us directly or visit our dock.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', width: '100%' }}>
          <div className="contact-pill"><span>📍</span> Mimisal, Tamil Nadu</div>
          <a href="tel:+911234567891" className="contact-pill"><span>📞</span> +91 1234567891</a>
          <a href="mailto:fresh@stefanseafoods.com" className="contact-pill"><span>✉️</span> fresh@stefanseafoods.com</a>
        </div>
      </div>
    </div>
  );
}

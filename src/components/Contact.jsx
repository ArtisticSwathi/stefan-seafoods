import React from 'react';

export default function Contact() {
  return (
    <div style={{
      width: '100%',
      minHeight: '60vh', // Takes up a good chunk of the bottom screen
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px 20px',
      boxSizing: 'border-box',
      scrollSnapAlign: 'start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        borderRadius: '30px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        
        {/* BACKGROUND IMAGE WITH DARK OVERLAY */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/fish1.jpg)', // Using one of your fish images for the background
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(10, 37, 64, 0.75)', // Dark blue overlay so text is readable
          zIndex: -1
        }}></div>

        {/* CONTENT */}
        <h2 style={{ 
          color: 'white', 
          fontSize: '3.5rem', 
          fontWeight: '900', 
          margin: '0 0 15px 0' 
        }}>
          Get in Touch.
        </h2>
        
        <p style={{ 
          color: '#e0e0e0', 
          fontSize: '1.2rem', 
          maxWidth: '600px', 
          margin: '0 0 40px 0',
          lineHeight: '1.6'
        }}>
          Ready for the freshest catch? Reach out to us directly or visit our dock.
        </p>

        {/* CONTACT INFO PILLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          
          {/* Location */}
          <div style={pillStyle}>
            <span style={{ fontSize: '1.2rem' }}>📍</span> Mimisal, Tamil Nadu
          </div>

          {/* Phone (Clickable!) */}
          <a href="tel:+919363622272" style={{ ...pillStyle, textDecoration: 'none' }}>
            <span style={{ fontSize: '1.2rem' }}>📞</span> +91 8888555555
          </a>

          {/* Email (Clickable!) */}
          <a href="mailto:fresh@stefanseafoods.com" style={{ ...pillStyle, textDecoration: 'none' }}>
            <span style={{ fontSize: '1.2rem' }}>✉️</span> fresh@stefanseafoods.com
          </a>

        </div>
      </div>
    </div>
  );
}

// Reusable style for the white contact pills
const pillStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: '#0A2540',
  padding: '12px 30px',
  borderRadius: '30px',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  cursor: 'pointer'
};
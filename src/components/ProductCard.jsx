import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart, isMobile = false }) {
  const [qty, setQty] = useState(1);
  const isAvailable = product.inStock;

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '16px',
      padding: isMobile ? '12px' : '20px',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', position: 'relative', zIndex: 10,
      pointerEvents: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
      boxSizing: 'border-box', width: '100%',
    }}>
      <div style={{ position: 'relative', marginBottom: '10px' }}>
        <div style={{
          width: '100%', height: isMobile ? '130px' : '180px',
          backgroundImage: `url(${product.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          borderRadius: '12px', backgroundColor: '#f0f0f0',
          filter: isAvailable ? 'none' : 'grayscale(100%)',
          opacity: isAvailable ? 1 : 0.8,
        }} />
        {!isAvailable && (
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            backgroundColor: '#ff5252', color: 'white',
            padding: '3px 10px', borderRadius: '20px',
            fontSize: '0.72rem', fontWeight: '700',
          }}>Out of Stock</div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 5px', color: '#0A2540', fontSize: isMobile ? '0.82rem' : '1rem', fontWeight: '700' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 'bold', color: '#1ca3de', margin: '0 0 10px' }}>
          ₹{product.price}
        </p>
      </div>

      {!isMobile && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ color: '#888', fontSize: '0.85rem' }}>Qty:</span>
          <select value={qty} onChange={e => setQty(Number(e.target.value))} disabled={!isAvailable}
            style={{ backgroundColor: '#f5f5f5', border: '1px solid #eee', borderRadius: '6px', padding: '4px 8px', color: '#333', cursor: isAvailable ? 'pointer' : 'not-allowed', outline: 'none' }}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      )}

      <button
        onClick={() => { onAddToCart(product, qty); setQty(1); }}
        disabled={!isAvailable}
        style={{
          backgroundColor: isAvailable ? '#ffb703' : '#d1d5db',
          color: isAvailable ? '#0A2540' : '#6b7280',
          border: 'none', padding: isMobile ? '9px' : '12px',
          borderRadius: '8px', fontWeight: '800',
          cursor: isAvailable ? 'pointer' : 'not-allowed',
          width: '100%', fontFamily: 'inherit',
          fontSize: isMobile ? '0.8rem' : '0.95rem',
        }}
        onMouseDown={e => isAvailable && (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => isAvailable && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isAvailable ? 'Add to Cart' : 'Unavailable'}
      </button>
    </div>
  );
}

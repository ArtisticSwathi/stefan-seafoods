import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart, isMobile = false }) {
  const [qty, setQty] = useState(1);
  const [pressed, setPressed] = useState(false);
  const [added, setAdded] = useState(false);
  const isAvailable = product.inStock;

  const handleAdd = () => {
    if (!isAvailable) return;
    // Click animation
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    // "Added!" feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    onAddToCart(product, qty);
    setQty(1);
  };

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '16px',
      padding: isMobile ? '12px' : '20px',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
      boxSizing: 'border-box', width: '100%',
    }}>
      {/* Image */}
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

      {/* Name & Price */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 4px', color: '#0A2540', fontSize: isMobile ? '0.82rem' : '1rem', fontWeight: '700' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', fontWeight: '800', color: '#1ca3de', margin: '0 0 10px' }}>
          ₹{product.price}
        </p>
      </div>

      {/* Qty */}
      {isAvailable && (
        isMobile ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '10px', borderRadius: '8px', overflow: 'hidden',
            border: '1.5px solid #ddd', height: '38px',
          }}>
            <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: '42px', height: '38px', border: 'none', background: '#f0f0f0', color: '#0A2540', fontSize: '1.4rem', fontWeight: '700', cursor: 'pointer', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ flex: 1, textAlign: 'center', fontWeight: '800', fontSize: '1rem', color: '#0A2540', borderLeft: '1.5px solid #ddd', borderRight: '1.5px solid #ddd', lineHeight: '38px' }}>{qty}</span>
            <button type="button" onClick={() => setQty(q => Math.min(10, q + 1))}
              style={{ width: '42px', height: '38px', border: 'none', background: '#f0f0f0', color: '#0A2540', fontSize: '1.4rem', fontWeight: '700', cursor: 'pointer', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Qty:</span>
            <select value={qty} onChange={e => setQty(Number(e.target.value))}
              style={{ backgroundColor: '#f5f5f5', border: '1px solid #eee', borderRadius: '6px', padding: '4px 8px', color: '#333', cursor: 'pointer', outline: 'none' }}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        )
      )}

      {/* Add to Cart button with press + added feedback */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!isAvailable}
        style={{
          backgroundColor: added ? '#0d9e6e' : isAvailable ? '#ffb703' : '#d1d5db',
          color: added ? 'white' : isAvailable ? '#0A2540' : '#6b7280',
          border: 'none',
          padding: isMobile ? '10px' : '12px',
          borderRadius: '8px', fontWeight: '800',
          cursor: isAvailable ? 'pointer' : 'not-allowed',
          width: '100%', fontFamily: 'inherit',
          fontSize: isMobile ? '0.85rem' : '0.95rem',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          transform: pressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s ease, background-color 0.2s ease',
        }}
      >
        {added ? '✓ Added!' : isAvailable ? 'Add to Cart' : 'Unavailable'}
      </button>
    </div>
  );
}

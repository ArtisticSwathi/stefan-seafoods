import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);

  // ✅ Use product.inStock (from your database) instead of product.stock
  const isAvailable = product.inStock;

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '20px', padding: '20px',
      width: '250px', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', position: 'relative', zIndex: 10,
      pointerEvents: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      boxSizing: 'border-box'
    }}>
      <div style={{ position: 'relative', marginBottom: '15px' }}>
        <div style={{
          width: '100%', height: '180px',
          backgroundImage: `url(${product.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          borderRadius: '15px', backgroundColor: '#f0f0f0',
          filter: isAvailable ? 'none' : 'grayscale(100%)',
          opacity: isAvailable ? 1 : 0.8
        }} />

        {!isAvailable && (
          <div style={{
            position: 'absolute', top: '10px', left: '10px',
            backgroundColor: '#ff7675', color: 'white',
            padding: '5px 12px', borderRadius: '20px',
            fontSize: '0.8rem', fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            Out of Stock
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0A2540', fontSize: '1.1rem' }}>{product.name}</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1ca3de', margin: '0 0 15px 0' }}>
          ₹{product.price}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>Qty:</span>
        <select
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          disabled={!isAvailable}
          style={{
            backgroundColor: '#f5f5f5', border: '1px solid #eee',
            borderRadius: '6px', padding: '4px 10px', color: '#333',
            cursor: isAvailable ? 'pointer' : 'not-allowed', outline: 'none'
          }}
        >
          {[1,2,3,4,5,6,7,8,9,10].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => { onAddToCart(product, qty); setQty(1); }}
        disabled={!isAvailable}
        style={{
          backgroundColor: isAvailable ? '#ffb703' : '#d1d5db',
          color: isAvailable ? '#0A2540' : '#6b7280',
          border: 'none', padding: '12px', borderRadius: '8px',
          fontWeight: 'bold', cursor: isAvailable ? 'pointer' : 'not-allowed',
          width: '100%', transition: 'transform 0.1s ease', fontFamily: 'inherit'
        }}
        onMouseDown={(e) => isAvailable && (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={(e) => isAvailable && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isAvailable ? 'Add to Cart' : 'Unavailable'}
      </button>
    </div>
  );
}
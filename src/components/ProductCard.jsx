import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px', 
      padding: '20px',
      width: '250px', // Strict width helps Flexbox align them perfectly
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 10, 
      pointerEvents: 'auto',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      boxSizing: 'border-box'
    }}>
      
      {/* Product Image Container */}
      <div style={{ position: 'relative', marginBottom: '15px' }}>
        <div style={{
          width: '100%',
          height: '180px', 
          backgroundImage: `url(${product.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '15px',
          backgroundColor: '#f0f0f0',
          // THIS IS THE MAGIC LINE FOR THE GREYSCALE IMAGE!
          filter: product.stock ? 'none' : 'grayscale(100%)',
          opacity: product.stock ? 1 : 0.8
        }}></div>

        {/* OUT OF STOCK BADGE */}
        {!product.stock && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#ff7675', // Soft coral red from your mockup
            color: 'white',
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Details */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0A2540', fontSize: '1.1rem' }}>{product.name}</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1ca3de', margin: '0 0 15px 0' }}>
          ₹{product.price}
        </p>
      </div>

      {/* QUANTITY SELECTOR */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>Qty:</span>
        <select 
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          disabled={!product.stock}
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #eee',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#333',
            cursor: product.stock ? 'pointer' : 'not-allowed',
            outline: 'none'
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* ADD TO CART BUTTON (Back to rounded rectangle!) */}
      <button
        onClick={() => {
          onAddToCart(product, qty);
          setQty(1); 
        }}
        disabled={!product.stock}
        style={{
          backgroundColor: product.stock ? '#ffb703' : '#d1d5db',
          color: product.stock ? '#0A2540' : '#6b7280',
          border: 'none',
          padding: '12px',
          borderRadius: '8px', 
          fontWeight: 'bold',
          cursor: product.stock ? 'pointer' : 'not-allowed',
          width: '100%',
          transition: 'transform 0.1s ease'
        }}
        onMouseDown={(e) => product.stock && (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={(e) => product.stock && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {product.stock ? 'Add to Cart' : 'Unavailable'}
      </button>

    </div>
  );
}
// src/components/ProductCard.jsx

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{ 
      width: '280px', 
      backgroundColor: 'white', 
      borderRadius: '25px', 
      overflow: 'hidden', 
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
      textAlign: 'center',
      paddingBottom: '20px',
      marginBottom: '20px',
      position: 'relative', 
      opacity: product.stock ? 1 : 0.8 
    }}>
      
      {/* 1. OUT OF STOCK BADGE */}
      {!product.stock && (
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          padding: '5px 12px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          zIndex: 2
        }}>
          Out of Stock
        </div>
      )}

      {/* 2. PRODUCT IMAGE (GRAYSCALE IF OUT OF STOCK) */}
      <img src={product.img} alt={product.name} style={{ 
        width: '100%', 
        height: '200px', 
        objectFit: 'cover',
        filter: product.stock ? 'none' : 'grayscale(100%)' 
      }} />
      
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ margin: '15px 0 5px 0', color: '#0A2540' }}>{product.name}</h3>
        
        <p style={{ fontWeight: 'bold', color: '#1ca3de', fontSize: '1.3rem', margin: '10px 0' }}>
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {/* 3. QUANTITY SELECTOR */}
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.9rem', color: '#555' }}>Qty:</span>
          <select 
            disabled={!product.stock}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: product.stock ? '#f0f2f2' : '#e0e0e0',
              cursor: product.stock ? 'pointer' : 'not-allowed'
            }}
          >
            {[...Array(10).keys()].map(i => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
        </div>

        {/* 4. ACTION BUTTON */}
        <button 
          disabled={!product.stock}
          onClick={() => onAddToCart(product)} 
          style={{ 
            width: '100%',
            padding: '12px', 
            backgroundColor: product.stock ? '#FFB300' : '#cccccc', 
            borderRadius: '20px', 
            border: 'none',
            fontWeight: 'bold', 
            cursor: product.stock ? 'pointer' : 'not-allowed',
            color: '#0A2540'
          }}
        >
          {product.stock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}
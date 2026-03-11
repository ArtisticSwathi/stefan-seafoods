import { useState } from 'react';
import AdminLogin from './AdminLogin';

const AdminPanel = ({ products, onToggleStock }) => {
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [editingId, setEditingId]       = useState(null);   // which product is being edited
  const [editPrice, setEditPrice]       = useState('');
  const [editImg, setEditImg]           = useState('');
  const [saving, setSaving]             = useState(false);

  // ── Save price + image to backend ──────────────────────────
  const saveEdit = async (id) => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/details`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(editPrice),
          img: editImg,
        }),
      });

      if (response.ok) {
        alert('✅ Product updated!');
        setEditingId(null);
        // Reload page so shop reflects new price/image
        window.location.reload();
      } else {
        alert('❌ Failed to update. Check your backend route.');
      }
    } catch (err) {
      alert('❌ Network error: ' + err.message);
    }
    setSaving(false);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditPrice(product.price);
    setEditImg(product.img);
  };

  // ── Show login wall if not logged in ───────────────────────
  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // ── Admin Panel UI ──────────────────────────────────────────
  return (
    <div style={{
      padding: '20px', maxWidth: '850px',
      margin: '120px auto 40px',
      backgroundColor: 'white', color: 'black',
      borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <h2 style={{ margin: 0 }}>Secret Admin Dashboard 🤫</h2>
        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: '8px 16px', background: '#e53935', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontWeight: 'bold', fontFamily: 'inherit',
          }}
        >
          Logout
        </button>
      </div>
      <p style={{ marginBottom: '20px', color: '#666' }}>Manage inventory, prices and images.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ddd', borderRadius: '10px',
              backgroundColor: product.inStock ? '#e8f5e9' : '#ffebee',
              overflow: 'hidden',
            }}
          >
            {/* ── Main row ── */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '14px 16px',
              flexWrap: 'wrap', gap: '10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                  onError={e => e.currentTarget.style.display = 'none'}
                />
                <div>
                  <h3 style={{ margin: '0 0 3px', color: '#333' }}>{product.name}</h3>
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1ca3de' }}>
                    ₹{product.price}
                  </span>
                  <span style={{
                    marginLeft: '10px', fontSize: '0.8rem', fontWeight: 'bold',
                    color: product.inStock ? '#2e7d32' : '#c62828',
                  }}>
                    {product.inStock ? '✅ IN STOCK' : '❌ OUT OF STOCK'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {/* Toggle stock */}
                <button
                  onClick={() => onToggleStock(product._id)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: product.inStock ? '#f44336' : '#4caf50',
                    color: 'white', border: 'none', borderRadius: '6px',
                    cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit',
                    fontSize: '0.85rem',
                  }}
                >
                  {product.inStock ? '🔴 Out of Stock' : '🟢 In Stock'}
                </button>

                {/* Edit price/image */}
                <button
                  onClick={() => editingId === product._id ? setEditingId(null) : startEdit(product)}
                  style={{
                    padding: '8px 14px', backgroundColor: '#1565c0',
                    color: 'white', border: 'none', borderRadius: '6px',
                    cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit',
                    fontSize: '0.85rem',
                  }}
                >
                  ✏️ Edit
                </button>
              </div>
            </div>

            {/* ── Edit drawer (only shows when this product is being edited) ── */}
            {editingId === product._id && (
              <div style={{
                padding: '16px', borderTop: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <div>
                  <label style={labelStyle}>💰 Price (₹)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. 1800"
                  />
                </div>
                <div>
                  <label style={labelStyle}>🖼️ Image path or URL</label>
                  <input
                    type="text"
                    value={editImg}
                    onChange={e => setEditImg(e.target.value)}
                    style={inputStyle}
                    placeholder="e.g. /fish1.jpg or https://..."
                  />
                  {editImg && (
                    <img
                      src={editImg}
                      alt="preview"
                      style={{ marginTop: '8px', width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                      onError={e => e.currentTarget.style.display = 'none'}
                    />
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => saveEdit(product._id)}
                    disabled={saving}
                    style={{
                      padding: '10px 20px', background: '#0A2540', color: 'white',
                      border: 'none', borderRadius: '8px', cursor: 'pointer',
                      fontWeight: 'bold', fontFamily: 'inherit',
                    }}
                  >
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      padding: '10px 20px', background: '#888', color: 'white',
                      border: 'none', borderRadius: '8px', cursor: 'pointer',
                      fontWeight: 'bold', fontFamily: 'inherit',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;

const inputStyle = {
  width: '100%', padding: '10px 12px',
  border: '1.5px solid #ddd', borderRadius: '8px',
  fontSize: '0.95rem', fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
};

const labelStyle = {
  display: 'block', marginBottom: '6px',
  fontWeight: '700', fontSize: '0.85rem', color: '#444',
};

import { useState } from 'react';
import AdminLogin from './AdminLogin';

const THEME = {
  navy:    '#0A2540',
  ocean:   '#1ca3de',
  bg:      '#f0f6fb',
  white:   '#ffffff',
  border:  '#daeaf5',
  muted:   '#6b8fa8',
  green:   '#0d9e6e',
  greenBg: '#e6f7f2',
  red:     '#d93025',
  redBg:   '#fdecea',
};

// Same grid columns used for BOTH header and rows — guarantees alignment
const GRID = '56px minmax(120px,1fr) 90px 100px 110px minmax(200px,auto)';

const AdminPanel = ({ products, onToggleStock }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [editPrice, setEditPrice]   = useState('');
  const [editImg, setEditImg]       = useState('');
  const [saving, setSaving]         = useState(false);

  const saveEdit = async (id) => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}/details`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: Number(editPrice), img: editImg }),
      });
      if (res.ok) { setEditingId(null); window.location.reload(); }
      else alert('Failed to update. Check backend.');
    } catch (err) { alert('Network error: ' + err.message); }
    setSaving(false);
  };

  if (!isLoggedIn) return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;

  const inStockCount  = products.filter(p => p.inStock).length;
  const outStockCount = products.filter(p => !p.inStock).length;

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: '"Segoe UI", system-ui, sans-serif' }}>

      {/* ── Fixed Top Bar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
        background: THEME.navy,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', zIndex: 200,
        boxShadow: '0 2px 12px rgba(10,37,64,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #1ca3de, #7ed0f5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '1rem', lineHeight: 1.2 }}>Stefan Sea Foods</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Dashboard</div>
          </div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={{
          padding: '8px 20px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.85)', borderRadius: '8px',
          cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit',
        }}>Sign Out</button>
      </div>

      {/* ── Page Content ── */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '88px 28px 60px' }}>

        {/* Page Title */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '1.6rem', fontWeight: '800', color: THEME.navy, letterSpacing: '-0.4px' }}>
            Inventory Management
          </h1>
          <p style={{ margin: 0, color: THEME.muted, fontSize: '0.9rem' }}>
            Manage stock status, pricing and product images.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { label: 'Total Products', value: products.length,  color: THEME.ocean, border: THEME.border },
            { label: 'In Stock',       value: inStockCount,     color: THEME.green, border: '#b6e9d8' },
            { label: 'Out of Stock',   value: outStockCount,    color: THEME.red,   border: '#f5c6c3' },
          ].map(s => (
            <div key={s.label} style={{
              flex: '1', minWidth: '130px', background: THEME.white,
              border: `1.5px solid ${s.border}`, borderRadius: '14px',
              padding: '18px 22px', boxShadow: '0 2px 8px rgba(10,37,64,0.05)',
            }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: THEME.muted, marginTop: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div style={{ background: THEME.white, borderRadius: '16px', border: `1.5px solid ${THEME.border}`, overflow: 'hidden', boxShadow: '0 2px 12px rgba(10,37,64,0.06)' }}>

          {/* Table Header — uses SAME grid as rows */}
          <div style={{
            display: 'grid', gridTemplateColumns: GRID,
            gap: '0 12px', padding: '12px 20px',
            background: '#f7fafd',
            borderBottom: `1.5px solid ${THEME.border}`,
          }}>
            {['', 'Product Name', 'Price', 'Category', 'Status', 'Actions'].map(h => (
              <div key={h} style={{
                fontSize: '0.7rem', fontWeight: '700',
                color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>{h}</div>
            ))}
          </div>

          {/* Product Rows */}
          {products.map((product, i) => (
            <div key={product._id} style={{
              borderBottom: i < products.length - 1 ? `1px solid ${THEME.border}` : 'none',
            }}>
              {/* Data Row — uses SAME GRID as header */}
              <div style={{
                display: 'grid', gridTemplateColumns: GRID,
                gap: '0 12px', alignItems: 'center',
                padding: '14px 20px',
                background: product.inStock ? THEME.white : '#fffafa',
              }}>
                {/* Image */}
                <img src={product.img} alt={product.name}
                  style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: `1.5px solid ${THEME.border}` }}
                  onError={e => { e.currentTarget.style.background = '#eee'; e.currentTarget.src = ''; }}
                />

                {/* Product Name */}
                <div style={{ fontWeight: '700', color: THEME.navy, fontSize: '0.93rem' }}>
                  {product.name}
                </div>

                {/* Price */}
                <div style={{ fontWeight: '800', color: THEME.ocean, fontSize: '0.93rem' }}>
                  ₹{product.price}
                </div>

                {/* Category */}
                <div>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '0.74rem',
                    fontWeight: '700', background: '#e8f4fb', color: THEME.ocean, textTransform: 'capitalize',
                  }}>
                    {product.category}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700',
                    background: product.inStock ? THEME.greenBg : THEME.redBg,
                    color: product.inStock ? THEME.green : THEME.red,
                  }}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onToggleStock(product._id)}
                    style={{
                      padding: '7px 14px',
                      background: product.inStock ? THEME.redBg : THEME.greenBg,
                      color: product.inStock ? THEME.red : THEME.green,
                      border: `1.5px solid ${product.inStock ? '#f5c6c3' : '#b6e9d8'}`,
                      borderRadius: '7px', cursor: 'pointer',
                      fontWeight: '700', fontSize: '0.78rem', fontFamily: 'inherit', whiteSpace: 'nowrap',
                    }}
                  >
                    {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                  </button>

                  <button
                    onClick={() => {
                      if (editingId === product._id) setEditingId(null);
                      else { setEditingId(product._id); setEditPrice(product.price); setEditImg(product.img); }
                    }}
                    style={{
                      padding: '7px 18px',
                      background: editingId === product._id ? THEME.navy : THEME.white,
                      color: editingId === product._id ? 'white' : THEME.navy,
                      border: `1.5px solid ${editingId === product._id ? THEME.navy : '#c8dde9'}`,
                      borderRadius: '7px', cursor: 'pointer',
                      fontWeight: '700', fontSize: '0.78rem', fontFamily: 'inherit',
                    }}
                  >
                    {editingId === product._id ? 'Close' : 'Edit'}
                  </button>
                </div>
              </div>

              {/* Edit Drawer */}
              {editingId === product._id && (
                <div style={{ padding: '20px 24px', borderTop: `1.5px solid ${THEME.border}`, background: '#f7fafd' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', color: THEME.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '14px' }}>
                    Edit Product Details
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ minWidth: '140px' }}>
                      <label style={labelStyle}>Price (₹)</label>
                      <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} style={inputStyle} placeholder="1800" />
                    </div>
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <label style={labelStyle}>Image Path or URL</label>
                      <input type="text" value={editImg} onChange={e => setEditImg(e.target.value)} style={inputStyle} placeholder="/fish1.jpg or https://..." />
                    </div>
                    {editImg && (
                      <img src={editImg} alt="preview"
                        style={{ width: '54px', height: '54px', borderRadius: '10px', objectFit: 'cover', border: `1.5px solid ${THEME.border}` }}
                        onError={e => e.currentTarget.style.display = 'none'}
                      />
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <button onClick={() => saveEdit(product._id)} disabled={saving} style={{
                      padding: '10px 28px', background: THEME.navy, color: 'white',
                      border: 'none', borderRadius: '8px', cursor: 'pointer',
                      fontWeight: '700', fontSize: '0.88rem', fontFamily: 'inherit',
                    }}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => setEditingId(null)} style={{
                      padding: '10px 20px', background: THEME.white, color: THEME.muted,
                      border: `1.5px solid ${THEME.border}`, borderRadius: '8px',
                      cursor: 'pointer', fontWeight: '600', fontFamily: 'inherit',
                    }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

const inputStyle = {
  width: '100%', padding: '10px 14px',
  border: '1.5px solid #daeaf5', borderRadius: '8px',
  fontSize: '0.92rem', fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
  background: 'white', color: '#0A2540',
};

const labelStyle = {
  display: 'block', marginBottom: '6px',
  fontWeight: '700', fontSize: '0.75rem',
  color: '#6b8fa8', textTransform: 'uppercase', letterSpacing: '0.06em',
};

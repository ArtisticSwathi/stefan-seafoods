import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import ProductCard from './components/ProductCard.jsx';
import Contact from './components/Contact.jsx';
import MovingTruck from './components/MovingTruck.jsx';
import Checkout from './components/Checkout.jsx';
import AdminPanel from './components/AdminPanel';

const BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'http://192.168.1.34:5000';

// Category emoji map
const CATEGORY_EMOJI = { fish: '🐟', prawn: '🦐', crab: '🦀', squid: '🦑', lobster: '🦞' };

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('stefanCart');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => { localStorage.setItem('stefanCart', JSON.stringify(cart)); }, [cart]);

  const [view, setView] = useState(() =>
    window.location.pathname === '/dashboard' ? 'admin' : 'main'
  );
  useEffect(() => {
    if (view === 'admin') window.history.pushState({}, '', '/dashboard');
    else if (window.location.pathname === '/dashboard') window.history.pushState({}, '', '/');
  }, [view]);
  useEffect(() => {
    const onPop = () => setView(window.location.pathname === '/dashboard' ? 'admin' : 'main');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const [filter, setFilter] = useState('all');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setProducts(data);
        // Build unique categories directly from DB
        const cats = [...new Set(data.map(p => p.category).filter(Boolean))];
        console.log('✅ Categories from DB:', cats);
        setCategories(cats);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [view]);

  // Filter uses exact match from DB category values
  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  const handleAddToCart = (product, quantity) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      return [...prev, { ...product, quantity }];
    });
  };

  const toggleStock = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, { method: 'PUT' });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p._id === id ? updated : p));
      }
    } catch (e) { console.error(e); }
  };

  const handleOrder = () => {
    if (!userName || !userPhone || !userAddress) return alert('Please fill all delivery details!');
    if (cart.length === 0) return alert('Your cart is empty!');
    const list = cart.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.price * i.quantity}`).join('\n');
    const msg = `Hello Stefan Sea Foods,\n\nName: ${userName}\nPhone: ${userPhone}\nAddress: ${userAddress}\n\nOrder:\n${list}`;
    window.open(`https://wa.me/911234567891?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  if (view === 'admin') {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <button onClick={() => setView('main')} style={{ position: 'fixed', top: '20px', left: '20px', padding: '10px 18px', cursor: 'pointer', zIndex: 200 }}>← Back to Shop</button>
        <AdminPanel products={products} onToggleStock={toggleStock} onExit={() => setView('main')} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
        body { margin: 0; padding: 0; overflow-x: hidden; user-select: none; }
      `}</style>

      <div style={{ fontFamily: 'sans-serif', position: 'relative' }}>
        <Navbar setView={setView} cartCount={cartCount} />

        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #1ca3de 0%, #7ed0f5 70%, #ffffff 98%)', zIndex: -1 }} />

        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
            <ambientLight intensity={2} />
            <Suspense fallback={null}><MovingTruck /></Suspense>
          </Canvas>
        </div>

        {view === 'checkout' ? (
          <Checkout
            cart={cart} setCart={setCart} onBack={() => setView('main')}
            userName={userName} setUserName={setUserName}
            userPhone={userPhone} setUserPhone={setUserPhone}
            userAddress={userAddress} setUserAddress={setUserAddress}
            handleOrder={handleOrder}
          />
        ) : (
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div id="home"><Hero /></div>
            <div id="about"><About /></div>

            <div id="shop" style={{
              minHeight: '100vh', scrollSnapAlign: 'start',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: isMobile ? '80px 14px 40px' : '53px 40px 60px',
              boxSizing: 'border-box',
            }}>
              <h2 style={{ color: '#0A2540', fontSize: isMobile ? '1.8rem' : '3rem', fontWeight: '900', marginBottom: '24px', textAlign: 'center' }}>
                Our Fresh Catch
              </h2>

              {/* Dynamic filter buttons from DB */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
                
                {/* ALL button */}
                <button
                  onClick={() => setFilter('all')}
                  style={{
                    padding: isMobile ? '9px 18px' : '11px 26px',
                    borderRadius: '25px', border: '2px solid',
                    borderColor: filter === 'all' ? '#1ca3de' : 'rgba(255,255,255,0.8)',
                    backgroundColor: filter === 'all' ? '#1ca3de' : 'rgba(255,255,255,0.9)',
                    color: filter === 'all' ? 'white' : '#0A2540',
                    fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    boxShadow: filter === 'all' ? '0 4px 14px rgba(28,163,222,0.45)' : '0 2px 8px rgba(0,0,0,0.08)',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  🌊 All
                </button>

                {/* One button per category from DB */}
                {categories.map(cat => {
                  const emoji = CATEGORY_EMOJI[cat.toLowerCase()] || '🐠';
                  const isActive = filter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        console.log('Filter clicked:', cat);
                        setFilter(cat);
                      }}
                      style={{
                        padding: isMobile ? '9px 18px' : '11px 26px',
                        borderRadius: '25px', border: '2px solid',
                        borderColor: isActive ? '#1ca3de' : 'rgba(255,255,255,0.8)',
                        backgroundColor: isActive ? '#1ca3de' : 'rgba(255,255,255,0.9)',
                        color: isActive ? 'white' : '#0A2540',
                        fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: isMobile ? '0.85rem' : '0.95rem',
                        boxShadow: isActive ? '0 4px 14px rgba(28,163,222,0.45)' : '0 2px 8px rgba(0,0,0,0.08)',
                        textTransform: 'capitalize',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {emoji} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  );
                })}
              </div>

              <p style={{ color: '#3A506B', fontSize: '0.88rem', marginBottom: '20px' }}>
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}{filter !== 'all' ? ` in ${filter}` : ' total'}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: isMobile ? '12px' : '22px',
                width: '100%', maxWidth: '1200px',
                position: 'relative', zIndex: 5,
              }}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(p => (
                    <ProductCard key={p._id || p.id} product={p} onAddToCart={handleAddToCart} isMobile={isMobile} />
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px' }}>
                    <p style={{ fontSize: '2.5rem' }}>🐠</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0A2540' }}>No {filter} products found</p>
                    <button onClick={() => setFilter('all')} style={{ padding: '10px 24px', background: '#1ca3de', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700', marginTop: '12px' }}>
                      Show All
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div id="contact"><Contact /></div>

            <button
              onClick={() => window.open('https://wa.me/911234567891', '_blank')}
              style={{
                position: 'fixed', bottom: '30px', right: '30px',
                width: '58px', height: '58px', backgroundColor: '#25D366',
                borderRadius: '50%', display: 'flex', justifyContent: 'center',
                alignItems: 'center', zIndex: 100, cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                border: 'none', padding: 0,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>

            <div onClick={() => setView('admin')} style={{ position: 'fixed', bottom: '5px', right: '5px', width: '15px', height: '15px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '50%', cursor: 'pointer', zIndex: 100 }} />
          </div>
        )}
      </div>
    </>
  );
}

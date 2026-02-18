import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. IMPORT ALL YOUR COMPONENTS ---
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import ProductCard from './components/ProductCard.jsx';
import Contact from './components/Contact.jsx';
import MovingTruck from './components/MovingTruck.jsx';

export default function App() {
  // --- 2. STATE (The "Memory" of your app) ---
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');

  // --- 3. DATA (Your products list) ---
  const products = [
    { id: 1, name: 'Fresh Salmon', price: 1800, img: '/fish1.jpg', category: 'fish', stock: true },
    { id: 2, name: 'King Prawns', price: 950, img: '/fish2.jpg', category: 'prawn', stock: true },
    { id: 3, name: 'Sea Bass', price: 1200, img: '/fish3.jpg', category: 'fish', stock: false },
    { id: 4, name: 'Blue Lobster', price: 3500, img: '/fish4.jpg', category: 'crab', stock: true },
    { id: 5, name: 'Mud Crab', price: 1200, img: '/fish5.jpg', category: 'crab', stock: true },
    { id: 6, name: 'Fresh Squid', price: 600, img: '/fish6.jpg', category: 'fish', stock: false },
    { id: 7, name: 'White Pomfret', price: 1400, img: '/fish7.jpg', category: 'fish', stock: true }
  ];

  // Logic to filter the fish based on category
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  // --- 4. LOGIC (The WhatsApp Order function) ---
  const handleOrder = () => {
    if (!userName || !userPhone || !userAddress) return alert("Please fill all delivery details!");
    if (cart.length === 0) return alert("Your cart is empty!");

    const orderList = cart.map(item => `• ${item.name} - ₹${item.price}`).join("\n");
    const message = `Hello Stefan Sea Foods,\n\nName: ${userName}\nPhone: ${userPhone}\nAddress: ${userAddress}\n\nOrder Details:\n${orderList}`;
    
    window.open(`https://wa.me/919363622272?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <style>{`
        html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
        body { margin: 0; padding: 0; overflow-x: hidden; user-select: none; }
      `}</style>

      <div style={{ fontFamily: 'sans-serif', position: 'relative' }}>
        <Navbar />

        {/* FIXED BLUE BACKGROUND */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #1ca3de 0%, #7ed0f5 70%, #ffffff 98%)', zIndex: -1 }}></div>

        {/* 3D TRUCK LAYER */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 50, pointerEvents: 'none' }}>
          <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
            <ambientLight intensity={2} />
            <Suspense fallback={null}>
              <MovingTruck />
            </Suspense>
          </Canvas>
        </div>

        {/* PAGE SECTIONS */}
        <Hero />
        <About />

        {/* SHOP SECTION */}
        <div id="shop" style={{ minHeight: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '150px', paddingLeft: '50px', paddingRight: '50px' }}>
          <h2 style={{ color: '#0A2540', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>Our Fresh Catch</h2>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
            {['all', 'fish', 'prawn', 'crab'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '10px 25px', borderRadius: '20px', border: 'none', backgroundColor: filter === cat ? '#1ca3de' : 'white', color: filter === cat ? 'white' : '#0A2540', fontWeight: 'bold', cursor: 'pointer' }}>
                {cat}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px' }}>
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={(item) => setCart([...cart, item])} />
            ))}
          </div>
        </div>

        <Contact 
          userName={userName} setUserName={setUserName}
          userPhone={userPhone} setUserPhone={setUserPhone}
          userAddress={userAddress} setUserAddress={setUserAddress}
          handleOrder={handleOrder}
        />

        {/* Floating WhatsApp Button */}
        <div onClick={() => window.open('https://wa.me/919363622272', '_blank')} style={{ position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', backgroundColor: '#25D366', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <span style={{ color: 'white', fontSize: '30px' }}>✆</span>
        </div>
      </div>
    </>
  );
}
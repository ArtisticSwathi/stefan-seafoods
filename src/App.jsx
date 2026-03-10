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

export default function App() {
// 1. Check if there is already a saved cart in the browser's memory
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('stefanCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Automatically save the cart to memory EVERY time it changes!
  useEffect(() => {
    localStorage.setItem('stefanCart', JSON.stringify(cart));
  }, [cart]);
  
  const [view, setView] = useState('main'); 
  const [filter, setFilter] = useState('all');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const products = [
    { id: 1, name: 'Fresh Salmon', price: 1800, img: '/fish1.jpg', category: 'fish', stock: true },
    { id: 2, name: 'King Prawns', price: 950, img: '/fish2.jpg', category: 'prawn', stock: true },
    { id: 3, name: 'Sea Bass', price: 1200, img: '/fish3.jpg', category: 'fish', stock: false },
    { id: 4, name: 'Blue Lobster', price: 3500, img: '/fish4.jpg', category: 'crab', stock: true },
    { id: 5, name: 'Mud Crab', price: 1200, img: '/fish5.jpg', category: 'crab', stock: true },
    { id: 6, name: 'Fresh Squid', price: 600, img: '/fish6.jpg', category: 'fish', stock: false },
    { id: 7, name: 'White Pomfret', price: 1400, img: '/fish7.jpg', category: 'fish', stock: true }
  ];

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity: quantity }];
    });
  };

  const handleOrder = () => {
    if (!userName || !userPhone || !userAddress) return alert("Please fill all delivery details!");
    if (cart.length === 0) return alert("Your cart is empty!");
    const orderList = cart.map(item => `• ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`).join("\n");
    const message = `Hello Stefan Sea Foods,\n\nName: ${userName}\nPhone: ${userPhone}\nAddress: ${userAddress}\n\nOrder Details:\n${orderList}`;
    window.open(`https://wa.me/918056766046?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <style>{`
        html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
        body { margin: 0; padding: 0; overflow-x: hidden; user-select: none; }
      `}</style>

      <div style={{ fontFamily: 'sans-serif', position: 'relative' }}>
        <Navbar setView={setView} />

        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #1ca3de 0%, #7ed0f5 70%, #ffffff 98%)', zIndex: -1 }}></div>

        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
          <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
            <ambientLight intensity={2} />
            <Suspense fallback={null}>
              <MovingTruck />
            </Suspense>
          </Canvas>
        </div>

{view === 'checkout' ? (
          <Checkout 
            cart={cart} 
            setCart={setCart} 
            onBack={() => setView('main')} 
            userName={userName} setUserName={setUserName}
            userPhone={userPhone} setUserPhone={setUserPhone}
            userAddress={userAddress} setUserAddress={setUserAddress}
            handleOrder={handleOrder}
          />
        ) : (
          <div>
            <div id="home"><Hero /></div>
            <div id="about"><About /></div>
            
           <div id="shop" style={{ minHeight: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '80px', width: '100%', padding: '0 15px', boxSizing: 'border-box' }}>
              <h2 style={{ color: '#0A2540', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>Our Fresh Catch</h2>
              
{/* FOOLPROOF FLEXBOX WRAPPER */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',           /* This tells the cards to drop to the next line! */
                justifyContent: 'center', 
                gap: '20px', 
                width: '100%',
                maxWidth: '1200px' 
              }}>
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>

<div id="contact">
              <Contact />
            </div>
            
            <div onClick={() => window.open('https://wa.me/911111111111', '_blank')} style={{ position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', backgroundColor: '#25D366', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', pointerEvents: 'auto' }}>
              <span style={{ color: 'white', fontSize: '30px' }}>✆</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
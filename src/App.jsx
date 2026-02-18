// Add 'useState' inside these brackets at the very top
import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrthographicCamera, useAnimations } from '@react-three/drei'
import * as THREE from 'three' 


// --- THE ANIMATED TRUCK COMPONENT ---
function MovingTruck() {
  const truckRef = useRef()
  const { scene } = useGLTF('/truck.glb')
useFrame((state) => {
  if (!truckRef.current) return
  const { viewport } = state

  // Calculate exactly how far we've scrolled
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight

  // Ensure we don't divide by zero if the page is short
  const scrollProgress = maxScroll <= 0 ? 0 : scrollY / maxScroll

  // Push the truck higher so it starts off-screen
  const top = viewport.height / 2 + 1.2 
  const bottom = -viewport.height / 2 - 1.2

  // The truck now maps its Y position to the FULL length of the page
  const targetY = top - scrollProgress * (top - bottom)

  // Smooth movement
  truckRef.current.position.y += (targetY - truckRef.current.position.y) * 0.05

  // Keep it on the right edge
  const edgeOffset = 0.3
  truckRef.current.position.x = viewport.width / 2 - edgeOffset
})
  return (
<primitive
  ref={truckRef}
  object={scene}
  scale={0.2}
rotation={[-Math.PI / 2, Math.PI, -Math.PI / 2]}


/>

  )}
const statCard = {
backgroundColor: 'white',
  padding: '30px',
  borderRadius: '20px',
  textAlign: 'center',
  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  color: '#0A2540',
  // New properties for images
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '160px'
};
const inputStyle = {
  padding: '15px',
  borderRadius: '12px',
  // 1. CHANGE BORDER COLOR HERE
  border: 'none', 
  // 2. CHANGE BACKGROUND COLOR HERE
  backgroundColor: 'rgba(255, 255, 255, 0.5)',    
color: '#0A2540',            
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box'
};
const contactDetailStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  color: '#0e253d',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  padding: '10px 20px',
  borderRadius: '12px',
  width: 'fit-content'
};




// --- YOUR MAIN WEBSITE ---
export default function App() {

  // 1. ADD THIS LINE (It was missing!)
  const [filter, setFilter] = useState('all');


  const [cart, setCart] = useState([]); // You were also using cart but never defined it

const handleOrder = () => {
  if (!userName || !userPhone || !userAddress) {
    alert("Please fill all delivery details!");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderList = cart.map(item => `• ${item.name} - ₹${item.price}`).join("\n");

  const message = `
Hello Stefan Sea Foods,

Name: ${userName}
Phone: ${userPhone}
Address: ${userAddress}

Order Details:
${orderList}
`;

  const whatsappURL = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
};

  
// PASTE THIS BELOW YOUR filter STATE
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [productDetails, setProductDetails] = useState('');
  

  // 2. Your products list
const products = [
  { id: 1, name: 'Fresh Salmon', price: 1800, img: '/fish1.jpg', category: 'fish', stock: true },
  { id: 2, name: 'King Prawns', price: 950, img: '/fish2.jpg', category: 'prawn', stock: true },
  { id: 3, name: 'Sea Bass', price: 1200, img: '/fish3.jpg', category: 'fish', stock: false }, // Out of stock
  { id: 4, name: 'Blue Lobster', price: 3500, img: '/fish4.jpg', category: 'crab', stock: true },
  { id: 5, name: 'Mud Crab', price: 1200, img: '/fish5.jpg', category: 'crab', stock: true },
  { id: 6, name: 'Fresh Squid', price: 600, img: '/fish6.jpg', category: 'fish', stock: false }, // Out of stock
  { id: 7, name: 'White Pomfret', price: 1400, img: '/fish7.jpg', category: 'fish', stock: true }
];

  // 3. This logic now works because 'filter' is defined above
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    // ... the rest of your code
    <>
<style>{`
  html { 
    scroll-snap-type: y mandatory; 
    scroll-behavior: smooth;
  }
  body { 
    margin: 0; 
    padding: 0; 
    overflow-x: hidden; 
    /* ADD THESE THREE LINES BELOW */
    user-select: none; 
    -webkit-user-select: none; 
    cursor: default; 
  }
    /* ADD THIS PART BELOW TO CHANGE THE PLACEHOLDER COLOR */
  input::placeholder, textarea::placeholder {
    color: #0a2540; /* Put your desired color code here */
    opacity: 1;      /* Makes the color solid and bright */
  }
    input::placeholder, textarea::placeholder {
  color: #0a2540; 
  opacity: 0.8;    /* Increased opacity for better visibility */
}

/* Add this to see what you are actually typing */
input, textarea {
  color: #0a2540 !important; 
}
`}</style>
      <div style={{ fontFamily: 'sans-serif', position: 'relative' }}>
        
{/* FIXED BACKGROUND */}
<div style={{ 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  width: '100vw', 
  height: '100vh', 
  // CHANGED: Blue now fills 98% of the screen before the white starts
  background: 'linear-gradient(135deg, #1ca3de 0%, #7ed0f5 70%, #ffffff 98%)', 
  zIndex: -1 
}}></div>

        {/* 3D CANVAS (BRUNO SIMON COLORS) */}
    {/* 3D CANVAS (BRUNO SIMON COLORS) */}
<div style={{ 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  width: '100vw', 
  height: '100vh', 
  zIndex: 50, 
  pointerEvents: 'none' // <--- ADD THIS LINE
}}>
  <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace }}>
        <OrthographicCamera 
          makeDefault 
          position={[0, 0, 10]} 
          zoom={100} 
        />

            <ambientLight intensity={2} />
            <directionalLight position={[5, 10, 5]} intensity={2} />
            <Suspense fallback={null}>
              <MovingTruck />
            </Suspense>
          </Canvas>
        </div>

        {/* Nav Bar */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px', backgroundColor: 'white', position: 'fixed', top: 0, left: 0, width: '100%', boxSizing: 'border-box', zIndex: 100 }}>
          <h2 style={{ margin: 0, color: '#0A2540', fontSize: '24px', fontWeight: 'bold' }}>Stefan Sea Foods.</h2>
          <div style={{ display: 'flex', gap: '30px', fontWeight: 'bold', color: '#0A2540' }}>
            <a href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
            <a href="#shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</a>
            <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
          </div>
        </nav>

        {/* PAGE 1: HERO */}
        <div id="home" style={{ display: 'flex', padding: '0 50px', alignItems: 'center', gap: '50px', height: '100vh', scrollSnapAlign: 'start', boxSizing: 'border-box' }}>
          <div style={{ flex: 1 }}>
                    <h1 style={{ 
          fontSize: '4rem', 
          color: '#0A2540', 
          margin: '0 0 20px 0', 
          lineHeight: '1.1', 
          fontWeight: '900',
          userSelect: 'none' // ADD THIS LINE
        }}>
          Premium Quality<br/>Straight from the Ocean.
        </h1>
            <p style={{ fontSize: '1.1rem', color: '#3A506B', marginBottom: '30px' }}>Fresh catch delivered directly to your doorstep.</p>
            <button style={{ padding: '15px 30px', backgroundColor: '#FFB300', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>Order Now 🛒</button>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ width: '100%', maxWidth: '600px', aspectRatio: '16/9', borderRadius: '20px', border: '6px solid white', overflow: 'hidden' }}>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ycV_w0O36PQ?autoplay=1&mute=1" frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        </div>


        {/* --- PAGE 1.5: ABOUT US --- */}
<div id="about" style={{ 
  height: '100vh', 
  scrollSnapAlign: 'start', 
  display: 'flex',
  alignItems: 'center',
  padding: '0 50px',
  boxSizing: 'border-box',
  gap: '60px'
}}>
  <div style={{ flex: 1 }}>
      <h2 style={{ 
        fontSize: '3.5rem', 
        color: '#0A2540', 
        fontWeight: '900', 
        margin: '0 0 20px 0',
        userSelect: 'none' // ADD THIS LINE
      }}>
        Our Quality.
      </h2>
    <p style={{ fontSize: '1.2rem', color: '#3A506B', lineHeight: '1.6' }}>
      Based in Mimisal, we bring the ocean's best directly to you. Every catch is 
      hand-selected to ensure you get the freshest seafood available. Our delivery 
      speed matches our commitment to quality.
    </p>
  </div>
  
<div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
  {/* CARD 1: NATURAL */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45)), url("/natural-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>100%</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Natural</p>
  </div>

  {/* CARD 2: SOURCE */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45)), url("/direct-source-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>Direct</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Source</p>
  </div>

  {/* CARD 3: FRESH */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.45)), url("/DailyFresh-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>Daily</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Fresh</p>
  </div>

  {/* CARD 4: PACKAGED */}
  <div style={{ ...statCard, backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255, 255, 255, 0)), url("/safePacked-about.jpg")' }}>
    <h3 style={{ margin: 0, fontSize: '2rem' }}>Safe</h3>
    <p style={{ margin: 0, fontWeight: 'bold' }}>Packaged</p>
  </div>
</div>
</div>


{/* --- PAGE 2: THE SHOP SECTION --- */}
{/* --- PAGE 2: THE SHOP SECTION --- */}
<div id="shop" style={{ 
  minHeight: '100vh', 
  scrollSnapAlign: 'start', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', // Vertical jumping stops here
  paddingTop: '150px',          // Keeps content from hitting the top
  paddingLeft: '50px',
  paddingRight: '50px',
  boxSizing: 'border-box'
}}>
<h2 style={{ 
  color: '#0A2540', 
  fontSize: '3rem', 
  marginBottom: '20px', 
  fontWeight: '900',
  userSelect: 'none' // ADD THIS LINE
}}>
  Our Fresh Catch
</h2>

  {/* NEW: FILTER BUTTONS */}
  <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
    {['all', 'fish', 'prawn', 'crab'].map((cat) => (
<button 
  key={cat}
  onClick={() => setFilter(cat)}
  style={{
    padding: '10px 25px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: filter === cat ? '#1ca3de' : 'white',
    color: filter === cat ? 'white' : '#0A2540',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textTransform: 'capitalize',
    // ADD THESE TWO LINES BELOW
    userSelect: 'none', 
    outline: 'none'
  }}
>
  {cat}
</button>
    ))}
  </div>
  
  <div style={{ 
    display: 'flex', 
    gap: '25px', 
    flexWrap: 'wrap', 
    justifyContent: 'center', // Centers the cards horizontally
    maxWidth: '1200px'
  }}>
    {/* CHANGE 'products.map' TO 'filteredProducts.map' */}
{filteredProducts.map((p) => (
  <div key={p.id} style={{ 
    width: '280px', 
    backgroundColor: 'white', 
    borderRadius: '25px', 
    overflow: 'hidden', 
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    textAlign: 'center',
    paddingBottom: '20px',
    marginBottom: '20px',
    position: 'relative', // Needed for badge positioning
    opacity: p.stock ? 1 : 0.8 // Slightly dim the card if out of stock
  }}>
    
    {/* 1. OUT OF STOCK BADGE */}
    {!p.stock && (
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

    {/* 2. GRAYSCALE IMAGE IF OUT OF STOCK */}
    <img src={p.img} alt={p.name} style={{ 
      width: '100%', 
      height: '200px', 
      objectFit: 'cover',
      filter: p.stock ? 'none' : 'grayscale(100%)' 
    }} />
    
    <div style={{ padding: '0 20px' }}>
      <h3 style={{ margin: '15px 0 5px 0', color: '#0A2540' }}>{p.name}</h3>
      
      <p style={{ fontWeight: 'bold', color: '#1ca3de', fontSize: '1.3rem', margin: '10px 0' }}>
        ₹{p.price.toLocaleString('en-IN')}
      </p>

      {/* 3. DISABLED QUANTITY SELECTOR */}
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <span style={{ fontSize: '0.9rem', color: '#555' }}>Qty:</span>
        <select 
          disabled={!p.stock}
          style={{
            padding: '5px 10px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            backgroundColor: p.stock ? '#f0f2f2' : '#e0e0e0',
            cursor: p.stock ? 'pointer' : 'not-allowed'
          }}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>
      </div>

      {/* 4. DISABLED BUTTON WITH COLOR CHANGE */}
<button 
  disabled={!p.stock}
  onClick={() => setCart([...cart, p])} // This adds the fish to your "cart" list
  style={{ 
    width: '100%',
    padding: '12px', 
    backgroundColor: p.stock ? '#FFB300' : '#cccccc', 
    borderRadius: '20px', 
    fontWeight: 'bold', 
    cursor: p.stock ? 'pointer' : 'not-allowed'
  }}
>
  {p.stock ? 'Add to Cart' : 'Unavailable'}
</button>
    </div>
  </div>
))}
  </div>
</div>



    {/* PAGE 3: CONTACT US */}
{/* PAGE 3: CONTACT US */}
<div id="contact" style={{ 
  minHeight: '100vh', 
  scrollSnapAlign: 'start', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px 50px',
  boxSizing: 'border-box'
}}>
  <div style={{ 
    // ADDING BACKGROUND IMAGE AND GLASS EFFECT
    backgroundImage: 'linear-gradient(rgba(93, 163, 186, 0.17), rgba(20, 178, 231, 0)), url("/contact-fish.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '60px', 
    borderRadius: '40px', 
    boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
    display: 'flex',
    gap: '60px',
    maxWidth: '1100px',
    width: '100%',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  }}>
    
    {/* LEFT SIDE: INFO */}
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#ffffff', fontSize: '2.8rem', marginBottom: '20px', fontWeight: '900', userSelect: 'none' }}>Get in Touch.</h2>
      <p style={{ color: '#ffffff', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '35px', fontWeight: '500' }}>
        Ready for the freshest catch in Karur? Send us a message or visit our dock.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
<div style={contactDetailStyle}><span>📍</span> Mimisal, Tamil Nadu</div>
        <div style={contactDetailStyle}><span>📞</span> +91 98765 43210</div>
        <div style={contactDetailStyle}><span>✉️</span> fresh@stefanseafoods.com</div>
      </div>
    </div>

{/* RIGHT SIDE: CHECKOUT FORM */}
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', zIndex: 100 }}>
  <h3 style={{ color: 'white', marginBottom: '5px' }}>Delivery Details</h3>
  
  <input type="text" placeholder="Full Name" style={inputStyle} value={userName} onChange={(e) => setUserName(e.target.value)} />
  <input type="text" placeholder="WhatsApp Number" style={inputStyle} value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
  <textarea placeholder="Exact Delivery Address in Mimisal" rows="3" style={inputStyle} value={userAddress} onChange={(e) => setUserAddress(e.target.value)}></textarea>

  {/* THE BUTTON GOES HERE - INSIDE THE DIV */}
  <button 
    onClick={handleOrder} 
    style={{ 
      padding: '18px',
      backgroundColor: '#FFB300', 
      color: '#0A2540', 
      border: 'none', 
      borderRadius: '15px', 
      fontSize: '1.1rem',
      fontWeight: '900', 
      cursor: 'pointer'
    }}
  >
    Confirm Order via WhatsApp 🛒
  </button>
</div>
  </div>
</div>



        {/* WhatsApp Button */}
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', backgroundColor: '#25D366', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <span style={{ color: 'white', fontSize: '30px' }}>✆</span>
        </div>

      </div>
    </>
  )

  
}



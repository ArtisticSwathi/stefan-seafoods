export default function Navbar() { 
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 50px', 
      backgroundColor: 'white', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      boxSizing: 'border-box', 
      zIndex: 100 
    }}>
      <h2 style={{ margin: 0, color: '#0A2540', fontSize: '24px', fontWeight: 'bold' }}>Stefan Sea Foods.</h2>
      <div style={{ display: 'flex', gap: '30px', fontWeight: 'bold', color: '#0A2540' }}>
        <a href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
        <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
        <a href="#shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</a>
        <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
      </div>
    </nav>
  );
}
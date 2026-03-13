// src/components/Hero.jsx
export default function Hero() {
  return (
    <div id="home" className="hero-container">
      <div className="hero-text-box">
        <h1 className="hero-title">
          Premium Quality<br/>Straight from the Ocean.
        </h1>
        <p className="hero-subtitle">
          Fresh catch delivered directly to your doorstep.
        </p>
        <button className="hero-button">
          Order Now 🛒
        </button>
      </div>
      <div className="hero-video-box">
        <div className="hero-video-wrapper">
          <iframe 
            width="100%" height="100%" 
            src="https://www.youtube.com/embed/ycV_w0O36PQ?autoplay=1&mute=1" 
            frameBorder="0" allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
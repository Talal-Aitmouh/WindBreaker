import './App.css';
import { useState, useEffect } from "react";
import speciale from './assets/jpn.jpeg';
import wind1 from './assets/wind.jpeg';
import wind2 from './assets/wind2.jpeg';
import wind3 from './assets/wind3.jpeg';
import wind4 from './assets/wind4.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';



const Hero = () => {

  const thumbnails = [wind1, wind2, wind3, wind4]; // Array of thumbnail images

  // Duplicate the thumbnails array for infinite looping effect
  const infiniteThumbnails = [...thumbnails, ...thumbnails];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTransition(true);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (currentIndex === thumbnails.length) {
      // When reaching the end of the first set of images, reset the index to the start
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(0);
      }, 500); // Wait for the transition to finish before resetting
    }
  },);

  return (
    <div className="hero-container">
      <header className="hero-header">
        <h1 className="logo">SHADXW</h1>
        <nav className="navbar">
          <ul>
            <li>Techwear clothing</li>
            <li>Footwear</li>
            <li>Headwear</li>
            <li>Accessories</li>
            <li>Jewelry</li>
            <li>Cyberpunk</li>
          </ul>
        </nav>
        <div className="icons">
          <button className="icon-button"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#000000", }} /></button>
          <button className="icon-button"><FontAwesomeIcon icon={faCartShopping} style={{ color: "#000000", }} /></button>
        </div>
      </header>

      <main className="hero-content">
        <div className="product-details">
          <p className="breadcrumbs">Jackets &gt; Features</p>
          <h2 className="product-title">JAPANESE WINDBREAKER</h2>
          <div className="options">
            <p>Size:</p>
            <div className="size-options">
              <button>XS</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <p>Color:</p>
            <div className="color-options">
              <button>Black</button>
              <button>White</button>
            </div>
          </div>

          <div className="price-add">
            <span className="price">$99.99</span>
            <button className="add-to-bag">ADD TO BAG</button>
          </div>
        </div>

        <div className="spec-image">
          <img className="main-image" src={speciale} alt="Japanese Windbreaker" />
        </div>

        <div className="product-images">
          <div className="thumbnail-gallery" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {infiniteThumbnails.map((thumbnail, index) => (
              <img
                key={index}
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: transition ? 'transform 0.5s ease-in-out' : 'none',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
          {/* Circle Indicators */}
          <div className="circle-indicators">
            {thumbnails.map((_, index) => (
              <div
                key={index}
                className={`circle ${currentIndex % thumbnails.length === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;

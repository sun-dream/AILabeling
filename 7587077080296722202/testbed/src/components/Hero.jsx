import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for the carousel
  const backgroundImages = [
    "http://balzac.it/wp-content/uploads/2021/10/img-02.jpg",
    "http://balzac.it/wp-content/uploads/2021/10/img-03.jpg",
    "http://balzac.it/wp-content/uploads/2021/10/img-04.jpg",
    "http://balzac.it/wp-content/uploads/2021/10/img-01.jpg"
  ];

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out"
            style={{
              backgroundImage: `url(${img})`,
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0
            }}
          />
        ))}
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center">
        
        {/* Logo */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500 slide-in-left-damped">
          <img 
            src="https://balzac.it/wp-content/uploads/2021/10/Logo-tondo.png" 
            alt="Balzac Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Text Box */}
        <div className="bg-white lg:w-3/5 w-3/4 px-8 py-8 md:px-16 md:py-12 shadow-2xl self-start text-right transform transition-all hover:shadow-xl slide-in-left-damped">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
            Brand stories
          </h1>
          <h4 className="font-sans text-3xl  font-bold uppercase">
            AND OTHER USEFUL WORK FOR YOU
          </h4>
        </div>

      </div>

      {/* Scroll Indicator (Optional, kept for UX) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

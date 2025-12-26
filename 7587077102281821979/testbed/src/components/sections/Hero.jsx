import React, { useState, useEffect } from 'react';
import DraggablePaper from '../ui/DraggablePaper';

const Hero = () => {
  const [papers, setPapers] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  // Initialize papers with random positions
  useEffect(() => {
    const newPapers = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      x: Math.random() * (window.innerWidth - 300),
      y: Math.random() * (window.innerHeight - 300),
      rotation: Math.random() * 60 - 30,
      zIndex: i + 1,
      imageSrc: `https://da-festival.hr/wp-content/themes/da2025/assets/p${i + 1}.png`
    }));
    setPapers(newPapers);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrag = (id, x, y) => {
    setPapers(prev => prev.map(p => 
      p.id === id ? { ...p, x, y } : p
    ));
  };

  const handleFocus = (id) => {
    setPapers(prev => {
      const maxZ = Math.max(...prev.map(p => p.zIndex));
      return prev.map(p => 
        p.id === id ? { ...p, zIndex: maxZ + 1 } : p
      );
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Background Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="text-[120px] md:text-[200px] lg:text-[300px] font-black text-center leading-none opacity-10">
          DOĐEŠ<br/>ZA 10?
        </h1>
      </div>

      {/* Main Title */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="text-[60px] md:text-[100px] lg:text-[150px] font-black text-center leading-none text-black mb-4 drop-shadow-lg">
          DOĐEŠ<br/>ZA 10?
        </h1>
        <p className="text-xl md:text-2xl font-bold bg-white/80 px-4 py-2 mt-4">
          第十届 DA! 艺术、设计与建筑学生节
        </p>
        <p className="text-lg font-bold mt-2">
          04.04. - 18.04.
        </p>
        
        <button 
          className="pointer-events-auto mt-12 bg-[url('https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-button-bg.png')] hover:bg-[url('https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-hover.png')] bg-contain bg-center bg-no-repeat w-[200px] h-[100px] flex items-center justify-center font-black text-xl uppercase pt-4 transition-all"
          onClick={() => window.open('https://www.example.com', '_blank')}
        >
          Pogledaj izložbu
        </button>
      </div>

      {/* Draggable Papers */}
      <div className="absolute inset-0 w-full h-full z-20">
        {papers.map(paper => (
          <DraggablePaper
            key={paper.id}
            {...paper}
            onDrag={handleDrag}
            onFocus={handleFocus}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import Paper from './Paper';
import { Calendar, Users, BookOpen, Palette, Code, Music } from 'lucide-react';

const Hero = () => {
  const [papers, setPapers] = useState([
    { id: 1, x: 100, y: 200, width: 120, height: 120, color: '#39FF14', zIndex: 1, rotation: -5 },
    { id: 2, x: 300, y: 150, width: 150, height: 150, color: '#FF6B35', zIndex: 2, rotation: 3 },
    { id: 3, x: 500, y: 250, width: 100, height: 100, color: '#165DFF', zIndex: 3, rotation: -2 },
    { id: 4, x: 700, y: 180, width: 130, height: 130, color: '#FFD700', zIndex: 4, rotation: 5 },
    { id: 5, x: 900, y: 220, width: 110, height: 110, color: '#FF1493', zIndex: 5, rotation: -4 },
    { id: 6, x: 200, y: 400, width: 140, height: 140, color: '#00FFFF', zIndex: 6, rotation: 2 },
    { id: 7, x: 450, y: 450, width: 120, height: 120, color: '#90EE90', zIndex: 7, rotation: -3 },
    { id: 8, x: 700, y: 420, width: 130, height: 130, color: '#FFA500', zIndex: 8, rotation: 4 },
  ]);

  const handlePaperDrag = (id, x, y, rotation) => {
    setPapers(papers.map(paper => 
      paper.id === id ? { ...paper, x, y, rotation } : paper
    ));
  };

  // Parallax effect on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paperIcons = [
    <Calendar size={48} className="text-black" />,
    <Users size={48} className="text-black" />,
    <BookOpen size={48} className="text-black" />,
    <Palette size={48} className="text-black" />,
    <Code size={48} className="text-black" />,
    <Music size={48} className="text-black" />,
    <Calendar size={48} className="text-black" />,
    <Users size={48} className="text-black" />,
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Background decorative text with parallax */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[clamp(10rem,25vw,20rem)] font-black text-gray-100 pointer-events-none select-none"
        style={{ 
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`,
          zIndex: 0
        }}
      >
        DA!
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Title section */}
        <div className="flex flex-col items-center justify-center mb-20">
          <h1 
            className="text-[clamp(3rem,8vw,6rem)] font-black text-center text-black mb-4 text-shadow"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px)`
            }}
          >
            DOĐEŠ ZA 10?
          </h1>
          <p 
            className="text-[clamp(1rem,2vw,1.5rem)] text-center text-gray-700 max-w-2xl"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          >
            第十届 DA! 艺术、设计与建筑学生节（跨度 04.04. - 18.04.）
          </p>
        </div>

        {/* Interactive paper elements */}
        <div className="relative w-full h-[600px]">
          {papers.map((paper, index) => (
            <Paper
              key={paper.id}
              id={paper.id}
              x={paper.x}
              y={paper.y}
              width={paper.width}
              height={paper.height}
              color={paper.color}
              zIndex={paper.zIndex}
              rotation={paper.rotation}
              onDrag={handlePaperDrag}
            >
              {paperIcons[index]}
            </Paper>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
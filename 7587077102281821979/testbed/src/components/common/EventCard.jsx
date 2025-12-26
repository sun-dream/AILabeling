import React, { useState, useRef } from 'react';

const EventCard = ({ title, subtitle, bgImage, fgImage, time }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic effect calculation
    setOffset({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  return (
    <div 
      ref={cardRef}
      className="relative aspect-[320/380] w-full cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Container for the paper card */}
      <div 
        className="relative w-full h-full transition-transform duration-200 ease-out overflow-hidden"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
         {/* Background Layer */}
        <div className="absolute inset-0 z-0">
             <img 
                src={bgImage} 
                alt="Background" 
                className="w-full h-full object-cover"
             />
        </div>

        {/* Foreground Layer (Parallax effect could be added here too) */}
        <div 
            className="absolute inset-0 z-10 transition-transform duration-200 ease-out"
            style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}
        >
             <img 
                src={fgImage} 
                alt={title} 
                className="w-full h-full object-cover"
             />
        </div>
      </div>

      {/* Text Content - positioned below or overlay? 
          Based on origin.html, text is below the image card. 
          Let's verify origin.html structure. 
          In origin.html:
          <div class="group ...">
             <img src="...paper-horizontal.png" class="paper-edge" />
             <div class="relative ... aspect-[320/380] ...">
                <img src="...bg..." />
                <img src="...fg..." />
             </div>
             <div class="flex flex-col gap-1">
                <h3>Title</h3>
                <p>Subtitle</p>
             </div>
          </div>
          
          So EventCard should probably encapsulate the image part and the text part.
      */}
      
      {/* Paper Edge Decoration (Top of the card in origin.html it seems? No, it looks like it's above the image) 
          Wait, in origin.html:
          <img src="...paper-horizontal.png" ... class="paper-edge" />
          <div class="relative -mt-2 aspect-[320/380] ..."> ... </div>
      */}
      
      <div className="absolute -top-4 left-0 w-full z-20">
          <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper-horizontal.png" className="w-full h-auto" alt="paper edge" />
      </div>

      {/* Info below the card */}
      <div className="mt-4 flex flex-col gap-1 z-20 relative pointer-events-none">
        <h3 className="text-xl lg:text-2xl font-black uppercase leading-tight">{title}</h3>
        <p className="text-base lg:text-lg font-medium uppercase leading-tight">{subtitle}</p>
        {time && <p className="text-sm font-bold text-vividOrange mt-1">{time}</p>}
      </div>
    </div>
  );
};

export default EventCard;

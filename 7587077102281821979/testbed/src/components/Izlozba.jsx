import React, { useState } from 'react';

const Izlozba = () => {
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    { src: "foto.png", defaultPos: "top-[25%] left-[5%]", hoverPos: "top-[3%] left-[3%]", rotate: "-rotate-10" },
    { src: "ind.png", defaultPos: "top-[20%] left-[28%]", hoverPos: "top-[2%] left-[28%]", rotate: "rotate-8" },
    { src: "tipo.png", defaultPos: "top-[15%] left-[48%]", hoverPos: "top-[1%] left-[48%]", rotate: "-rotate-4" },
    { src: "viz.png", defaultPos: "top-[24%] left-[70%]", hoverPos: "top-[2%] left-[70%]", rotate: "rotate-10" },
    { src: "arh.png", defaultPos: "top-[40%] left-[4%]", hoverPos: "top-[65%] left-[0%]", rotate: "-rotate-12" },
    { src: "lik.png", defaultPos: "top-[40%] left-[25%]", hoverPos: "top-[65%] left-[25%]", rotate: "rotate-4" },
    { src: "urb.png", defaultPos: "top-[35%] left-[42%]", hoverPos: "top-[58%] left-[43%]", rotate: "rotate-10" },
    { src: "mod.png", defaultPos: "top-[45%] left-[55%]", hoverPos: "top-[65%] left-[60%]", rotate: "rotate-10" },
  ];

  return (
    <section 
      id="izlozba" 
      className="overflow-x-hidden overflow-y-hidden flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div id="izlozba-trigger"
        className="frizer relative text-[40px] lg:text-[170px] leading-none uppercase py-[120px] lg:py-[180px] text-center max-w-[1200px] w-full">
        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="block uppercase relative z-10 transition-transform duration-300 hover:scale-105">Pogledaj izložbu</a>
        
        {images.map((img, index) => (
          <img 
            key={index}
            src={`https://da-festival.hr/wp-content/themes/da2025/assets/${img.src}`}
            className={`absolute max-w-[145px] md:max-w-none z-20 transition-all duration-700 ease-out
              ${img.rotate}
              ${isHovered ? img.hoverPos : img.defaultPos}
            `} 
            alt={img.src.split('.')[0]} 
          />
        ))}
      </div>
    </section>
  );
};

export default Izlozba;

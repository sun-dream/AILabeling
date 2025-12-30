import React, { useState, useEffect } from 'react';
import Paper from './Paper';

const Hero = () => {
  const [papers, setPapers] = useState([
    { id: 'datum1', x: 100, y: 200, width: 275, height: 185, color: 'transparent', zIndex: 2000, rotation: -15, type: 'date', title: 'Tjedan I.', subtitle: '04.-06.04.', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/paper-white.png)' },
    { id: 'datum2', x: 450, y: 300, width: 275, height: 185, color: 'transparent', zIndex: 2000, rotation: 10, type: 'date', title: 'Tjedan II.', subtitle: '07.-13.04.', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/paper-white.png)' },
    { id: 'datum3', x: 800, y: 250, width: 275, height: 185, color: 'transparent', zIndex: 2000, rotation: -15, type: 'date', title: 'Tjedan III.', subtitle: '14.-18.04.', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/paper-white.png)' },
    { id: 'name', x: 800, y: 500, width: 665, height: 185, color: 'transparent', zIndex: 2000, rotation: -4, type: 'title', title: 'Studentski festival', subtitle: 'Umjetnosti, dizajna i arhitekture', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/paper-white-long.png)' },
    { id: 'torn-0', x: 765, y: 46, width: 351, height: 242, color: 'transparent', zIndex: 1000, rotation: 9.80966, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p1.webp)' },
    { id: 'torn-1', x: 957, y: 353, width: 351, height: 242, color: 'transparent', zIndex: 1000, rotation: -9.75566, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p1.webp)' },
    { id: 'torn-2', x: 974, y: 379, width: 351, height: 242, color: 'transparent', zIndex: 1000, rotation: 0.883958, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p1.webp)' },
    { id: 'torn-3', x: 939, y: 432, width: 479, height: 255, color: 'transparent', zIndex: 1000, rotation: -1.23505, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p2.webp)' },
    { id: 'torn-4', x: 233, y: 31, width: 479, height: 255, color: 'transparent', zIndex: 1000, rotation: 5.97287, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p2.webp)' },
    { id: 'torn-5', x: 947, y: 310, width: 479, height: 255, color: 'transparent', zIndex: 1000, rotation: -8.7423, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p2.webp)' },
    { id: 'torn-6', x: 969, y: 422, width: 479, height: 255, color: 'transparent', zIndex: 1000, rotation: 4.54106, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p2.webp)' },
    { id: 'torn-7', x: 831, y: 315, width: 398, height: 311, color: 'transparent', zIndex: 1000, rotation: -12.2419, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p3.webp)' },
    { id: 'torn-8', x: 40, y: 39, width: 339, height: 292, color: 'transparent', zIndex: 1000, rotation: -6.10527, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p4.webp)' },
    { id: 'torn-9', x: 962, y: 319, width: 339, height: 292, color: 'transparent', zIndex: 1000, rotation: -1.3339, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p4.webp)' },
    { id: 'torn-10', x: 41, y: 326, width: 349, height: 274, color: 'transparent', zIndex: 1000, rotation: 7.59522, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p5.webp)' },
    { id: 'torn-11', x: 474, y: 49, width: 349, height: 274, color: 'transparent', zIndex: 1000, rotation: 10.0382, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p5.webp)' },
    { id: 'torn-12', x: 33, y: 337, width: 349, height: 274, color: 'transparent', zIndex: 1000, rotation: 3.7977, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p5.webp)' },
    { id: 'torn-13', x: 25, y: 20, width: 349, height: 274, color: 'transparent', zIndex: 1000, rotation: 0.298816, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p5.webp)' },
    { id: 'torn-14', x: 948, y: 57, width: 349, height: 274, color: 'transparent', zIndex: 1000, rotation: -13.0533, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p5.webp)' },
    { id: 'torn-15', x: 47, y: 320, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: 11.574, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p6.webp)' },
    { id: 'torn-16', x: 472, y: 348, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: -0.769809, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p6.webp)' },
    { id: 'torn-17', x: 598, y: 245, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: 13.4575, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p6.webp)' },
    { id: 'torn-18', x: 995, y: 317, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: 6.39262, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p6.webp)' },
    { id: 'torn-19', x: 1015, y: 320, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: -11.7795, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p6.webp)' },
    { id: 'torn-20', x: 194, y: 479, width: 384, height: 108, color: 'transparent', zIndex: 1000, rotation: -14.1038, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p7.webp)' },
    { id: 'torn-21', x: 691, y: 65, width: 646, height: 180, color: 'transparent', zIndex: 1000, rotation: -10.0436, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p8.webp)' },
    { id: 'torn-22', x: 971, y: 28, width: 646, height: 180, color: 'transparent', zIndex: 1000, rotation: 6.87167, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p8.webp)' },
    { id: 'torn-23', x: 969, y: 301, width: 646, height: 180, color: 'transparent', zIndex: 1000, rotation: 13.8178, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p8.webp)' },
    { id: 'torn-24', x: 1137, y: 481, width: 646, height: 180, color: 'transparent', zIndex: 1000, rotation: -13.771, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p8.webp)' },
    { id: 'torn-25', x: 199, y: 334, width: 646, height: 180, color: 'transparent', zIndex: 1000, rotation: -2.71229, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p8.webp)' },
    { id: 'torn-26', x: 1320, y: 196, width: 370, height: 255, color: 'transparent', zIndex: 1000, rotation: 13.4064, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p9.webp)' },
    { id: 'torn-27', x: 1464, y: 197, width: 370, height: 255, color: 'transparent', zIndex: 1000, rotation: 13.2187, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p9.webp)' },
    { id: 'torn-28', x: 1285, y: 373, width: 370, height: 255, color: 'transparent', zIndex: 1000, rotation: -2.74057, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p9.webp)' },
    { id: 'torn-29', x: 570, y: 321, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: -11.0802, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p10.webp)' },
    { id: 'torn-30', x: 295, y: 348, width: 289, height: 250, color: 'transparent', zIndex: 1000, rotation: -0.582552, type: 'image', bgImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/p10.webp)' }
  ]);

  const handlePaperDrag = (id, newX, newY, newRotation) => {
    setPapers(papers.map((paper) =>
      paper.id === id
        ? { ...paper, x: newX, y: newY, rotation: newRotation !== undefined ? newRotation : paper.rotation }
        : paper
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


  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Background decorative text with parallax */}
      <div 
        className="text-center container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,20vw,15rem)] font-black text-gray-900 pointer-events-none select-none"
        style={{ 
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`,
          zIndex: 0
        }}
      >
        DOĐEŠ ZA 10?
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20 h-screen flex flex-col justify-center">
        {/* Interactive paper elements */}
        <div className="relative w-full h-full">
          {papers.map((paper) => (
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
              onDragEnd={handlePaperDrag}
            >
               <div 
                className={`w-full h-full flex flex-col items-center justify-center uppercase font-bold text-center select-none bg-no-repeat bg-contain bg-center ${paper.type === 'title' ? 'text-xl lg:text-3xl' : 'text-sm lg:text-lg'}`}
                style={{ backgroundImage: paper.bgImage }}
               >
                 {paper.type === 'date' ? (
                   <>
                     <span className="leading-none">{paper.title}</span>
                     <span className="text-2xl lg:text-4xl leading-none mt-2">{paper.subtitle}</span>
                   </>
                 ) : (
                   <>
                     <span className="block">{paper.title}</span>
                     <span className="block">{paper.subtitle}</span>
                   </>
                 )}
               </div>
            </Paper>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
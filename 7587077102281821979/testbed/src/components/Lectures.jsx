import React, { useEffect, useState } from 'react';

const Lectures = () => {
  // Parallax effect on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lectures = [
    {
      title: "ORGANIZIRANO OBLIKOVANJE",
      description: "探索设计组织的新方法和策略",
      date: "04.04.2025",
      time: "18:00"
    },
    {
      title: "IVAN VELJAČA",
      description: "场景设计思路与实践",
      date: "06.04.2025",
      time: "19:00"
    },
    {
      title: "HIGH ON TYPE",
      description: "字体设计的创新与表达",
      date: "10.04.2025",
      time: "18:30"
    },
    {
      title: "DIGITAL COLLAGE",
      description: "数字拼贴艺术的边界探索",
      date: "12.04.2025",
      time: "19:30"
    }
  ];

  return (
    <div className="relative w-full py-20 bg-neonLime/20 torn-edge-top">
      {/* Background decorative text with parallax */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,20vw,15rem)] font-black text-neonLime/30 pointer-events-none select-none"
        style={{ 
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)`,
          zIndex: 0
        }}
      >
        PREDAVANJA
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-center text-black mb-16 text-shadow">
          PREDAVANJA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lectures.map((lecture, index) => (
            <div 
              key={index}
              className="bg-white p-8 paper-shadow magnetic rounded-lg transition-all duration-300 hover:shadow-xl"
              style={{
                transform: `translateY(${scrollY * 0.1 * (index + 1) * 0.1}px)`,
                opacity: 1 - (scrollY * 0.001 * (index + 1))
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-black">{lecture.title}</h3>
                <div className="bg-neonLime text-black px-4 py-2 rounded-full font-bold">
                  {lecture.date}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{lecture.description}</p>
              <div className="flex items-center text-vividOrange font-bold">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {lecture.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lectures;
import React, { useEffect, useState } from 'react';

const Workshops = () => {
  // Parallax effect on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const workshops = [
    {
      title: "KLASJA HABJAN",
      description: "插画叙事工作坊",
      date: "05.04.2025",
      time: "14:00 - 17:00"
    },
    {
      title: "BÜRO BIETENHADER",
      description: "建筑实践工作坊",
      date: "07.04.2025",
      time: "10:00 - 16:00"
    },
    {
      title: "DIGITAL CRAFT",
      description: "数字工艺与传统技术结合",
      date: "11.04.2025",
      time: "15:00 - 18:00"
    },
    {
      title: "MOTION DESIGN",
      description: "动态图形设计入门",
      date: "15.04.2025",
      time: "13:00 - 19:00"
    }
  ];

  return (
    <div className="relative w-full py-20 bg-vividOrange/20 torn-edge">
      {/* Background decorative text with parallax */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,20vw,15rem)] font-black text-vividOrange/30 pointer-events-none select-none"
        style={{ 
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)`,
          zIndex: 0
        }}
      >
        RADIONICE
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-center text-black mb-16 text-shadow">
          RADIONICE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshops.map((workshop, index) => (
            <div 
              key={index}
              className="bg-white p-8 paper-shadow magnetic rounded-lg transition-all duration-300 hover:shadow-xl"
              style={{
                transform: `translateY(${scrollY * 0.1 * (index + 1) * 0.1}px)`,
                opacity: 1 - (scrollY * 0.001 * (index + 1))
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-black">{workshop.title}</h3>
                <div className="bg-vividOrange text-white px-4 py-2 rounded-full font-bold">
                  {workshop.date}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{workshop.description}</p>
              <div className="flex items-center text-neonLime font-bold">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {workshop.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workshops;
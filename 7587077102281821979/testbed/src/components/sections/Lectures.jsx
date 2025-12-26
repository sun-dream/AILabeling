import React from 'react';
import SectionDivider from '../common/SectionDivider';
import EventCard from '../common/EventCard';

const Lectures = () => {
  const lectures = [
    {
      title: "Organizirano Oblikovanje",
      subtitle: "Oblikovanje naše prakse",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/organiziranoobl.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/orgobl-white.png"
    },
    {
      title: "Ivan Veljača",
      subtitle: "Scenografija – način razmišljanja",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-papirici-1.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-white-1.png"
    },
    {
      title: "high on type",
      subtitle: "Writing together",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-papirici.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-white.png"
    },
    {
      title: "Matej Merlić & Maja Merlić Ilić",
      subtitle: "Moderna vremena",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/modvremena-papiric.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/modernavrwhitte.png"
    }
  ];

  return (
    <section id="predavanja" className="relative w-full">
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green.png" 
      />
      
      <div className="relative bg-neonLime pb-20 -mt-1">
        <div className="container mx-auto px-4 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <h2 className="text-[44px] lg:text-[100px] font-black uppercase leading-none tracking-tighter">
              Predavanja
            </h2>
            <button 
              className="hidden lg:block border border-transparent hover:border-black px-4 py-2 font-bold uppercase transition-all"
              onClick={() => window.open('https://www.example.com', '_blank')}
            >
              Vidi sva predavanja
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lectures.map((lecture, index) => (
              <EventCard key={index} {...lecture} />
            ))}
          </div>

          <div className="lg:hidden mt-8 text-center">
             <button 
              className="border border-black border-dashed px-4 py-2 font-bold uppercase"
              onClick={() => window.open('https://www.example.com', '_blank')}
            >
              Vidi sva predavanja
            </button>
          </div>
        </div>
      </div>
      
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green.png"
        className="-mt-1"
      />
    </section>
  );
};

export default Lectures;

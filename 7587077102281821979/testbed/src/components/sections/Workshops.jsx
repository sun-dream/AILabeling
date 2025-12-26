import React from 'react';
import SectionDivider from '../common/SectionDivider';
import EventCard from '../common/EventCard';

const Workshops = () => {
  const workshops = [
    {
      title: "Klasja Habjan",
      subtitle: "Ilustracije, priče i pokvareni telefon",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/klasja-papirici.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/klasja-white.png"
    },
    {
      title: "Büro Bietenhader Moroder",
      subtitle: "Dumb Emancipatory Architecture",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/dea-papirici_bg.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/dea-white.png"
    },
    {
      title: "Appear Offline",
      subtitle: "Print, scan, repeat.",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/appear-papirici.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/appear-white.png"
    },
    {
      title: "Emil Flatz & Luka Perić",
      subtitle: "Dizajn i razvoj interaktivne time-tracking aplikacije",
      bgImage: "https://da-festival.hr/wp-content/uploads/2025/03/pf-papiric.png",
      fgImage: "https://da-festival.hr/wp-content/uploads/2025/03/pf-white-2.png"
    }
  ];

  return (
    <section id="radionice" className="relative w-full -mt-20 lg:-mt-40 z-10">
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange.png" 
      />
      
      <div className="relative bg-vividOrange pb-20 -mt-1">
        <div className="container mx-auto px-4 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <h2 className="text-[44px] lg:text-[100px] font-black uppercase leading-none tracking-tighter">
              Radionice
            </h2>
            <button 
              className="hidden lg:block border border-transparent hover:border-black px-4 py-2 font-bold uppercase transition-all"
              onClick={() => window.open('https://www.example.com', '_blank')}
            >
              Vidi sve radionice
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workshops.map((workshop, index) => (
              <EventCard key={index} {...workshop} />
            ))}
          </div>

          <div className="lg:hidden mt-8 text-center">
             <button 
              className="border border-black border-dashed px-4 py-2 font-bold uppercase"
              onClick={() => window.open('https://www.example.com', '_blank')}
            >
              Vidi sve radionice
            </button>
          </div>
        </div>
      </div>
      
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange.png"
        className="-mt-1"
      />
    </section>
  );
};

export default Workshops;

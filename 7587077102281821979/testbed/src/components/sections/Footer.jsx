import React from 'react';
import SectionDivider from '../common/SectionDivider';
import Marquee from '../common/Marquee';

const Footer = () => {
  const sponsors = [
    "https://da-festival.hr/wp-content/uploads/2025/03/l1.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/l2.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/l3.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/l6.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/brigada-02.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/buro-05.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/daz-05.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/grad-zagreb-02.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/vizkultura-02.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/KSPUFF-logo_vektor.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/oris-12.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/kulturpunkt-01.svg",
    "https://da-festival.hr/wp-content/uploads/2025/03/uha-03.png",
    "https://da-festival.hr/wp-content/uploads/2025/03/dar-04.png",
    "https://da-festival.hr/wp-content/uploads/2025/03/Logo-SZAF-1.png",
    "https://da-festival.hr/wp-content/uploads/2025/03/aluprotekt-novi.png",
    "https://da-festival.hr/wp-content/uploads/2025/03/erste-crnovijel.png"
  ];

  return (
    <footer className="relative w-full z-30">
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_blue.png" 
      />
      
      <div className="relative bg-[#3F6BE8] pb-20 -mt-1">
        <Marquee />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white">
            <div className="flex flex-col gap-4">
              <h3 className="font-black uppercase text-xl">Kontakt</h3>
              <a href="mailto:dafestival.info@gmail.com" className="font-medium hover:underline">
                dafestival.info@gmail.com
              </a>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-black uppercase text-xl">Social</h3>
              <a href="https://www.instagram.com/da.festival/" target="_blank" rel="noreferrer" className="font-medium hover:underline" onClick={() => window.open('https://www.example.com', '_blank')}>
                Instagram
              </a>
              <a href="https://web.facebook.com/festivalDA/" target="_blank" rel="noreferrer" className="font-medium hover:underline" onClick={() => window.open('https://www.example.com', '_blank')}>
                Facebook
              </a>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-black uppercase text-xl">Lokacije</h3>
              <p className="font-medium">Arhitektonski fakultet</p>
              <p className="font-medium">DAZ</p>
              <p className="font-medium">Super Klet</p>
              <p className="font-medium">Zoom</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-black uppercase text-xl">Web dizajn i razvoj</h3>
              <a href="https://bien.studio" target="_blank" rel="noreferrer" className="font-medium hover:underline" onClick={() => window.open('https://www.example.com', '_blank')}>
                Bien.studio
              </a>
            </div>
          </div>
        </div>
        
        <SectionDivider 
            imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_blue.png"
            className="absolute bottom-0 left-0 w-full"
        />
      </div>

      {/* Sponsors Section - Below the blue footer, on white background */}
      <div className="relative -mt-20 z-0"> 
         <SectionDivider 
            imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_footer_white.png"
            className="relative z-10"
         />
         <div className="bg-white pt-10 pb-20 -mt-1">
            <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-8">
                {sponsors.map((src, index) => (
                    <img key={index} src={src} alt="Sponsor" className="h-[60px] md:h-[90px] w-auto object-contain" />
                ))}
            </div>
         </div>
      </div>
    </footer>
  );
};

export default Footer;

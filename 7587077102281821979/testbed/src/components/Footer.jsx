import React from 'react';

const Footer = () => {
  return (
    <footer id="colophon" className="site-footer overflow-x-hidden" role="contentinfo">
      <section className="relative w-full">
        <div>
          <picture>
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_blue_2x.webp" media="(min-width: 1500px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_blue.webp" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_blue_2x.png" media="(min-width: 1500px)" />
            <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_blue.png" alt="Paper Top Orange" className="w-full h-auto object-cover" />
          </picture>
        </div>
        <div className="relative -mt-2 bg-[#3F6BE8] pb-[100px]">
          <div className="py-16">
            <div className="marquee-wrapper w-full overflow-hidden relative m-0 lg:py-4">
              <div className="marquee-track track1 flex w-max uppercase frizer text-[64px] lg:text-[116px] leading-none animate-marquee-right">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="marquee-item whitespace-nowrap pr-10">10. DA!</div>
                ))}
              </div>
            </div>
            <div className="marquee-wrapper w-full overflow-hidden relative m-0 lg:py-4">
              <div className="marquee-track track2 flex w-max uppercase frizer text-[64px] lg:text-[116px] leading-none animate-marquee-left">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="marquee-item whitespace-nowrap pr-10">10. DA!</div>
                ))}
              </div>
            </div>
            <div className="marquee-wrapper w-full overflow-hidden relative m-0 lg:py-4">
              <div className="marquee-track track3 flex w-max uppercase frizer text-[64px] lg:text-[116px] leading-none animate-marquee-right">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="marquee-item whitespace-nowrap pr-10">10. DA!</div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-4 pb-[80px] lg:pb-0 lg:px-[200px] flex justify-between flex-col lg:flex-row gap-4 lg:gap-[80px]">
            <div className="flex flex-col">
              <span className="anybody-bold uppercase text-base lg:text-lg leading-6">Kontakt</span>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="anybody-medium text-base lg:text-lg leading-6">dafestival.info@gmail.com</a>
            </div>
            <div className="flex flex-col">
              <span className="anybody-bold uppercase text-base lg:text-lg leading-6">Social</span>
              <a href="https://www.example.com" className="anybody-medium text-base lg:text-lg leading-6" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.example.com" className="anybody-medium text-base lg:text-lg leading-6" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <div className="flex flex-col">
              <span className="anybody-bold uppercase text-base lg:text-lg leading-6">Lokacije</span>
              <span className="anybody-medium text-base lg:text-lg leading-6">Arhitektonski fakultet</span>
              <span className="anybody-medium text-base lg:text-lg leading-6">DAZ</span>
              <span className="anybody-medium text-base lg:text-lg leading-6">Super Klet</span>
              <span className="anybody-medium text-base lg:text-lg leading-6">Zoom</span>
            </div>
            <div className="flex flex-col">
              <span className="anybody-bold uppercase text-base lg:text-lg leading-6">Web dizajn i razvoj</span>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="anybody-medium text-base lg:text-lg leading-6">Bien.studio</a>
            </div>
          </div>
        </div>
        <picture>
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_blue_2x.webp" media="(min-width: 1500px)" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_blue.webp" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_blue_2x.png" media="(min-width: 1500px)" />
          <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_blue.png" alt="Paper Top Orange" className="w-full h-auto object-cover" />
        </picture>
      </section>
      <section className="relative w-full z-[3000] -mt-[200px]">
        <div>
          <picture>
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_footer_white_2x.webp" media="(min-width: 1500px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_footer_white.webp" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_footer_white_2x.png" media="(min-width: 1500px)" />
            <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_footer_white.png" alt="Paper Top Orange" className="w-full h-auto object-cover" />
          </picture>
        </div>
        <div className="relative -mt-2 bg-white">
          <div className="px-4 lg:px-10 flex flex-wrap gap-4 pt-10 pb-16 justify-center items-center">
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/l1.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/l2.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/l3.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/l6.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/brigada-02.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/buro-05.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/daz-05.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/grad-zagreb-02.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/vizkultura-02.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/KSPUFF-logo_vektor.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/oris-12.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/kulturpunkt-01.svg" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/uha-03.png" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/dar-04.png" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/Logo-SZAF-1.png" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/aluprotekt-novi.png" className="h-[90px]" alt="Sponsor Logo" />
            <img src="https://da-festival.hr/wp-content/uploads/2025/03/erste-crnovijel.png" className="h-[90px]" alt="Sponsor Logo" />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
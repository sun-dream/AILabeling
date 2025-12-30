import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const logoUrl = 'https://balzac.it/wp-content/uploads/2021/10/Logo-tondo.png';
  const badgeUrl = 'https://balzac.it/wp-content/uploads/2022/01/Badge.jpg';

  return (
    <footer className="w-full">
      <section className="bg-[#FFC629] text-black w-full">
        <div className="mx-auto  grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="col-span-1 md:col-span-3  border-t border-black flex items-center justify-center bg-white md:border-r border-black">
            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="block">
              <img src={logoUrl} alt="Balzac logo" className="w-32 h-32 object-contain" />
            </a>
          </div>
          <div className=" border-t border-black col-span-1 md:col-span-4 md:px-8 md:border-r border-black p-4">
            <h6 className="font-semibold">Balzac s.r.l.</h6>
            <p className="mt-2">
              HEADQUARTERS | Via Valfrè 14, 10121 Torino (TO)
            </p>
            <p>
              REGISTERED OFFICE | Via Legnano 27, 10128 Torino (TO)
            </p>
            <p>VAT: IT11913170012</p>
            <p>SdI code: M5UXCR1</p>
            <div className="mt-4">
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-semibold border border-black px-4 py-2 hover:bg-black hover:text-white transition"
              >
                oui@balzac.it
              </a>
            </div>
          </div>
          <div className=" border-t border-black col-span-1 md:col-span-5 md:pl-8 p-4">
            <h3 className="font-serif font-bold text-[clamp(1.2rem,4vw,2rem)] leading-snug">
              Brand stories, storytelling, branding design, social media, web & app for start-up and all size companies
            </h3>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 uppercase font-semibold">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Spotify</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-8 md:py-10 relative">
        <div className="container mx-auto max-w-[1140px] px-6 md:px-12">
            <div className="text-center mx-auto">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <img src={badgeUrl} alt="Showcase 2021" className="h-10 md:h-12 object-contain" />
              </a>
            </div>
            <nav className="max-w-[840px] mt-10">
              <ul className="container mx-auto  flex items-center justify-between font-semibold">
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#FFC629]">Home</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Specialities</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Experience</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Works</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact</a></li>
              </ul>
            </nav>
        </div>
        <a
          href="#top"
          className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-[70px] h-[70px] border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          <ArrowUp size={70} />
        </a>
      </section>
    </footer>
  );
};

export default Footer;

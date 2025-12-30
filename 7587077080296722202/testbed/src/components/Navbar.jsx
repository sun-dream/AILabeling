import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-[70px] h-[70px] rounded-full border border-white bg-black text-white shadow-lg hover:bg-white hover:text-black transition"
      >
        <Menu size={28} />
      </button>

      {isOpen && (
        <div aria-modal="true" role="dialog" className="fixed inset-0 z-[60] bg-white">
          <button
            aria-label="关闭"
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 inline-flex items-center justify-center w-[70px] h-[70px] rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition"
          >
            <X size={28} />
          </button>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-[8vw] top-1/2 -translate-y-1/2 w-[70vh] h-[70vh] md:w-[90vh] md:h-[90vh] bg-[#FFC629] rounded-full"></div>
            <div className="absolute -right-[8vw] top-1/2 -translate-y-1/2 w-[70vh] h-[70vh] md:w-[90vh] md:h-[90vh] bg-[#FFC629] rounded-full"></div>
          </div>

          <div className="relative h-full flex flex-col">
            <div className="px-10 pt-10 flex gap-8 font-bold uppercase text-black">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Italiano</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">English</a>
            </div>

            <div className="flex-1 grid place-items-center px-4">
              <ul className="text-black font-extrabold uppercase text-center leading-[0.93] space-y-2 text-[clamp(2.2rem,8vw,6rem)]">
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Home</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Specialities</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Experience</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Works</a></li>
                <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Contact</a></li>
              </ul>
            </div>

            <div className="px-10 pb-10">
              <div className="grid grid-cols-2 md:grid-cols-4 text-[11px] font-bold tracking-wide uppercase text-black gap-y-4">
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Spotify</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

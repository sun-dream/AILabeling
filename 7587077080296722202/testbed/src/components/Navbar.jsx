import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

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
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-black bg-white text-black shadow-lg  hover:bg-black hover:text-white transition"
      >
        <Menu  className="w-1/2 h-1/2" />
      </button>
      <div className='fixed top-1/2 -translate-y-1/2 right-0 z-50 md:w-[50px] w-[25px]'>
        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="w-full block mb-4">
          <img src="https://balzac.it/wp-content/uploads/2022/02/Honor-Awwwards.png" className='w-full object-contain' alt="" srcset="" />
        </a>
         <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="w-full block">
          <img src="https://balzac.it/wp-content/uploads/2022/01/Badge-Top-10.jpg" className='w-full object-contain ' alt="" srcset="" />
        </a>
       
      </div>

      <div 
        aria-modal="true" 
        role="dialog" 
        className={`fixed inset-0 z-[60] bg-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          clipPath: isOpen 
            ? 'circle(150% at calc(100% - 6.5rem) calc(100% - 6.5rem))' 
            : 'circle(0% at calc(100% - 6.5rem) calc(100% - 6.5rem))',
          WebkitClipPath: isOpen 
            ? 'circle(150% at calc(100% - 6.5rem) calc(100% - 6.5rem))' 
            : 'circle(0% at calc(100% - 6.5rem) calc(100% - 6.5rem))'
        }}
      >
        <button
          aria-label="关闭"
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 z-50 inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-black bg-white text-black hover:bg-black hover:text-white transition group"
        >
          <X className="w-1/2 h-1/2 group-hover:hidden" />
          <ChevronUp className="w-2/3 h-2/3 hidden group-hover:block" />
        </button>

        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            backgroundColor: '#FFFFFF',
            backgroundImage: 'url(https://balzac.it/wp-content/uploads/2021/10/Sole-Giallo.png)',
            backgroundPosition: 'center left',
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat'
          }}
        >
        </div>

        <div className={`relative h-full flex flex-col transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="px-10 pt-10 flex gap-8 font-bold uppercase text-black">
            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Italiano</a>
            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">English</a>
          </div>

          <div className="flex-1 grid place-items-center px-4">
            <ul className="text-black font-extrabold uppercase text-center leading-[0.93] space-y-2 text-[clamp(2.2rem,8vw,6rem)]">
              <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Specialities</a></li>
              <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Experience</a></li>
              <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Works</a></li>
              <li><a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="px-10 pb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 text-[16px] font-bold tracking-wide uppercase text-black gap-y-4">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Spotify</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

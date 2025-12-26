import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  const navLinks = [
    "Predavanja",
    "Radionice",
    "Izložba",
    "O nama",
    "Prijavi rad"
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? '-mt-2' : 'mt-0'}`}>
      {/* Background Texture */}
      <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png" 
            alt="Menu Background" 
            className="w-full h-full object-cover object-bottom"
          />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer" onClick={handleClick}>
          <img 
            src="https://da-festival.hr/wp-content/themes/da2025/assets/logo.svg" 
            alt="DA! Festival" 
            className="h-8 lg:h-10"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link, index) => (
            <button 
              key={index}
              onClick={handleClick}
              className="text-black font-bold uppercase text-base hover:opacity-70 transition-opacity"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden z-20">
           <img 
            src="https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png" 
            alt="Menu Background" 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
          />
          <div className="relative z-10 flex flex-col items-center py-8 gap-6">
            {navLinks.map((link, index) => (
              <button 
                key={index}
                onClick={handleClick}
                className="text-black font-bold uppercase text-xl"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

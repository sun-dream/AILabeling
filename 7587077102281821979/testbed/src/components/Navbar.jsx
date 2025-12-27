import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const menuItems = [
    { label: 'Predavanja', href: '/predavanja' },
    { label: 'Radionice', href: '/radionice' },
    { label: 'Izložba', href: '/izlozba' },
    { label: 'O nama', href: '/o-nama' },
    { label: 'Prijavi rad', href: '/prijavnica' },
  ];

  return (
    <nav className="w-full fixed top-0 z-[8000] pointer-events-none">
      <div className="relative w-full h-full pointer-events-auto">
        <div className="z-10 relative bg-white flex flex-row justify-between items-start px-4 pt-4 lg:px-10 lg:pt-8">
          {/* Logo */}
          <div className="site-logo">
            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://da-festival.hr/wp-content/themes/da2025/assets/logo.svg" 
                alt="DA! Festival" 
                className="h-8 lg:h-12"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu className="h-8 w-8" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="bg-transparent">
              <ul className="flex flex-row gap-6">
                {menuItems.map((item, index) => (
                  <li key={index} className="text-base font-bold uppercase hover:text-vividOrange transition-colors">
                    <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Decorative Paper Strip (Desktop) */}
        <div className="-mt-2 lg:-mt-8 pointer-events-none hidden lg:block">
          <img 
            src="https://da-festival.hr/wp-content/themes/da2025/assets/menu_bg.png" 
            alt="Menu Background" 
            className="w-full h-auto object-cover menu-bg-strip"
          />
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-white z-[9999] transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ 
            backgroundImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/menu-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative w-full h-full flex flex-col p-5">
            <div className="flex justify-between items-start mb-10">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://da-festival.hr/wp-content/themes/da2025/assets/logo.svg" 
                  className="h-8" 
                  alt="Logo"
                />
              </a>
              <button 
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <ul className="flex flex-col items-center justify-center flex-grow gap-8">
              {menuItems.map((item, index) => (
                <li key={index} className="text-2xl font-bold uppercase">
                  <a 
                    href="https://www.example.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

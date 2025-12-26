import React from 'react';

const Footer = () => {
  return (
    <div className="relative w-full bg-black text-white py-12">
      {/* Animated scrolling text */}
      <div className="overflow-hidden bg-neonLime py-4 mb-12">
        <div className="animate-scroll whitespace-nowrap">
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
          <span className="text-black text-2xl font-bold mx-8">10. DA!</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black text-white mb-2">DA! Festival 2025</h2>
            <p className="text-gray-400">10. studentski festival umjetnosti, dizajna i arhitekture</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <button className="bg-vividOrange hover:bg-vividOrange/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 mb-4">
              POGLEDAJ IZLOŽBU
            </button>
            <p className="text-gray-500 text-sm">04.04. - 18.04.2025</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 DA! Festival. Sva prava pridržana.</p>
          <p className="mt-2">Dizajn i izvedba: Studentski kolektiv DA!</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
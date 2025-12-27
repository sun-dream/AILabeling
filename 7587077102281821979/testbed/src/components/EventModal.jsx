import React, { useEffect, useState } from 'react';

const EventModal = ({ isOpen, onClose, event }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  // Default values or safely access event properties
  const {
    title = '',
    subtitle = '',
    bgImg = '',
    fgImg = '',
    date = 'SUBOTA 25.1.',
    location = 'STUDIO 1',
    address = 'FRANKOPANSKA 12',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    biography = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    capacity = '',
    equipment = '',
  } = event || {};

  return (
    <div 
      id="event-modal" 
      className={`fixed top-0 right-0 h-full transition-transform duration-300 ease-in-out z-[12000] flex ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      
      {/* Paper Edge */}
      <div className="relative h-full flex-shrink-0 z-20">
        <img 
          src="https://da-festival.hr/wp-content/themes/da2025/assets/paper-vertical.png" 
          alt="Paper Edge" 
          className="h-full w-auto object-cover" 
        />
      </div>

      {/* Content Container */}
      <div className="w-[1100px] bg-white shadow-lg flex flex-col h-full max-w-[calc(100vw-50px)] relative">
        <button 
          onClick={onClose} 
          id="modal-close" 
          className="absolute right-6 top-6 z-[12001] cursor-pointer"
        >
          <img src="https://da-festival.hr/wp-content/themes/da2025/assets/close.svg" alt="Close" />
        </button>

        <div className="flex-1 overflow-y-auto px-8 md:px-12 pt-16 md:pt-24 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-full">
            
            {/* Image Section - Left Column */}
            <div className="col-span-1 flex flex-col justify-start items-center md:items-start">
              <div className="relative w-full aspect-[320/380] max-w-[500px]">
                {bgImg && (
                  <img 
                    src={bgImg} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Background"
                  />
                )}
                {fgImg && (
                  <img 
                    src={fgImg} 
                    className="absolute inset-0 w-full h-full object-cover z-10" 
                    alt="Foreground"
                  />
                )}
              </div>
            </div>

            {/* Text Content Section - Right Column */}
            <div className="col-span-1 flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-4 w-full">
                
                {/* Title & Subtitle */}
                <div className="flex flex-col gap-1">
                  <h2 className="anybody-bold text-sm md:text-base uppercase tracking-wider">{subtitle}</h2>
                  <h1 className="anybody-black uppercase text-2xl md:text-xl lg:text-[30px] font-bold leading-[0.9]">{title}</h1>
                </div>

                {/* Date & Location */}
                <div className="flex flex-col gap-1 mt-2">
                  <div className="uppercase text-sm md:text-base font-bold anybody-bold flex items-center gap-2">
                    {date} <span className="text-xs">•</span> 12:00
                  </div>
                  <div className="flex flex-row gap-2 flex-wrap items-center">
                    <p className="uppercase text-sm md:text-base anybody-bold">{location}</p>
                    <span className="anybody-bold text-sm md:text-base">•</span>
                    <p className="text-sm md:text-base anybody-medium">{address}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-6 mt-4 items-center">
                  <div className="border border-black border-dashed px-4 py-2 anybody-bold text-xs md:text-sm uppercase tracking-wider text-gray-400">
                    PRIJAVE ZATVORENE
                  </div>
                  <button className="anybody-bold text-xs md:text-sm uppercase tracking-wider hover:underline">
                    KOPIRANO!
                  </button>
                </div>

                {/* Extra Info (Capacity/Equipment) */}
                {(capacity || equipment) && (
                  <div className="flex flex-col gap-1 mt-4">
                    {capacity && (
                      <div className="flex flex-row gap-1 items-baseline">
                        <div className="anybody-bold text-sm uppercase">Kapacitet:</div>
                        <div className="text-sm anybody-medium">{capacity.replace(' OSOBA', '')}</div>
                      </div>
                    )}
                    {equipment && (
                      <div className="flex flex-row gap-1 items-baseline">
                        <div className="anybody-bold text-sm uppercase">Oprema:</div>
                        <div className="uppercase text-sm anybody-medium">{equipment}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description & Bio */}
              <div className="flex flex-col gap-8 w-full mt-2">
                <p className="anybody-medium text-base leading-relaxed whitespace-pre-line text-justify md:text-left">
                  {description}
                </p>
                <div className="flex flex-col gap-1 pt-4">
                  <h3 className="anybody-bold text-xs uppercase tracking-wider mb-1">{subtitle}</h3>
                  <p className="text-xs anybody-medium whitespace-pre-line leading-relaxed text-justify md:text-left">
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                    {biography}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

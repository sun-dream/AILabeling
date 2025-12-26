import React from 'react';

const SectionDivider = ({ imageSrc, bgColor, position = "top", className = "" }) => {
  return (
    <div className={`relative w-full z-20 pointer-events-none ${className}`}>
      <picture>
        <img 
          src={imageSrc} 
          alt="Torn Paper Edge" 
          className="w-full h-auto object-cover block"
          style={{ marginBottom: "-1px", marginTop: "-1px" }} // Fix potential sub-pixel gaps
        />
      </picture>
    </div>
  );
};

export default SectionDivider;

import React from 'react';

const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-neonLime py-4">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="text-black text-[64px] lg:text-[116px] font-black uppercase mx-8 leading-none">
            10. DA!
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

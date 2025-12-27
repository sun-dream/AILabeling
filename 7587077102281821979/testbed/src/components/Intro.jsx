import React from 'react';

const Intro = () => {
  return (
    <section id="intro" className="py-20 flex flex-col items-center justify-center gap-8 lg:gap-16 my-16 px-4">
      <div className="flex flex-col gap-6 items-center justify-center text-center">
        <h2 className="text-[44px] lg:text-[80px] font-black uppercase tracking-tighter leading-none max-w-xs lg:max-w-none">
          Studenti za studente
        </h2>
        <div className="text-base lg:text-2xl font-medium uppercase leading-relaxed max-w-sm lg:max-w-[900px] tracking-wide">
          DA! je festival kojeg organiziraju studenti za studente, a s ciljem prezentiranja vještina studenata kroz radove, njihove afirmacije u javnosti, stvaranja međusobnih poznanstava u interdisciplinarnom okruženju te uvida u aktualne teme iz relevantnih područja.
        </div>
      </div>
      
      <a 
        href="https://www.example.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="prijavi-button relative inline-block text-[24px] lg:text-[32px] font-bold uppercase px-[30px] pt-[45px] pb-[37px] leading-none text-black transition-all hover:scale-105"
        style={{
          backgroundImage: 'url(https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-button-bg.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundImage = 'url(https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-hover.png)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage = 'url(https://da-festival.hr/wp-content/themes/da2025/assets/prijavi-button-bg.png)';
        }}
      >
        Pogledaj izlozbu
      </a>
    </section>
  );
};

export default Intro;

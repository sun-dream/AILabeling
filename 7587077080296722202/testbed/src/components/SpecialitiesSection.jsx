import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

const SpecialitiesSection = () => {
  const bgUrl = 'http://balzac.it/wp-content/uploads/2021/10/Sole-Arancio.png';
  const overlayUrl = 'http://balzac.it/wp-content/uploads/2021/10/Texture.png';
  const yellowCircleUrl = 'http://balzac.it/wp-content/uploads/2021/10/Sole-Giallo.png';
  const groupUrl = 'http://balzac.it/wp-content/uploads/2021/10/gruppo.jpg';
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const nodes = entry.target.querySelectorAll('.reveal-up');
          nodes.forEach((node, i) => {
            setTimeout(() => {
              node.classList.add('slide-in-up-damped');
              node.classList.remove('opacity-0', 'translate-y-8');
            }, 120 * i);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    [sec1Ref.current, sec2Ref.current, sec3Ref.current].forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section ref={sec1Ref} className="group relative min-h-[40vh] md:min-h-[55vh] w-full overflow-hidden bg-[#FFC629]">
      {/* texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${overlayUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          opacity: 0.2,
          mixBlendMode: 'multiply',
          transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
          backgroundAttachment: 'scroll',
          zIndex: 1
        }}
      />

      {/* orange circle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:scale-105 group-hover:opacity-90"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0% center',
          backgroundSize: 'contain',
          width: '50vw',
          height: '50vw',
          maxWidth: '500px',
          maxHeight: '500px',
          willChange: 'transform',
          zIndex: 0
        }}
      />

      {/* content */}
      <div className="relative z-10 container mx-auto max-w-[1140px] px-6 md:px-12 py-14 md:py-20">
        <div className="opacity-0 translate-y-8 reveal-up mb-4 md:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 23.2" className="w-10 h-6 md:w-12 md:h-7 fill-current text-black">
            <g>
              <g>
                <path d="M35.1,3.9H28c-3.6,0-5.4-.7-6.4-3.9h-.1c-1,3.2-2.8,3.9-6.4,3.9H7.9C1.1,3.9,0,6.7,0,13.3H1.7c0-2.8,2-3.7,5.9-3.7h6.7c4,0,6.2-.6,7.2-4.1h.1c1,3.5,3.2,4.1,7.2,4.1h6.6c3.9,0,5.9.9,5.9,3.7H43C43,6.7,41.9,3.9,35.1,3.9Z"></path>
                <path d="M21.5,16.6a3.3,3.3,0,1,0,3.4,3.3A3.35,3.35,0,0,0,21.5,16.6Z"></path>
              </g>
            </g>
          </svg>
        </div>

        <h2 className="opacity-0 translate-y-8 reveal-up font-serif font-bold text-black leading-tight  text-[clamp(2rem,6vw,4.5rem)]">
          Brand stories, storytelling, branding design, social media, web & app for start-up and all size company
        </h2>

        <div className="opacity-0 translate-y-8 reveal-up mt-6">
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:bg-[#000000] hover:text-white border border-black px-5 py-2 rounded-sm shadow-sm hover:translate-y-[1px] transition"
          >
            Discover the specialties
          </a>
        </div>
      </div>
    </section>
    <section ref={sec2Ref} className="group md:my-[50px] my-[20px] relative min-h-[40vh] md:min-h-[55vh] w-full overflow-hidden" style={{ backgroundColor: '#B5E495' }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${overlayUrl})`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'left top',
          backgroundSize: 'auto',
          opacity: 0.2,
          mixBlendMode: 'multiply',
          transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
          backgroundAttachment: 'scroll',
          zIndex: 1
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[-30vw] pointer-events-none transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:scale-[1.03] group-hover:opacity-95"
        style={{
          backgroundImage: `url(${yellowCircleUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'contain',
          width: '110vw',
          height: '110vw',
          maxWidth: '1400px',
          maxHeight: '1400px',
          willChange: 'transform',
          zIndex: 0
        }}
      />
      <div className="relative z-10 container mx-auto max-w-[1140px] px-6 md:px-12 py-14 md:py-20">
        <div className="opacity-0 translate-y-8 reveal-up mb-4 md:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 23.2" className="w-10 h-6 md:w-12 md:h-7 fill-current text-black">
            <g>
              <g>
                <path d="M35.1,3.9H28c-3.6,0-5.4-.7-6.4-3.9h-.1c-1,3.2-2.8,3.9-6.4,3.9H7.9C1.1,3.9,0,6.7,0,13.3H1.7c0-2.8,2-3.7,5.9-3.7h6.7c4,0,6.2-.6,7.2-4.1h.1c1,3.5,3.2,4.1,7.2,4.1h6.6c3.9,0,5.9.9,5.9,3.7H43C43,6.7,41.9,3.9,35.1,3.9Z"></path>
                <path d="M21.5,16.6a3.3,3.3,0,1,0,3.4,3.3A3.35,3.35,0,0,0,21.5,16.6Z"></path>
              </g>
            </g>
          </svg>
        </div>
        <h2 className="opacity-0 translate-y-8 reveal-up font-serif font-bold text-black leading-tight md:w-2/3 text-[clamp(2.2rem,6vw,4rem)]">Who is Balzac?</h2>
        <h3 className="opacity-0 translate-y-8 reveal-up mt-4 font-serif italic text-black text-[clamp(1.1rem,2.5vw,1.5rem)] md:w-3/4">
          Balzac is the agency specialized in brand stories. Of course, you could say: Balzac was one of humanity’s greatest storytellers. Not so obvious, we could answer, especially in these times. Today everyone produces contents. But not everyone knows how to create stories to tell.
        </h3>
        <div className="opacity-0 translate-y-8 reveal-up mt-6">
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#cfeac0] border border-black text-black px-5 py-2 rounded-sm shadow-sm hover:bg-black hover:text-white transition"
          >
            What's your story?
          </a>
        </div>
      </div>
    </section>
    <section ref={sec3Ref} className="relative min-h-[80vh] w-full overflow-hidden bg-[#E7E7E7]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${groupUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 20%',
          backgroundSize: 'cover',
          filter: 'grayscale(100%) contrast(95%) brightness(95%)',
          backgroundAttachment: 'scroll',
          transition: 'background-position 0.3s ease',
          zIndex: 0
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #000000 100%)',
          opacity: 0.1,
          mixBlendMode: 'multiply',
          transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s'
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto max-w-[1140px] px-6 md:px-12 pb-0 md:pb-0 flex justify-center items-end">
        <div className="bg-white shadow-sm px-6 md:px-12 py-10 md:py-14 w-full md:w-[75%]">
          <h2 className="opacity-0 translate-y-8 reveal-up font-serif font-bold text-black leading-tight text-[clamp(2rem,6vw,4rem)]">
            From the electric hypercar to the sunscreen for children
          </h2>
          <h3 className="opacity-0 translate-y-8 reveal-up mt-4 font-serif text-black text-[clamp(1.6rem,3vw,3rem)]">
            Selected works by Balzac: little stories to read in a blink of eye
          </h3>
          <div className="opacity-0 translate-y-8 reveal-up mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-black text-black px-5 py-2 rounded-sm shadow-sm hover:bg-black hover:text-white transition"
            >
              Let's read?
            </a>
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black px-5 py-2 hover:-translate-x-[2px] transition"
            >
              <ArrowLeft size={18} />
              Discover the complete works
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default SpecialitiesSection;

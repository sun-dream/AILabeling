import React, { useEffect, useRef } from 'react';

const Contact = () => {
  const orangeCircleUrl = 'http://balzac.it/wp-content/uploads/2021/10/Sole-Arancio.png';
  const yellowCircleUrl = 'http://balzac.it/wp-content/uploads/2021/10/Sole-Giallo.png';
  const textureUrl = 'http://balzac.it/wp-content/uploads/2021/10/Texture.png';

  const redRef = useRef(null);
  const redBgRef = useRef(null);
  const yellowRef = useRef(null);
  const yellowBgRef = useRef(null);

  useEffect(() => {
    const el = redRef.current;
    const bg = redBgRef.current;
    if (!el || !bg) return;
    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * 20;
      targetY = ny * 15;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          bg.style.transform = `translate(${targetX}px, ${targetY}px)`;
          rafId = null;
        });
      }
    };
    const onEnter = () => {
      bg.style.transition = 'transform 80ms linear';
    };
    const onLeave = () => {
      bg.style.transition = 'transform 300ms ease';
      bg.style.transform = 'translate(0px, 0px)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const el = yellowRef.current;
    const bg = yellowBgRef.current;
    if (!el || !bg) return;
    let rafId = null;
    let tx = 0;
    let ty = 0;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      tx = nx * 16;
      ty = ny * 12;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          bg.style.transform = `translate(${tx}px, ${ty}px)`;
          rafId = null;
        });
      }
    };
    const onEnter = () => {
      bg.style.transition = 'transform 80ms linear';
      const items = el.querySelectorAll('.y-anim');
      items.forEach((node, i) => {
        setTimeout(() => {
          node.classList.remove('opacity-0', 'translate-y-4');
          node.classList.add('opacity-100', 'translate-y-0');
        }, 120 * i);
      });
    };
    const onLeave = () => {
      bg.style.transition = 'transform 300ms ease';
      bg.style.transform = 'translate(0px, 0px)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <section ref={redRef} className="group relative md:mb-[50px] mb-[20px] min-h-[40vh] md:min-h-[55vh] w-full overflow-hidden" style={{ backgroundColor: '#CF0000' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${textureUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.2,
            mixBlendMode: 'multiply',
            transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
            zIndex: 1
          }}
        />
        <div
          ref={redBgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${orangeCircleUrl})`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center center',
            backgroundSize: '12% auto',
            backgroundAttachment: 'scroll',
            willChange: 'transform',
            transition: 'transform 300ms ease',
            zIndex: 0
          }}
        />
        <div className="relative z-20 container max-w-[1080px] mx-auto flex items-end px-6 md:px-12 flex justify-center">
          <div className="bg-white w-full px-6 md:px-12 py-10 md:py-14">
            <div className="mb-4 md:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 23.2" className="w-10 h-6 md:w-12 md:h-7 fill-current text-black">
                <g>
                  <g>
                    <path d="M35.1,3.9H28c-3.6,0-5.4-.7-6.4-3.9h-.1c-1,3.2-2.8,3.9-6.4,3.9H7.9C1.1,3.9,0,6.7,0,13.3H1.7c0-2.8,2-3.7,5.9-3.7h6.7c4,0,6.2-.6,7.2-4.1h.1c1,3.5,3.2,4.1,7.2,4.1h6.6c3.9,0,5.9.9,5.9,3.7H43C43,6.7,41.9,3.9,35.1,3.9Z"></path>
                    <path d="M21.5,16.6a3.3,3.3,0,1,0,3.4,3.3A3.35,3.35,0,0,0,21.5,16.6Z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <h2 className="font-serif font-bold text-black leading-tight text-[clamp(3rem,7vw,4rem)]">What experience does Balzac have?</h2>
            <h3 className="mt-4 font-serif text-black text-[clamp(2rem,3vw,1.5rem)]">
              Ugo de Balzac, born in ’63, has been working in communication since 1989. Gaetano de Balzac, born in 1977, since 1999. Together they have produced a thousand and one works for clients such as Barilla, Sant’Anna, Italdesign, Pininfarina, Ferrero, Indesit, Zambon, Agnesi, just to name a few. In '20 Bruno arrives, he is a reputation management and media relations expert. That's all, the team is complete.
            </h3>
            <div className="mt-6">
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-black px-5 py-2 rounded-sm shadow-sm hover:bg-black hover:text-white transition"
              >
                Three bio to memorize
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={yellowRef} className="bg-[#00809D] group relative min-h-[40vh] md:min-h-[55vh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${textureUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.2,
            mixBlendMode: 'multiply',
            transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s',
            zIndex: 1
          }}
        />
        <div
          ref={yellowBgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${yellowCircleUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top right',
            backgroundSize: 'cover',
            willChange: 'transform',
            transition: 'transform 300ms ease',
            zIndex: 0
          }}
        />
        <div className="relative z-20 container max-w-[1080px] mx-auto flex items-end px-6 md:px-12 flex justify-center">  
          <div className="bg-white w-full px-6 md:px-12 py-10 md:py-14 min-h-[90vh] ">
            <div className="mb-4 md:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 23.2" className="w-10 h-6 md:w-12 md:h-7 fill-current text-black">
                <g>
                  <g>
                    <path d="M35.1,3.9H28c-3.6,0-5.4-.7-6.4-3.9h-.1c-1,3.2-2.8,3.9-6.4,3.9H7.9C1.1,3.9,0,6.7,0,13.3H1.7c0-2.8,2-3.7,5.9-3.7h6.7c4,0,6.2-.6,7.2-4.1h.1c1,3.5,3.2,4.1,7.2,4.1h6.6c3.9,0,5.9.9,5.9,3.7H43C43,6.7,41.9,3.9,35.1,3.9Z"></path>
                    <path d="M21.5,16.6a3.3,3.3,0,1,0,3.4,3.3A3.35,3.35,0,0,0,21.5,16.6Z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <h2 className="y-anim opacity-0 translate-y-4 transition-all duration-700 ease-out font-serif font-bold text-black leading-tight text-[clamp(3rem,7vw,4rem)]">Where is Balzac?</h2>
            <h3 className="y-anim opacity-0 translate-y-4 transition-all duration-700 ease-out mt-4 font-serif text-black text-[clamp(2.3rem,3.3vw,1.8rem)]">
              Balzac is in the centre of Turin in via Valfrè 14, between corso Galileo Ferraris and corso Vinzaglio. To find the door bell (and door) you just need to know that they are located just behind the “Cittadella of Pietro Micca”, behind the Carabinieri Cernaia station. To follow the navigator or Google maps is more simple.
            </h3>
            <div className="mt-6">
              <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="y-anim opacity-0 translate-y-4 transition-all duration-700 ease-out inline-block border border-black px-5 py-2 rounded-sm shadow-sm hover:bg-black hover:text-white transition"
              >
                How to get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

import React, { useEffect, useRef } from 'react';

const works = [
  {
    title: 'Aixam Mega',
    desc: 'Your style, everywhere.',
    image: 'https://balzac.it/wp-content/uploads/2025/09/feature_campagna_2025_01.webp',
    href: 'https://www.example.com'
  },
  {
    title: 'Aixam Mega',
    desc: 'Since 1983 the future of minicars',
    image: 'https://balzac.it/wp-content/uploads/2024/07/Aixam-Step-Hero.jpg',
    href: 'https://www.example.com'
  },
  {
    title: 'Vol.To Volontariato Torino ETS',
    desc: 'A film of numbers, of people, of stories',
    image: 'https://balzac.it/wp-content/uploads/2024/07/Film-VolTo-Hero.webp',
    href: 'https://www.example.com'
  },
  {
    title: 'NanoFabNet',
    desc: 'The big big hub for nano nano technologies',
    image: 'https://balzac.it/wp-content/uploads/2022/12/Fondo-NanoFabNet.jpg',
    href: 'https://www.example.com'
  },
  {
    title: 'Zeca',
    desc: 'It enlightens you of immense',
    image: 'https://balzac.it/wp-content/uploads/2022/01/Ledalux-01.jpg',
    href: 'https://www.example.com'
  }
];

const Tile = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block w-full h-full overflow-hidden"
  >
    <div
      className="absolute inset-0 transform transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }}
    />
    <div className="absolute inset-0 bg-transparent transition-colors duration-500 group-hover:bg-black/65" />
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
      <h6 className="text-sm md:text-base">{item.title}</h6>
      <div className="mt-2 text-xl md:text-3xl font-medium leading-tight">{item.desc}</div>
      <div className="mt-4">
        <span className="inline-block border border-white px-4 py-2 text-sm md:text-base hover:bg-white hover:text-black transition">
          Take a look
        </span>
      </div>
    </div>
  </a>
);

const About = () => {
  const aboutRef = useRef(null);
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={aboutRef} id="about" className="relative w-full overflow-hidden">
      <div className="bg-gray-200 mx-auto px-6 md:px-12 py-10">
        <h2 className="opacity-0 translate-y-8 reveal-up text-center font-serif font-bold text-[clamp(3rem,7vw,4rem)] text-black">
          Five (randomly) selected works
        </h2>
      </div>

      <div className="mx-auto w-full px-0 md:px-0 pb-8 md:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-0 md:gap-0">
          <div className="col-span-1 md:col-span-5 md:col-start-1 md:row-start-1 md:row-span-2 h-[180px] md:h-[600px]">
            <Tile item={works[0]} />
          </div>
          <div className="col-span-1 md:col-span-4 md:col-start-6 md:row-start-1 h-[180px] md:h-[300px]">
            <Tile item={works[1]} />
          </div>
          <div className="col-span-2 md:col-span-3 md:col-start-10 md:row-start-1 h-[180px] md:h-[300px]">
            <Tile item={works[2]} />
          </div>

          <div className="col-span-2 md:col-span-4 md:col-start-6 md:row-start-2 h-[180px] md:h-[300px]">
            <Tile item={works[3]} />
          </div>
          <div className="col-span-2 md:col-span-3 md:col-start-10 md:row-start-2 h-[180px] md:h-[300px]">
            <Tile item={works[4]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

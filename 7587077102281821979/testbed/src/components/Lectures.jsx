import React, { useState } from 'react';
import EventModal from './EventModal';

const Lectures = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: clear selected event after animation
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const lectures = [
    {
      id: 769,
      title: "Organizirano Oblikovanje",
      subtitle: "Oblikovanje naše prakse",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/organiziranoobl.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/orgobl-white.png",
      date: "PETAK 24.1.",
      location: "PREDAVAONICA 317",
      address: "ARHITEKTONSKI FAKULTET",
      description: "Kako organizirati kreativni proces? Kako strukturirati kaos ideja u konkretan dizajnerski proizvod? Ovo predavanje bavi se metodologijama rada u dizajnu, od koncepta do realizacije.",
      biographyTitle: "O PREDAVAČIMA",
      biography: "Organizirano oblikovanje je dizajnerski kolektiv koji se fokusira na društveno odgovoran dizajn i edukaciju."
    },
    {
      id: 1085,
      title: "Ivan Veljača",
      subtitle: "Scenografija – način razmišljanja",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-papirici-1.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/ivan-veljaca-white-1.png",
      date: "SUBOTA 25.1.",
      location: "VELIKA PREDAVAONICA",
      address: "ARHITEKTONSKI FAKULTET",
      description: "Ivan Veljača govori o scenografiji ne samo kao o uređenju prostora, već kao o načinu razmišljanja i pripovijedanja kroz prostor.",
      biographyTitle: "O PREDAVAČU",
      biography: "Ivan Veljača je renomirani scenograf i dizajner interijera s bogatim iskustvom u filmskoj i kazališnoj industriji."
    },
    {
      id: 985,
      title: "high on type",
      subtitle: "Writing together",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-papirici.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/high-on-type-white.png",
      date: "SUBOTA 25.1.",
      location: "STUDIO 1",
      address: "ARHITEKTONSKI FAKULTET",
      description: "Interaktivno predavanje o tipografiji, pismu i zajedničkom stvaranju. Istražujemo granice čitljivosti i ekspresivnosti slova.",
      biographyTitle: "O KOLEKTIVU",
      biography: "High on Type je kolektiv posvećen promociji tipografije i kaligrafije kroz radionice, festivale i izložbe."
    },
    {
      id: 789,
      title: "Matej Merlić & Maja Merlić Ilić",
      subtitle: "Moderna vremena",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/modvremena-papiric.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/modernavrwhitte.png",
      date: "NEDJELJA 26.1.",
      location: "PREDAVAONICA 221",
      address: "ARHITEKTONSKI FAKULTET",
      description: "Razgovor o suvremenim izazovima u arhitekturi i dizajnu, te kako se prilagoditi brzim promjenama u industriji.",
      biographyTitle: "O PREDAVAČIMA",
      biography: "Matej i Maja su arhitekti s višegodišnjim iskustvom u projektiranju stambenih i poslovnih objekata."
    }
  ];

  const workshops = [
    {
      id: 332,
      title: "Klasja Habjan",
      subtitle: "Ilustracije, priče i pokvareni telefon",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/klasja-papirici.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/klasja-white.png",
      date: "PETAK 24.1.",
      location: "UČIONICA 3",
      address: "FRANKOPANSKA 12",
      description: "Radionica ilustracije i vizualnog pripovijedanja. Polaznici će istraživati narativne tehnike kroz crtež i kolaž.",
      biographyTitle: "O VODITELJICI",
      biography: "Klasja Habjan je ilustratorica i grafička dizajnerica, poznata po svom jedinstvenom vizualnom jeziku.",
      capacity: "15 OSOBA",
      equipment: "PRIBOR ZA CRTANJE, LAPTOP",
      registrationLink: "https://example.com/apply"
    },
    {
      id: 888,
      title: "Büro Bietenhader Moroder",
      subtitle: "Dumb Emancipatory Architecture",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/dea-papirici_bg.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/dea-white.png",
      date: "SUBOTA 25.1.",
      location: "STUDIO 2",
      address: "ARHITEKTONSKI FAKULTET",
      description: "Istraživanje 'glupe' arhitekture kao emancipatornog alata. Kako jednostavna rješenja mogu riješiti složene probleme?",
      biographyTitle: "O VODITELJIMA",
      biography: "Švicarski arhitektonski duo fokusiran na eksperimentalnu arhitekturu i teoriju.",
      capacity: "20 OSOBA",
      equipment: "LAPTOP"
    },
    {
      id: 961,
      title: "Appear Offline",
      subtitle: "Print, scan, repeat.",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/appear-papirici.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/appear-white.png",
      date: "NEDJELJA 26.1.",
      location: "TISKARA",
      address: "FRANKOPANSKA 12",
      description: "Radionica analogno-digitalnog tiska. Istražujemo greške u procesu skeniranja i printanja kao kreativni element.",
      biographyTitle: "O KOLEKTIVU",
      biography: "Appear Offline je dizajnerski studio specijaliziran za eksperimentalni tisak i izdavaštvo.",
      capacity: "10 OSOBA",
      equipment: "MATERIJALI OSIGURANI"
    },
    {
      id: 898,
      title: "Emil Flatz & Luka Perić",
      subtitle: "Dizajn i razvoj interaktivne time-tracking aplikacije",
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/pf-papiric.png",
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/pf-white-2.png",
      date: "SUBOTA 25.1.",
      location: "RAČUNALNA UČIONICA",
      address: "ARHITEKTONSKI FAKULTET",
      description: "Naučite osnove UI/UX dizajna i front-end developmenta kroz izradu jednostavne aplikacije.",
      biographyTitle: "O VODITELJIMA",
      biography: "Emil i Luka su studenti dizajna vizualnih komunikacija s iskustvom u web developmentu.",
      capacity: "12 OSOBA",
      equipment: "LAPTOP S INSTALIRANIM NODE.JS"
    }
  ];

  return (
    <>
      <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
      <section id="predavanja" className="relative w-full">
        <div>
          <picture>
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green_2x.webp" media="(min-width: 1500px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green_mobile.webp" media="(max-width: 600px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green_mobile.png" media="(max-width: 600px)" type="image/png" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green.webp" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green_2x.png" media="(min-width: 1500px)" />
            <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_green.png" alt="Paper Top Green" className="w-full h-auto object-cover" />
          </picture>
        </div>
        <div className="relative -mt-2 bg-[#C9E83B]">
          <div className="px-0 lg:px-10 pt-4 lg:pt-8 pb-[100px] lg:pb-[150px]">
            <div className="fade-in-up flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 px-4 lg:px-0">
              <h2 className="anybody-bold text-[44px] lg:text-[100px] leading-[54px] lg:leading-[120px] uppercase tracking-[-2px] lg:tracking-[-5px]">
                Predavanja
              </h2>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hidden lg:block px-4 py-2 anybody-bold text-sm md:text-base leading-6 uppercase mt-2 md:mt-0 border border-transparent hover:border-black hover:border-dashed transition-all duration-200">
                Vidi sva predavanja
              </a>
            </div>
            <div className="overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              <div className="flex lg:grid lg:grid-cols-4 lg:gap-6 pl-4 pr-0 lg:px-0">
                {lectures.map((lecture) => (
                  <div 
                    key={lecture.id} 
                    className="group min-w-[280px] w-[280px] lg:min-w-0 lg:w-full mr-4 card event-item flex-shrink-0 cursor-pointer" 
                    data-id={lecture.id}
                    onClick={() => openModal(lecture)}
                  >
                    <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper-horizontal.png" alt="Paper Edge" className="w-full h-auto object-cover paper-edge" />
                    <div className="relative -mt-2 aspect-[320/380] bg-white overflow-hidden mb-3 lg:mb-5">
                      <img src={lecture.bgImg} alt="Background" className="bg-img absolute inset-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img src={lecture.fgImg} alt="Foreground" className="foreground relative z-10 w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl lg:text-2xl leading-4 lg:leading-5 p-0 m-0 anybody-bold uppercase">
                        {lecture.title}
                      </h3>
                      <p className="text-base lg:text-lg leading-4 lg:leading-4 anybody-medium uppercase">
                        {lecture.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="w-4 flex-shrink-0 lg:hidden"></div>
              </div>
            </div>
            <div className="lg:hidden fade-in-up w-full flex items-center justify-center mt-8">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="lg:hidden block px-4 py-2 anybody-bold text-sm md:text-base leading-6 uppercase mt-2 border border-black border-dashed transition-all duration-200">
                Vidi sva predavanja
              </a>
            </div>
          </div>
        </div>
        <div>
          <picture>
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green_2x.webp" media="(min-width: 1500px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green.webp" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green_2x.png" media="(min-width: 1500px)" />
            <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_green.png" alt="Paper Bottom Green" className="-mt-2 w-full h-auto object-cover" />
          </picture>
        </div>
      </section>

      <section id="radionice" className="relative w-full mt-[-100px] lg:-mt-[180px] fhd:mt-[-250px] z-50">
        <div>
          <picture>
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange_2x.webp" media="(min-width: 1500px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_orange_top_mobile.webp" media="(max-width: 600px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_orange_top_mobile.png" media="(max-width: 600px)" type="image/png" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange.webp" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange_2x.png" media="(min-width: 1500px)" />
            <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_top_orange.png" alt="Paper Top Orange" className="w-full h-auto object-cover" />
          </picture>
        </div>
        <div className="relative -mt-2 bg-[#FE6828]">
          <div className="px-0 lg:px-10 pt-4 lg:pt-8 pb-[20px] lg:pb-[80px]">
            <div className="fade-in-up flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 px-4 lg:px-0">
              <h2 className="anybody-bold text-[44px] lg:text-[100px] leading-[54px] lg:leading-[120px] uppercase tracking-[-2px] lg:tracking-[-5px]">
                Radionice
              </h2>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="hidden lg:block px-4 py-2 anybody-bold text-sm md:text-base leading-6 uppercase mt-2 md:mt-0 border border-transparent hover:border-black hover:border-dashed transition-all duration-200">
                Vidi sve radionice
              </a>
            </div>
            <div className="overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              <div className="flex lg:grid lg:grid-cols-4 lg:gap-6 pl-4 pr-0 lg:px-0">
                {workshops.map((workshop) => (
                  <div 
                    key={workshop.id} 
                    className="group min-w-[280px] w-[280px] lg:min-w-0 lg:w-full mr-4 card event-item flex-shrink-0 cursor-pointer" 
                    data-id={workshop.id}
                    onClick={() => openModal(workshop)}
                  >
                    <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper-horizontal.png" alt="Paper Edge" className="w-full h-auto object-cover paper-edge" />
                    <div className="relative -mt-2 aspect-[320/380] bg-white overflow-hidden mb-3 lg:mb-5">
                      <img src={workshop.bgImg} alt="Background" className="bg-img absolute inset-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img src={workshop.fgImg} alt="Foreground" className="foreground relative z-10 w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl lg:text-2xl leading-6 lg:leading-5 p-0 m-0 anybody-bold uppercase">
                        {workshop.title}
                      </h3>
                      <p className="text-base lg:text-lg leading-4 lg:leading-4 anybody-medium uppercase">
                        {workshop.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="w-4 flex-shrink-0 lg:hidden"></div>
              </div>
            </div>
            <div className="lg:hidden fade-in-up w-full flex items-center justify-center mt-8">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="lg:hidden block px-4 py-2 anybody-bold text-sm md:text-base leading-6 uppercase mt-2 border border-black border-dashed transition-all duration-200">
                Vidi sve radionice
              </a>
            </div>
          </div>
        </div>
        <div>
          <picture>
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange_mobile.webp" media="(max-width: 600px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange_mobile.png" media="(max-width: 600px)" type="image/png" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange_2x.webp" media="(min-width: 1500px)" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange.webp" type="image/webp" />
            <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange_2x.png" media="(min-width: 1500px)" />
            <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_bottom_orange.png" alt="Paper Bottom Orange" className="-mt-2 w-full h-auto object-cover" />
          </picture>
        </div>
      </section>
    </>
  );
};

export default Lectures;

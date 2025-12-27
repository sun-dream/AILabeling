import React, { useState } from 'react';
import EventModal from './EventModal';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event, date) => {
    // Parse location to split into location and address if possible
    let locationName = event.location;
    let locationAddress = '';
    
    if (event.location && event.location.includes('/')) {
      const parts = event.location.split('/');
      locationName = parts[0].trim();
      locationAddress = parts.slice(1).join('/').trim();
    }

    // Enhance event object for modal
    const enhancedEvent = {
      ...event,
      subtitle: event.speaker,
      date: date, // Pass the date from the day object
      location: locationName,
      address: locationAddress,
      // Add default or placeholder data for missing fields
      bgImg: "https://da-festival.hr/wp-content/uploads/2025/03/organiziranoobl.png", // Placeholder
      fgImg: "https://da-festival.hr/wp-content/uploads/2025/03/orgobl-white.png", // Placeholder
      description: "Opis događanja " + event.title,
      biographyTitle: "O PREDAVAČU",
      biography: "Biografija predavača " + event.speaker
    };

    setSelectedEvent(enhancedEvent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const scheduleData = [
    {
      id: "tab-0",
      label: "Tjedan I. 04.-06.04.",
      days: [
        {
          date: "Subota 05.04.",
          events: [
            { time: "10:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "zapis-skica-bilježnica", speaker: "Petra Divković", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "11:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Jedan je mnogo", speaker: "Ivan Levak", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "11:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Radionica kolaža tekstilnim ostacima", speaker: "Salicula - Nika Vrbica", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "11:00", location: "Klet / Ilica 73", title: "Radionica sitotiska", speaker: "SMAK press", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "17:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Kreativni sud", speaker: "Ivan Levak", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Scenografija – način razmišljanja", speaker: "Ivan Veljača", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "19:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Kuća bez temelja", speaker: "Ines Matijević Cakić", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
          ]
        },
        {
          date: "Nedjelja 06.04.",
          events: [
            { time: "10:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Slova naslijepo", speaker: "Marko Hrastovec, Mihael Šandro", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "11:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Stickers from the future", speaker: "Crystal Clean", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "12:00", location: "Studij dizajna / Frankopanska ul. 12", title: "Print, scan, repeat.", speaker: "Appear Offline", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "17:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Kustoske prakse kolektiva KUĆĆA", speaker: "KUĆĆA", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Oblikovanje naše prakse", speaker: "Organizirano Oblikovanje", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
          ]
        }
      ]
    },
    {
      id: "tab-1",
      label: "Tjedan II. 07.-13.04.",
      days: [
        {
          date: "Ponedjeljak 07.04.",
          events: [
            { time: "18:00", location: "DAZ / Trg bana Josipa Jelačića 3/1", title: "Moderna vremena", speaker: "Matej Merlić & Maja Merlić Ilić", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        },
        {
          date: "Utorak 08.04.",
          events: [
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "DIZAJN ZA FILM", speaker: "Šesnić&Turković", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        },
        {
          date: "Srijeda 09.04.",
          events: [
            { time: "19:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Izvan nastave", speaker: "Mia Roth Čerina", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "20:30", location: "Arhitektonski fakultet / Kačićeva 26", title: "Sve što znam o Nataši", speaker: "ADU gostovanje", type: "Zabavni program", typeColor: "bg-[#3D69E4]", status: "" }
          ]
        },
        {
          date: "Četvrtak 10.04.",
          events: [
            { time: "18:00", location: "AF + ZOOM / https://us06web.zoom.us/j/88356886684", title: "My top 10 business & design failures", speaker: "Dorja Benussi", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "19:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Artist talk u razgovoru s kustosom Leopoldom Rupnikom", speaker: "Karlo Štefanek", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        },
        {
          date: "Petak 11.04.",
          events: [
            { time: "18:00", location: "DAZ / Trg bana Josipa Jelačića 3/1", title: "ALISA IZA OGLEDALA: Scenski dizajn i strategije društvenih promena", speaker: "Radivoje Dinulović", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "19:00", location: "Online / https://us06web.zoom.us/j/89967795879", title: "The Company We Keep: Designing for Community, Conversation, and Collective Creativity", speaker: "Brian Collins", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        },
        {
          date: "Subota 12.04.",
          events: [
            { time: "10:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Dizajn i razvoj interaktivne time-tracking aplikacije", speaker: "Emil Flatz & Luka Perić", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" }
          ]
        },
        {
          date: "Nedjelja 13.04.",
          events: [
            { time: "12:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Letters, Keyframes & Rhythm", speaker: "Ivan Radović", type: "Radionica", typeColor: "border-[#FF5138]", status: "Prijave zatvorene" },
            { time: "17:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Projekt kao prostorni kolaž", speaker: "Krešimir Damjanović", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "vizualna prezentacija izvođača u performativnim umjetnostima", speaker: "Ira Rumora", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "19:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "When things go sour — Kreativna direkcija BoogieLaba", speaker: "Karlo Jelić", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        }
      ]
    },
    {
      id: "tab-2",
      label: "Tjedan III. 14.-18.04.",
      days: [
        {
          date: "Ponedjeljak 14.04.",
          events: [
            { time: "17:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Zajednica i prostor", speaker: "društvo i prostor & prostorne taktike", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Utopije – ili kako pričati i razmišljati o prostoru", speaker: "Jana Čulek", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" },
            { time: "19:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "SKROZ (ARHITEKTURA) ZA ŽIVOTINJE", speaker: "SKROZ", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        },
        {
          date: "Utorak 15.04.",
          events: [
            { time: "17:30", location: "DAZ / Trg bana Josipa Jelačića 3/1", title: "Umjetna inteligencija u dizajnu, zakonima i kulturi", speaker: "CroAi", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        },
        {
          date: "Srijeda 16.04.",
          events: [
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Kako nastaje nakit? Brza moda nasuprot održivom stvaranju", speaker: "Margita Bralić - Smola Čovječe", type: "Predavanje", typeColor: "bg-[#C8E44D]", status: "" }
          ]
        }
      ]
    }
  ];

  return (
    <>
      <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
      <div className="relative w-full z-10 -mt-[70px] lg:-mt-[200px] fhd:-mt-[350px]">
      {/* Top Yellow Paper */}
      <div className="yellow-paper-top">
        <picture>
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top_2x.webp" media="(min-width: 1500px)" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top.webp" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top_2x.png" media="(min-width: 1500px)" />
          <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top.png" alt="Paper Top Yellow" className="w-full h-auto object-cover" />
        </picture>
      </div>

      {/* Main Yellow Content Area */}
      <div className="relative -mt-2 bg-[#FFCE00] pb-[10px] lg:pb-0 -mb-[4px]">
        <div className="px-4 lg:px-10 pt-8 lg:pt-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h2 className="anybody-bold text-[44px] lg:text-[100px] uppercase tracking-[-2px] lg:tracking-[-5px] mb-1 lg:mb-0">
              Raspored
            </h2>
            
            {/* Desktop Tabs */}
            <div className="hidden lg:flex lg:gap-2 lg:justify-end">
              {scheduleData.map((tab, index) => (
                <button
                  key={index}
                  className={`cursor-pointer tab-btn anybody-medium text-base leading-5 px-4 py-2 uppercase tracking-wide transition flex-shrink-0 border ${activeTab === index ? 'anybody-bold border-dashed border-[#808080]' : 'border-transparent'}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden w-full overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 pb-2 pl-4 w-max">
            {scheduleData.map((tab, index) => (
              <button
                key={index}
                className={`cursor-pointer tab-btn anybody-medium text-base leading-5 px-4 py-2 uppercase tracking-wide transition flex-shrink-0 border ${activeTab === index ? 'anybody-bold border-dashed border-[#808080]' : 'border-transparent'}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            ))}
            <div className="w-4 flex-shrink-0"></div>
          </div>
        </div>
      </div>

      {/* Bottom Yellow Paper */}
      <div>
        <picture>
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom_2x.webp" media="(min-width: 1500px)" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom.webp" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom_mobile.webp" media="(max-width: 600px)" type="image/webp" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom_mobile.png" media="(max-width: 600px)" type="image/png" />
          <source srcSet="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom_2x.png" media="(min-width: 1500px)" />
          <img src="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom.png" alt="Paper Bottom Yellow" className="w-full lg:-mt-[16px] h-auto object-cover" />
        </picture>
      </div>

      {/* Schedule Content */}
      <section id="raspored" className="relative mb-[180px]">
        <div className="w-full px-4 lg:px-10 mt-[50px] lg:mt-[100px]">
          {scheduleData.map((week, index) => (
            <div key={index} className={`${activeTab === index ? 'block' : 'hidden'}`}>
              {week.days.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h2 
                    className="text-lg uppercase anybody-bold pb-5 border-b"
                    style={{
                      borderBottomStyle: 'dashed',
                      borderBottomWidth: '1px',
                      borderBottomColor: '#808080',
                      borderImage: 'repeating-linear-gradient(to right, #808080 0, #808080 3px, transparent 3px, transparent 6px) 1'
                    }}
                  >
                    {day.date}
                  </h2>
                  
                  {day.events.map((event, eventIndex) => (
                    <div 
                      key={eventIndex}
                      className="w-full flex flex-col lg:grid grid-cols-12 gap-6 items-start pt-10 pb-5 lg:py-5 cursor-pointer event-item group hover:bg-gray-50 transition-colors"
                      onClick={() => openModal(event, day.date)}
                      style={{
                        borderBottomStyle: 'dashed',
                        borderBottomWidth: '1px',
                        borderBottomColor: '#808080',
                        borderImage: 'repeating-linear-gradient(to right, #808080 0, #808080 3px, transparent 3px, transparent 6px) 1'
                      }}
                    >
                      <div className="col-span-3 flex flex-col gap-0 lg:gap-0">
                        <span className="anybody-bold text-base lg:text-lg leading-6">{event.time}</span>
                        <span className="anybody-medium text-sm text-[#808080] lg:text-black leading-6">
                          {event.location}
                        </span>
                      </div>
                      
                      <div className="col-span-6 flex flex-col gap-0">
                        <span className="order-2 lg:order-1 anybody-bold text-xl lg:text-lg uppercase leading-6">{event.title}</span>
                        <span className="order-1 lg:order-2 anybody-medium text-base lg:text-lg uppercase leading-6">
                          {event.speaker}
                        </span>
                      </div>
                      
                      <div className="col-span-3 flex flex-col gap-5 lg:gap-2 lg:flex-row justify-between lg:items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <span className={`w-2 h-2 rounded-full ${event.typeColor.includes('bg-') ? event.typeColor : `border ${event.typeColor}`}`}></span>
                          <span className="anybody-medium text-base lg:text-lg leading-6 uppercase">
                            {event.type}
                          </span>
                        </div>
                        {event.status && (
                          <span className="anybody-medium text-[#808080]">{event.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mb-6"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
};

export default Schedule;

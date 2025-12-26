import React, { useState } from 'react';
import SectionDivider from '../common/SectionDivider';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState(0);

  const scheduleData = [
    {
      title: "Tjedan I. 04.-06.04.",
      days: [
        {
          date: "Subota 05.04.",
          events: [
            { time: "10:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "zapis-skica-bilježnica", author: "Petra Divković", type: "Radionica", status: "Prijave zatvorene" },
            { time: "11:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Jedan je mnogo", author: "Ivan Levak", type: "Radionica", status: "Prijave zatvorene" },
            { time: "17:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Kreativni sud", author: "Ivan Levak", type: "Predavanje", status: "" },
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Scenografija – način razmišljanja", author: "Ivan Veljača", type: "Predavanje", status: "" },
          ]
        },
        {
          date: "Nedjelja 06.04.",
          events: [
            { time: "10:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Slova naslijepo", author: "Marko Hrastovec, Mihael Šandro", type: "Radionica", status: "Prijave zatvorene" },
            { time: "18:00", location: "Arhitektonski fakultet / Kačićeva 26", title: "Oblikovanje naše prakse", author: "Organizirano Oblikovanje", type: "Predavanje", status: "" },
          ]
        }
      ]
    },
    {
      title: "Tjedan II. 07.-13.04.",
      days: [
        {
          date: "Ponedjeljak 07.04.",
          events: [
            { time: "18:00", location: "DAZ / Trg bana Josipa Jelačića 3/1", title: "Moderna vremena", author: "Matej Merlić & Maja Merlić Ilić", type: "Predavanje", status: "" }
          ]
        }
      ]
    },
    {
      title: "Tjedan III. 14.-18.04.",
      days: [
        {
          date: "Četvrtak 17.04.",
          events: [
            { time: "18:00", location: "Online", title: "Writing together", author: "high on type", type: "Predavanje", status: "" }
          ]
        }
      ]
    }
  ];

  return (
    <section id="raspored" className="relative w-full -mt-20 lg:-mt-40 z-20">
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_top.png" 
      />
      
      <div className="relative bg-[#FFCE00] pb-20 -mt-1">
        <div className="container mx-auto px-4 pt-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <h2 className="text-[44px] lg:text-[100px] font-black uppercase leading-none tracking-tighter mb-4 lg:mb-0">
              Raspored
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {scheduleData.map((week, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-base lg:text-lg uppercase transition-all border ${
                    activeTab === index 
                      ? 'font-black border-black border-dashed' 
                      : 'font-medium border-transparent hover:border-black hover:border-dashed'
                  }`}
                >
                  {week.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            {scheduleData[activeTab].days.map((day, dIndex) => (
              <div key={dIndex} className="mb-12">
                <h3 className="text-xl font-black uppercase pb-4 border-b border-black border-dashed mb-6">
                  {day.date}
                </h3>
                
                <div className="flex flex-col gap-0">
                  {day.events.map((event, eIndex) => (
                    <div 
                      key={eIndex} 
                      className="group flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 py-6 border-b border-black border-dashed cursor-pointer hover:bg-white/30 transition-colors"
                      onClick={() => window.open('https://www.example.com', '_blank')}
                    >
                      <div className="col-span-3">
                        <div className="font-black text-lg">{event.time}</div>
                        <div className="text-sm font-medium text-black/60">{event.location}</div>
                      </div>
                      
                      <div className="col-span-6">
                        <div className="font-black text-xl uppercase mb-1">{event.title}</div>
                        <div className="font-medium uppercase">{event.author}</div>
                      </div>
                      
                      <div className="col-span-3 flex flex-col lg:flex-row justify-between items-start lg:items-center">
                        <div className="flex items-center gap-2 mb-2 lg:mb-0">
                          <span className={`w-3 h-3 rounded-full border border-black ${event.type === 'Predavanje' ? 'bg-[#C8E44D]' : 'bg-[#FF5138]'}`}></span>
                          <span className="font-medium uppercase">{event.type}</span>
                        </div>
                        {event.status && (
                          <span className="text-black/50 font-medium italic">{event.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <SectionDivider 
        imageSrc="https://da-festival.hr/wp-content/themes/da2025/assets/paper_yellow_bottom.png"
        className="-mt-1"
      />
    </section>
  );
};

export default Schedule;

import React, { useEffect, useState } from 'react';

const Schedule = () => {
  // Parallax effect on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const schedule = {
    "Tjedan I": [
      {
        date: "04.04.2025",
        events: [
          { time: "18:00", title: "ORGANIZIRANO OBLIKOVANJE", type: "predavanje" },
          { time: "20:00", title: "Otvaranje festivala", type: "događaj" }
        ]
      },
      {
        date: "05.04.2025",
        events: [
          { time: "14:00", title: "KLASJA HABJAN - Ilustratorska naracija", type: "radionica" },
          { time: "19:00", title: "Otvaračka izložba", type: "izložba" }
        ]
      }
    ],
    "Tjedan II": [
      {
        date: "10.04.2025",
        events: [
          { time: "18:30", title: "HIGH ON TYPE", type: "predavanje" },
          { time: "21:00", title: "DJ večer", type: "događaj" }
        ]
      },
      {
        date: "11.04.2025",
        events: [
          { time: "15:00", title: "DIGITAL CRAFT", type: "radionica" },
          { time: "19:00", title: "IVAN VELJAČA - Scenografske ideje", type: "predavanje" }
        ]
      }
    ],
    "Tjedan III": [
      {
        date: "15.04.2025",
        events: [
          { time: "13:00", title: "MOTION DESIGN", type: "radionica" },
          { time: "19:30", title: "DIGITAL COLLAGE", type: "predavanje" }
        ]
      },
      {
        date: "18.04.2025",
        events: [
          { time: "16:00", title: "Završna izložba", type: "izložba" },
          { time: "20:00", title: "Završni program", type: "događaj" }
        ]
      }
    ]
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "predavanje": return "bg-neonLime text-black";
      case "radionica": return "bg-vividOrange text-white";
      case "izložba": return "bg-primary text-white";
      case "događaj": return "bg-yellow-400 text-black";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="relative w-full py-20 bg-white torn-edge-top">
      {/* Background decorative text with parallax */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,20vw,15rem)] font-black text-gray-100 pointer-events-none select-none"
        style={{ 
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.05}px)`,
          zIndex: 0
        }}
      >
        RASPORED
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-center text-black mb-16 text-shadow">
          RASPORED
        </h2>

        <div className="space-y-12">
          {Object.entries(schedule).map(([week, days], weekIndex) => (
            <div key={weekIndex} className="mb-16">
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-black mb-8">{week}</h3>
              
              <div className="space-y-8">
                {days.map((day, dayIndex) => (
                  <div key={dayIndex} className="bg-white p-6 paper-shadow rounded-lg">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{day.date}</h4>
                    
                    <div className="space-y-4">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="text-vividOrange font-bold">{event.time}</div>
                            <div className={`px-4 py-1 rounded-full text-sm font-bold ${getTypeColor(event.type)}`}>
                              {event.type.toUpperCase()}
                            </div>
                          </div>
                          <div className="text-lg font-medium">{event.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
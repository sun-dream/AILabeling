import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialitiesSection from './components/SpecialitiesSection';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="md:m-[50px] m-[20px]">
        <Hero />
      </div>
      <div className="md:m-[50px] m-[20px]">
        <SpecialitiesSection />
      </div>
      <div className="md:m-[50px] m-[20px]">
        <About />
      </div>
      <div className="md:m-[50px] m-[20px]">
        <Contact />
      </div>
      <div className="md:mt-[50px] mt-[20px] ">
        <Footer />
      </div>
    </div>
  );
}

export default App;

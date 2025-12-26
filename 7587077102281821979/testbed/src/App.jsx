import React from 'react';
import Navbar from './components/common/Navbar';
import Hero from './components/sections/Hero';
import Lectures from './components/sections/Lectures';
import Workshops from './components/sections/Workshops';
import Schedule from './components/sections/Schedule';
import Footer from './components/sections/Footer';

function App() {
  return (
    <div className="App w-full overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Lectures />
        <Workshops />
        <Schedule />
      </main>
      <Footer />
    </div>
  );
}

export default App;

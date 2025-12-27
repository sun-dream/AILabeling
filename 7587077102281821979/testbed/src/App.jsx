import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Lectures from './components/Lectures';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import Izlozba from './components/Izlozba';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Intro />
      <Lectures />
      <Schedule />
      <Izlozba />
      <Footer />
    </div>
  );
}

export default App;

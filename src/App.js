import './App.css';
import Cards from './Component/Cards';
import Hero from './Component/Hero';
import Navbar from './Component/Navbar';
import data from './Component/Data';

function App() {
  const dataElement = data.map((item, index) => {
    return <Cards items=d {item} />; // Pass items directly
  });

  return (
    <div className="App">
      <Navbar />
      <Hero />
      {dataElement}
    </div>
  );
}

export default App;

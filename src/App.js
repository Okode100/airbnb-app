import './App.css';
import Cards from './Component/Cards';
import Hero from './Component/Hero';
import data from './Component/Data';

function App() {
  const dataElement = data.map((item, index) => {
    return <Cards items= {item} />; // Pass items directly
  });

  return (
    <div className="App">
      <Hero />
      {dataElement}
    </div>
  );
}

export default App;

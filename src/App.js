import React from 'react';
import './App.css';
import Cards from './Component/Cards';
import Hero from './Component/Hero';
import Navbar from './Component/Navbar'; // Import Navbar
import data from './Component/Data';

function App() {
  const dataElement = data.map((item, index) => {
    return <Cards key={item.id} items={item} />; // Pass items directly
  });

  return (
    <div className="App">
      <Navbar /> {/* Render Navbar */}
      <Hero />
      {dataElement}
    </div>
  );
}

export default App;

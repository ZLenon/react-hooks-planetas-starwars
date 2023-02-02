import React from 'react';
import Header from './Components/Header';
import TablePlanets from './Pages/TablePlanets';
import FilterProvider from './Context/FilterContext';
import PlanetProvider from './Context/PlanetsContext';

function App() {
  return (
    <main>
      <h1>STAR WARS</h1>
      <PlanetProvider>
        <FilterProvider>
          <Header />
          <TablePlanets />
        </FilterProvider>
      </PlanetProvider>
      ,
    </main>
  );
}

export default App;

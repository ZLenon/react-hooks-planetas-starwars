import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FilterProvider from './Context/FilterContext';
import PlanetProvider from './Context/PlanetsContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </PlanetProvider>,
  );

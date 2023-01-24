import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FiltersProvider from './Context/FiltersContext';
import PlanetProvider from './Context/PlanetsContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </PlanetProvider>,

  );

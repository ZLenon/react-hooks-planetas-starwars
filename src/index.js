import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetProvider from './Context/PlanetsContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetProvider>
      <App />
    </PlanetProvider>,

  );

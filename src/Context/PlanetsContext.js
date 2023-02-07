import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

function PlanetProvider({ children }) {
  const [apiReturn, setApiReturn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const URL = 'https://swapi.dev/api/planets/';
    const response = await fetch(URL);
    const data = await response.json();
    const dataResults = data.results;
    delete dataResults.residents;
    setApiReturn(dataResults);

    setIsLoading(false);
  };

  const dataPlanets = useMemo(() => (
    {
      isLoading,
      apiReturn,
      fetchData,
    }), [isLoading, apiReturn]);

  return (
    <PlanetsContext.Provider value={ dataPlanets }>
      { children }
    </PlanetsContext.Provider>
  );
}
PlanetProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetProvider;

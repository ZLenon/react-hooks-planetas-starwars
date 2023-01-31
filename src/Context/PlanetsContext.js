import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

function PlanetProvider({ children }) {
  const [apiReturn, setApiReturn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const URL = 'https://swapi.dev/api/planets/';
      const response = await fetch(URL);
      const data = await response.json();
      const dataResults = data.results;
      delete dataResults.residents;
      setApiReturn(dataResults);
    } catch (error) {
      setError(error.mensage);
    } finally {
      setIsLoading(false);
    }
  };

  const dataPlanets = useMemo(() => (
    {
      isLoading,
      apiReturn,
      erro,
      fetchData,
    }), [isLoading, apiReturn, erro]);

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

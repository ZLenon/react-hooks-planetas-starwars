import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from './PlanetsContext';

export const FiltersContext = createContext();

function FiltersProvider({ children }) {
  const { apiReturn } = useContext(PlanetsContext);
  const [planetsInfo, setPlanetsInfo] = useState({ namePlanet: '' });
  const [filterGlobal, setFilterGlobal] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setPlanetsInfo({
      ...planetsInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    setFilterGlobal(
      apiReturn.filter((data) => data.name.toLowerCase()
        .includes(planetsInfo.namePlanet.toLowerCase())),
    );
  }, [planetsInfo]);

  const logicFilters = useMemo(() => (
    {
      handleChange,
      planetsInfo,
      filterGlobal,
    }), [filterGlobal, planetsInfo, apiReturn, handleChange]);

  return (
    <FiltersContext.Provider value={ logicFilters }>
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FiltersProvider;

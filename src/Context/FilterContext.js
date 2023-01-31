import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from './PlanetsContext';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const { apiReturn, fetchData } = useContext(PlanetsContext);
  const [filterGlobal, setFilterGlobal] = useState([]);
  const [planetsName, setPlanetsName] = useState({ namePlanet: '' });
  const [coluna, setColuna] = useState('population');
  const [colunas, setColunas] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [operador, setOperador] = useState('maior que');
  const [numero, setNumero] = useState(0);
  const [spanFilter, setSpanFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [orderColunm, setOrderColunm] = useState(
    { order: { column: 'population', sort: 'ASC' } },
  );

  const handleNamePlanet = ({ target: { name, value } }) => {
    setPlanetsName({
      ...planetsName,
      [name]: value,
    });
  };

  const handleFilterClick = () => {
    setIsShow(true);
    if (operador === 'maior que') {
      setFilterGlobal(
        apiReturn.filter((data) => Number(data[coluna]) > Number(numero)),
      );
      setSpanFilter([
        ...spanFilter,
        `${coluna} ${operador} ${numero}`,
      ]);
      setColunas(
        colunas.filter((col) => col !== coluna),
      );
      return;
    }
    if (operador === 'menor que') {
      setFilterGlobal(
        apiReturn.filter((data) => data[coluna] <= numero),
      );
      setSpanFilter([
        ...spanFilter,
        `${coluna} ${operador} ${numero}`,
      ]);
      setColunas(
        colunas.filter((col) => col !== coluna),
      );
      return;
    }
    if (operador === 'igual a') {
      setFilterGlobal(
        apiReturn.filter((data) => data[coluna] === numero),
      );
      setSpanFilter([
        ...spanFilter,
        `${coluna} ${operador} ${numero}`,
      ]);
      setColunas(
        colunas.filter((col) => col !== coluna),
      );
    }
  };

  useEffect(() => {
    setFilterGlobal(
      apiReturn.filter((data) => data.name.toLowerCase()
        .includes(planetsName.namePlanet.toLowerCase())),
    );
  }, [fetchData, planetsName]);

  const handleDelet = (a) => {
    setSpanFilter(
      spanFilter.filter((x, index) => index !== a),
    );
    setFilterGlobal(apiReturn.filter((x) => x === a));
    /*  setColunas(colunas.filter((x) => x === a)); */
  };

  const handleOrdenerFilter = () => {
    console.log(orderColunm);
  };

  const dataFilters = useMemo(() => (
    {
      filterGlobal,
      planetsName,
      handleNamePlanet,
      coluna,
      colunas,
      operador,
      numero,
      handleFilterClick,
      handleDelet,
      spanFilter,
      isShow,
      orderColunm,
      setColuna,
      setOperador,
      setNumero,
      setOrderColunm,
      handleOrdenerFilter,
    }), [
    filterGlobal,
    planetsName,
    coluna,
    colunas,
    operador,
    numero,
    spanFilter,
    isShow,
    orderColunm,
  ]);

  return (
    <FilterContext.Provider value={ dataFilters }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FilterProvider;

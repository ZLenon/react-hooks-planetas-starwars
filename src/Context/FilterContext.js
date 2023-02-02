import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from './PlanetsContext';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const { apiReturn, fetchData } = useContext(PlanetsContext);
  const [filterGlobal, setFilterGlobal] = useState([]);
  const [planetsName, setPlanetsName] = useState('');
  const [colunas, setColunas] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [spanFilter, setSpanFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [orderColunm, setOrderColunm] = useState(
    { order: { column: 'population', sort: 'ASC' } },
  );
  const [inputFilter, setInputFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    number: '0',
  });
  const [appliedFilters, setAppliedFilters] = useState([]);

  /* DidUpDate */
  useEffect(() => {
    setFilterGlobal(
      apiReturn.filter((data) => data.name.toLowerCase()
        .includes(planetsName.toLowerCase())),
    );
  }, [fetchData, planetsName]);

  useEffect(() => {
    setIsShow(true);
    /* Esse appliedFilters foi setado la no Header nos tres inputs principais */
    const newArrayPlanet = appliedFilters.reduce((acc, curr) => (/* Acc é igual meu array inicial, curr é os itens que estao sendo percorridos */
      acc.filter((planetsObj) => { /* ja que acc é o retorno da api setado como valor inicial se faz um filter entao planetsOBJ são cada obj planetas */
        switch (curr.comparison) { /*  */
        case 'maior que': {
          return Number(planetsObj[curr.column]) > Number(curr.number);
        }
        case 'menor que': {
          return Number(planetsObj[curr.column]) < Number(curr.number);
        }

        default: {
          return Number(planetsObj[curr.column]) === Number(curr.number);
        }
        }
      })
    ), apiReturn);/* Definindo o retorno da api como estado inicial do REDUCE */
    setFilterGlobal(newArrayPlanet); /* setando o retorno do reduce no filtro global */
  }, [appliedFilters]);/* Escutando o stado dos tres inputs iniciais */

  const handleDelet = (itens, index) => {
    setFilterGlobal((prevState) => {
      console.log(prevState);
      return [];
    });

    setSpanFilter(
      spanFilter.filter((x, indexx) => indexx !== itens),
    );
    setColunas([...colunas, index.split(' ')[0]]);
  };

  const handleOrdenerFilter = () => {
    console.log(orderColunm);
  };

  const dataFilters = useMemo(() => (
    {
      inputFilter,
      setInputFilter,
      appliedFilters,
      setAppliedFilters,
      filterGlobal,
      colunas,
      handleDelet,
      spanFilter,
      isShow,
      orderColunm,
      setPlanetsName,
      setOrderColunm,
      handleOrdenerFilter,
    }), [
    inputFilter,
    appliedFilters,
    filterGlobal,
    colunas,
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

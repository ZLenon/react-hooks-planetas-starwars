import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from './PlanetsContext';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const { apiReturn, fetchData } = useContext(PlanetsContext);
  const [filterGlobal, setFilterGlobal] = useState([]);
  const [planetsName, setPlanetsName] = useState('');
  const [firstColunas, setFirstColunas] = useState(['population', 'orbital_period',
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
  const [appliedFilters, setAppliedFilters] = useState([]);/* Filtros Aplicados */
  const [ordenedFilters, setOrdenedFilters] = useState([]);

  /* DidUpDate */
  useEffect(() => { /* Requisito 2 */
    setFilterGlobal(
      apiReturn.filter((data) => data.name.toLowerCase()
        .includes(planetsName.toLowerCase())),
    );
  }, [fetchData, planetsName]);

  useEffect(() => { /* Requisito 3 */
    /* Esse appliedFilters foi feito spread la no Header no button */
    /* inputFilter{ column: 'population', comparison: 'maior que', number: '0', } */
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
    setFilterGlobal(newArrayPlanet); /* seta o retorno do reduce no filtro global */
    setSpanFilter(
      [appliedFilters],
    );
    if (spanFilter.length === 0) {
      setIsShow(false);
    } else {
      setIsShow(true);
      const filter = firstColunas.filter((x) => x !== inputFilter.column);
      setFirstColunas(
        filter,
      );
      setInputFilter({
        column: filter[0],
        comparison: 'maior que',
        number: '0',
      });
    }
  }, [appliedFilters]);/* Escutando o stado dos tres inputs iniciais */

  const handleDelet = (itens, index) => { /* Remover Span de filtros */
    setFirstColunas([
      ...firstColunas,
    ]);
    setAppliedFilters(/* funcionando */
      appliedFilters.filter((filtros) => filtros !== itens),
    );
    console.log(itens, index, appliedFilters);
  };

  const handleOrdenerFilter = () => { /* Ordernar em ordem crescente e decrescente */
    /* orderColunm { order: { column: 'population', sort: 'ASC' } } */
    /*     if (orderColunm.sort === 'ASC') {
      filterGlobal.sort((a, b) => a - b);
    }
    if (orderColunm.sort === 'DESC') {
      filterGlobal.sort((a, b) => b - a);
    } */
  };

  const handleRemove = () => { /* Remover filtros no spam e devolver valores a dropdow coluna */
    setAppliedFilters([]);
    setFirstColunas(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
  };

  const dataFilters = useMemo(() => (
    {
      inputFilter,
      setInputFilter,
      appliedFilters,
      setAppliedFilters,
      filterGlobal,
      firstColunas,
      handleDelet,
      spanFilter,
      isShow,
      orderColunm,
      setPlanetsName,
      setOrderColunm,
      handleOrdenerFilter,
      handleRemove,
      ordenedFilters,
      setOrdenedFilters,
    }), [
    inputFilter,
    appliedFilters,
    filterGlobal,
    firstColunas,
    spanFilter,
    isShow,
    orderColunm,
    ordenedFilters,
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

import React, { useContext } from 'react';
import { FilterContext } from '../Context/FilterContext';
/* import PropTypes from 'prop-types' */

function Header() {
  const {
    inputFilter,
    setInputFilter,
    appliedFilters,
    setAppliedFilters,
    firstColunas,
    handleDelet,
    isShow,
    setPlanetsName,
    setOrderColunm,
    handleOrdenerFilter,
    handleRemove,
  } = useContext(FilterContext);

  return (
    <header>
      <p>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Nome do Planeta"
          name="namePlanet"
          onChange={ ({ target }) => setPlanetsName(target.value) }
        />
      </p>
      <p>
        Coluna:-
        <select
          data-testid="column-filter"
          name="coluna"
          value={ inputFilter.column }
          onChange={ ({ target }) => {
            setInputFilter({ ...inputFilter, column: target.value });
          } }
        >
          {firstColunas.map((colow, index) => (
            <option key={ index } value={ colow }>{ colow }</option>
          ))}
        </select>

        Operador:-
        <select
          data-testid="comparison-filter"
          name="operador"
          value={ inputFilter.comparison }
          onChange={ ({ target }) => {
            setInputFilter({ ...inputFilter, comparison: target.value });
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="numero"
          value={ inputFilter.number }
          onChange={ ({ target }) => {
            setInputFilter({ ...inputFilter, number: target.value });
          } }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setAppliedFilters([...appliedFilters, inputFilter]);
          } }
        >
          Filtrar
        </button>
      </p>
      {/* filtros do lado direito da tela */}
      <p>
        Ordenar:-
        <select
          data-testid="column-sort"
          name="ordenar"
          onChange={ ({ target: { value } }) => setOrderColunm((prevState) => (
            { order: { ...prevState.order, column: value } })) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        Ascendente:-
        <input
          type="radio"
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target: { value } }) => setOrderColunm((prevState) => (
            { order: { ...prevState.order, sort: value } })) }
        />
        Descendente:-
        <input
          type="radio"
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target: { value } }) => setOrderColunm((prevState) => (
            { order: { ...prevState.order, sort: value } })) }
        />
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleOrdenerFilter }
        >
          Ordenar
        </button>

      </p>

      {/* Span de filtros */}
      <ul>
        {isShow && appliedFilters.map((itens, index) => (
          <li
            key={ index }
            data-testid="filter"
          >
            {`${itens.column} ${itens.comparison} ${itens.number}`}
            <button
              type="button"
              id="btnDelet"
              onClick={ () => handleDelet(itens, index) }
            >
              del
            </button>
          </li>
        ))}
      </ul>

      <p>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemove }
        >
          Remover Filtragens
        </button>
      </p>
    </header>
  );
}

/* Header.propTypes = {

} */

export default Header;

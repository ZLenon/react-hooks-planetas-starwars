import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../Context/PlanetsContext';
import Loading from '../Components/Loading';

function TablePlanets() {
  const { apiReturn, fetchData, isLoading, erro } = useContext(PlanetsContext);
  const [planetsName, setPlanetsName] = useState({ namePlanet: '' });
  const [filterGlobal, setFilterGlobal] = useState([]);
  const [coluna, setColuna] = useState('population');
  const [operador, setOperador] = useState('maior que');
  const [numero, setNumero] = useState(0);

  useEffect(() => {
    const callBack = async () => {
      await fetchData();
    };
    callBack();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setPlanetsName({
      ...planetsName,
      [name]: value,
    });
  };

  const handleClick = () => {
    if (operador === 'maior que') {
      setFilterGlobal(
        apiReturn.filter((data) => Number(data[coluna]) > Number(numero)),
      );
    }
    if (operador === 'menor que') {
      setFilterGlobal(
        apiReturn.filter((data) => data[coluna] <= numero),
      );
    }
    if (operador === 'igual a') {
      setFilterGlobal(
        apiReturn.filter((data) => data[coluna] === numero),
      );
    }
  };

  useEffect(() => {
    setFilterGlobal(
      apiReturn.filter((data) => data.name.toLowerCase()
        .includes(planetsName.namePlanet.toLowerCase())),
    );
  }, [planetsName, apiReturn]);

  return (
    <>
      <p>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Nome do Planeta"
          name="namePlanet"
          value={ planetsName.namePlanet }
          onChange={ handleChange }
        />
      </p>
      <p>
        Coluna:-
        <select
          data-testid="column-filter"
          name="coluna"
          onChange={ ({ target }) => setColuna(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        Operador:-
        <select
          data-testid="comparison-filter"
          name="operador"
          onChange={ ({ target }) => setOperador(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="numero"
          value={ numero }
          onChange={ ({ target }) => setNumero(target.value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </p>

      <h1>Planetas</h1>
      {isLoading && <Loading />}
      {!!erro && <h3>erro</h3>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotation</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Watter</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {
          filterGlobal.map((data) => (
            <tbody key={ data.name }>
              <tr>
                <td>{data.name}</td>
                <td>{data.rotation_period}</td>
                <td>{data.orbital_period}</td>
                <td>{data.diameter}</td>
                <td>{data.climate}</td>
                <td>{data.gravity}</td>
                <td>{data.terrain}</td>
                <td>{data.surface_water}</td>
                <td>{data.population}</td>
                <td>{data.films}</td>
                <td>{data.created}</td>
                <td>{data.edited}</td>
                <td>{data.url}</td>
              </tr>
            </tbody>
          ))
        }
      </table>
    </>
  );
}

export default TablePlanets;

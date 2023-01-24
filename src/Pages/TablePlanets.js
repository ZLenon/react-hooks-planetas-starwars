import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../Context/PlanetsContext';
import Loading from '../Components/Loading';

function TablePlanets() {
  const { apiReturn, fetchData, isLoading, erro } = useContext(PlanetsContext);
  const [planetsInfo, setPlanetsInfo] = useState({ namePlanet: '' });
  const [filterGlobal, setFilterGlobal] = useState([]);

  useEffect(() => {
    const callBack = async () => {
      await fetchData();
    };
    callBack();
  }, []);

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
  }, [planetsInfo, apiReturn]);

  return (
    <>
      <p>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Nome do Planeta"
          name="namePlanet"
          value={ planetsInfo.namePlanet }
          onChange={ handleChange }
        />
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

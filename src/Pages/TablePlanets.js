import React, { useContext, useEffect } from 'react';
import { PlanetsContext } from '../Context/PlanetsContext';
import Loading from '../Components/Loading';
import { FilterContext } from '../Context/FilterContext';

function TablePlanets() {
  const { fetchData, isLoading } = useContext(PlanetsContext);
  const { filterGlobal } = useContext(FilterContext);

  /* DidiMount */
  useEffect(() => {
    const callBack = async () => {
      await fetchData();
    };
    callBack();
  }, []);

  return (
    <section>
      {/* Tabela */}
      <h1>Planetas</h1>
      {isLoading && <Loading />}
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
        <tbody>
          {
            filterGlobal.map((data) => (
              <tr key={ data.name }>
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
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default TablePlanets;

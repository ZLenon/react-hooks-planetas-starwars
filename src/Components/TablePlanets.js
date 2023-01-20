import React, { useContext, useEffect } from 'react';
import { PlanetsContext } from '../Context/PlanetsContext';

function TablePlanets() {
  const { apiReturn, fetchData } = useContext(PlanetsContext);

  useEffect(() => {
    const callBack = async () => {
      await fetchData();
    };
    callBack();
  }, []);
  return (
    <>
      <h1>Planetas</h1>
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
          apiReturn.map((data) => (
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

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockStarWars from '../../cypress/mocks/testData'
import FilterProvider from '../Context/FilterContext';
import PlanetProvider from '../Context/PlanetsContext';



describe('Star Wars Project', () => {
  beforeEach(() => {     
      //espia um global fetch ser resolvido 
      jest.spyOn(global, 'fetch').mockResolvedValue({
       //epera uma chave json com um função a ser resolvida 
      json: jest.fn().mockResolvedValue(MockStarWars) 
      });
     /*  global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockStarWars)
      });   */
  });
  
  test('Testando o Primeiro input', async ()=> {
    render(
      <PlanetProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </PlanetProvider>,
      ); 
    await waitFor(()=> expect(fetch).toHaveBeenCalled());

    await waitFor(()=>{
      const rowTable =  screen.getAllByRole('row');      
      expect(rowTable.length).toEqual(11)
    });

    const title = screen.getByRole('heading', {  name: /star wars/i});
    expect(title).toBeDefined();

    const inputSearch =  screen.getByRole('textbox');
    expect(inputSearch).toBeDefined();
    userEvent.type(inputSearch, 'Naboo');
    expect(inputSearch.value).toBe('Naboo');

    const cellNaboo = screen.findByRole('cell', { name: /naboo/i });
    expect(cellNaboo).toBe(cellNaboo);   
    
    const rowTable =  screen.getAllByRole('row');      
      expect(rowTable.length).toEqual(2)
  });
  test('Testando o os segundo filtro com filtro maior', async ()=> {
    render(
      <PlanetProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </PlanetProvider>,
      );
    await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(1));
    
    await waitFor(()=>{
      const rowTable =  screen.getAllByRole('row');      
      expect(rowTable.length).toEqual(11)
    });
    /* screen.debug(); mostra o que foi achado na tela para quando o test nao mostra nada */

    const inputColuna = screen.getByTestId('column-filter');
    userEvent.selectOptions(inputColuna, inputColuna[0]);// pega a posição do select

    const inputOrder = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(inputOrder, inputOrder[0]);

    const inputNumber = screen.getByTestId('value-filter');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '2000000000');

    const btnFiltrar = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btnFiltrar);

    const rowTable =  screen.getAllByRole('row');    
    expect(rowTable.length).toEqual(3);

    const spanFilter = screen.getByRole('listitem');
    expect(spanFilter).toBeDefined();

    const spanButton = screen.getByRole('button', { name: /del/i });
    expect(spanButton.id).toBe('btnDelet');
    userEvent.click(spanButton);

  });
  test('Testando o os segundo filtro com filtro menor', async ()=> {
    render(
      <PlanetProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </PlanetProvider>,
      );
    await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(1));
    
    await waitFor(()=>{
      const rowTable =  screen.getAllByRole('row');      
      expect(rowTable.length).toEqual(11)
    });

    const inputColuna = screen.getByTestId('column-filter');
    userEvent.selectOptions(inputColuna, inputColuna[1]);

    const inputOrder = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(inputOrder, inputOrder[1]);

    const inputNumber = screen.getByTestId('value-filter');
    userEvent.clear(inputNumber);
    userEvent.type(inputNumber, '305');

    const btnFiltrar = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btnFiltrar);

    const rowTable =  screen.getAllByRole('row');    
    expect(rowTable.length).toEqual(2);
});
test('Testando o os segundo filtro com filtro igual', async ()=> {
  render(
    <PlanetProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </PlanetProvider>,
    );
  await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(1));
  
  await waitFor(()=>{
    const rowTable =  screen.getAllByRole('row');      
    expect(rowTable.length).toEqual(11)
  });
  
  const inputColuna = screen.getByTestId('column-filter');
  userEvent.selectOptions(inputColuna, inputColuna[2]);

  const inputOrder = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(inputOrder, inputOrder[2]);

  const inputNumber = screen.getByTestId('value-filter');
  userEvent.clear(inputNumber);
  userEvent.type(inputNumber, '12120');

  const btnFiltrar = screen.getByRole('button', { name: /filtrar/i });
  userEvent.click(btnFiltrar);

  const rowTable =  screen.getAllByRole('row');    
  expect(rowTable.length).toEqual(2);
});
  test('Testando o os Terceiro filtro', async ()=> {
    render(
      <PlanetProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </PlanetProvider>,
      );
    await waitFor(()=> expect(global.fetch).toHaveBeenCalledTimes(1));
    
    await waitFor(()=>{
      const rowTable =  screen.getAllByRole('row');      
      expect(rowTable.length).toEqual(11)
    });
    const dropFilter = screen.getByTestId('column-sort');
    userEvent.selectOptions(dropFilter, dropFilter[2]);

    const radioASC = screen.getByTestId('column-sort-input-asc');
    userEvent.click(radioASC);

    const radioDESC = screen.getByTestId('column-sort-input-desc');
    userEvent.click(radioDESC);

    const btnSort = screen.getByTestId('column-sort-button');
    userEvent.click(btnSort);
    
    const btnRemoveFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRemoveFilters);
  });
});
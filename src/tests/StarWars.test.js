import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import MockStarWars from '../../cypress/mocks/testData'



describe('Star Wars Project', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockStarWars)
    });
  
  test('Pagina Unica testando elementos', ()=> {
    render(<App />);
    const title = screen.getByRole('heading', {  name: /star wars/i});
    expect(title).toBeDefined();

    const inputSearch =  screen.getByRole('textbox');
    expect(inputSearch).toBeDefined();
    userEvent.type(inputSearch, 'Naboo');
    expect(inputSearch.value).toBe('Naboo');
      
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';




describe('Star Wars Project', () => {
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

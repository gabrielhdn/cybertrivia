import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import localStorageMock from './mocks/localStorageMock';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    url: '',
  }
};

describe('Testando a página Ranking', () => {

  it('Verificando se os elementos estão na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem');
    jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem');

    localStorage.setItem('ranking', JSON.stringify(localStorageMock));

    history.push('/ranking');
    expect(localStorage.getItem).toHaveBeenCalled();

    const title = screen.getByTestId('ranking-title');
    expect(title).toBeInTheDocument();

    localStorageMock.forEach((player, index) => {
      const name = screen.getByTestId(`player-name-${index}`);
      const score = screen.getByTestId(`player-score-${index}`);
      expect(name).toBeVisible();
      expect(score).toBeVisible();
    });
  });

  it('Verificando o funcionamento do botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const playBtn = screen.getByTestId('btn-go-home');

    userEvent.click(playBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });


});
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../../App';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    url: '',
  }
};

describe('Testando a página Feedback', () => {

  it('Verificando se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

    const title = screen.getByText(/feedback/i);
    const img = screen.getByTestId('header-profile-picture');
    const name = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const playBtn = screen.getByTestId('btn-play-again');
    const rankingBtn = screen.getByTestId('btn-ranking');
    const elements = [title, img, name, score, playBtn, rankingBtn];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  it('Verificando o funcionamento do botão Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const playBtn = screen.getByTestId('btn-play-again');

    userEvent.click(playBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Verificando o funcionamento do botão Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const rankingBtn = screen.getByTestId('btn-ranking');

    userEvent.click(rankingBtn);
    
    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking');
  });
});
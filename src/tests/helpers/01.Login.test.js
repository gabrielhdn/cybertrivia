import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Testando a página Login', () => {

  it('Verificando se inputs e botões estão presentes na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputText = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    const settingsButton = screen.getByTestId('btn-settings');

    const elements = [inputText, inputEmail, playButton, settingsButton];
    elements.forEach((item) => expect(item).toBeInTheDocument());
    expect(inputText.placeholder).toBe('name');
    expect(inputEmail.placeholder).toBe('e-mail');
  });

  it('Verificando o funcionamento dos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const inputText = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    expect(inputText).toHaveProperty('type', 'text');
    expect(inputEmail).toHaveProperty('type', 'email');

    userEvent.type(inputText, 'Oi');
    userEvent.type(inputEmail, 'gabriel@gmail.com');

    expect(inputText).toHaveValue('Oi');
    expect(inputEmail).toHaveValue('gabriel@gmail.com');
  });

  it('Verificando o input de nome', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const inputText = screen.getByTestId('input-player-name');

    userEvent.type(inputText, 'Oi');
    expect(playButton).toBeDisabled();

  });

  it('Verificando o input de email', () => {
    renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputEmail, 'gabriel@gmail.com');
    expect(playButton).toBeDisabled();
  });

  it('Verificando o funcionamento do botão de play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const inputText = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(playButton).toBeDisabled();
    
    userEvent.type(inputText, 'Oi');
    userEvent.type(inputEmail, 'gabriel@gmail.com');
    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/game');
    }, { timeout: 1500 }); //add timeout
  });

  it('Verificando o funcionamento do botão de settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).not.toBeDisabled();

    userEvent.click(settingsButton);
    const { location: { pathname } } = history;
    const titleEl = screen.getByText(/configurações/i);

    expect(pathname).toBe('/settings');
    expect(titleEl).toBeInTheDocument();
  });

});
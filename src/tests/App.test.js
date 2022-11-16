import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const dataEmail = 'email-input';
const dataSenha = 'password-input';
const invalidEmail = 'trybe.com';
const invalidSenha = 123;
const validEmail = 'trybe@teste.com';
const validSenha = 123456;

describe('testa a página Login', () => {
  test('se está na rota inical "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se os inputs de email e senha são renderizados na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(dataEmail);
    const inputSenha = screen.getByTestId(dataSenha);

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
  });

  test('se renderiza um botão', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByText(/entrar/i);

    expect(buttonEnter).toBeInTheDocument();
  });

  test('se o botão fica desativado caso o email seja inválido', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByText(/entrar/i);
    const inputEmail = screen.getByTestId(dataEmail);
    const inputSenha = screen.getByTestId(dataSenha);
    const message = 'Email e/ou senha inválidos';
    const errorMessage = screen.getByText(message);

    userEvent.type(inputEmail, invalidEmail);
    userEvent.type(inputSenha, validSenha);

    expect(errorMessage).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
  });

  test('se o botão fica desativado caso a senha seja inválida', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByText(/entrar/i);
    const inputEmail = screen.getByTestId(dataEmail);
    const inputSenha = screen.getByTestId(dataSenha);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputSenha, invalidSenha);

    expect(buttonEnter).toBeDisabled();
  });

  test('se o botão fica desativado caso o email e a senha sejam inválidos', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByText(/entrar/i);
    const inputEmail = screen.getByTestId(dataEmail);
    const inputSenha = screen.getByTestId(dataSenha);

    userEvent.type(inputEmail, invalidEmail);
    userEvent.type(inputSenha, invalidSenha);

    expect(buttonEnter).toBeDisabled();
  });

  test('se o botão fica ativado caso email e senha sejam válidos', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByText(/entrar/i);
    const inputEmail = screen.getByTestId(dataEmail);
    const inputSenha = screen.getByTestId(dataSenha);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputSenha, validSenha);

    expect(buttonEnter).not.BeDisabled();
  });

  test('se ao clicar no botão "Entrar" vai para a rota "/carteira"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(dataEmail);
    const inputSenha = screen.getByTestId(dataSenha);
    const buttonEnter = screen.getByText(/entrar/i);

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputSenha, validSenha);
    userEvent.click(buttonEnter);

    await waitFor(() => expect(history.location.pathname).toBe('/carteira'), { timeout: 3000 });
  });
});

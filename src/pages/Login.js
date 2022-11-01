import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
    showAlert: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validation());
  };

  validation = () => {
    const { email, password } = this.state;
    const regex = /^([a-z0-9_\-.]+)@([a-z0-9_\-.]+)\.([a-z]{2,5})$/;
    const validEmail = regex.test(email);
    const number = 6;
    const validPwd = password.length >= number;
    if (email !== '' && validPwd === true) {
      if (validEmail && validPwd) {
        this.setState({ disabled: false, showAlert: false });
      } else {
        this.setState({ disabled: true, showAlert: true });
      }
    } else {
      this.setState({ disabled: true });
    }
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(loginEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled, showAlert } = this.state;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        { showAlert && <h2>Email e/ou senha inválidos</h2> }
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            placeholder="E-mail"
            value={ email }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="pwd" className="inputPwd">
          <input
            type="password"
            name="password"
            id="pwd"
            data-testid="password-input"
            placeholder="senha"
            value={ password }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);

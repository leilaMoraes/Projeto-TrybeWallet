import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmail } from '../redux/actions';
import LogoTitle from '../images/LogoTitle.png';
import './login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
    showAlert: false,
  };

  handleChange = ({ target }) => {
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
      <section className="sec-login">
        <div className="div-login">
          <div className="div-title-login">
            <img
              className="title-login"
              src={ LogoTitle }
              alt="nota de diheiro com asas e o escrito Trybe Wallet"
            />
          </div>
          <div className="div-inputs">
            <label htmlFor="email">
              <input
                className="input-login"
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                placeholder="E-mail"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="pwd" className="inputPwd">
              <input
                className="input-login"
                type="password"
                name="password"
                id="pwd"
                data-testid="password-input"
                placeholder="Senha"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            { showAlert && <p className="message">Email e/ou senha inválidos</p> }
            <button
              className="btn-enter"
              type="button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        </div>
      </section>
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

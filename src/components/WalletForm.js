import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import './walletForm.css';

const payMethods = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

const typeExpense = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies, isLoading } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <section className="sec-wallet-form">
        {isLoading && <h2>Carregando...</h2> }
        <div className="div-wallet-form">
          <label className="labels-input" htmlFor="description">
            Descrição da despesa
            <input
              className="input-description"
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label className="labels-wallet-form" htmlFor="type">
            Categoria da despesa
            <select
              className="select-tag"
              name="type"
              id="type"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              {
                typeExpense.map((typeE, index) => (
                  <option key={ index }>{ typeE }</option>
                ))
              }
            </select>
          </label>
          <label className="labels-input" htmlFor="expense">
            Valor
            <input
              className="input-value"
              type="number"
              name="expense"
              id="expense"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label className="labels-wallet-form" htmlFor="payment">
            Método de pagamento
            <select
              className="select-method"
              name="payment"
              id="payment"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              {
                payMethods.map((pay, index) => (
                  <option key={ index }>{ pay }</option>
                ))
              }
            </select>
          </label>
          <label className="labels-wallet-form" htmlFor="currency">
            Moeda
            <select
              className="select-currency"
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((coin, index) => (
                  <option key={ index }>{ coin }</option>
                ))
              }
            </select>
          </label>
        </div>
      </section>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired),
  isLoading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

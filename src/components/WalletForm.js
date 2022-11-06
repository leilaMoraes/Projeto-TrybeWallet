import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses, fetchCurrencies } from '../redux/actions';
import './walletForm.css';
import ButtonAdd from './ButtonAdd';

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
    value: '',
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

  callingApi = async () => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  handleClick = async () => {
    this.setState({ value: '', description: '' });
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses } = this.props;
    const api = await this.callingApi();
    const exchangeRates = api;
    delete exchangeRates.USDT; // delete feito com a ajuda da Lígia Bicalho
    dispatch(addExpenses({ id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates }));
  };

  render() {
    const { currencies, isLoading } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <section className="sec-wallet-form">
        {isLoading && <h2 className="loading">Carregando...</h2>}
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
              name="tag"
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
              name="value"
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
              name="method"
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
          <ButtonAdd handleClick={ this.handleClick } />
        </div>
      </section>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired),
  isLoading: PropTypes.bool,
  expenses: PropTypes.arrayOf(PropTypes.string.isRequired),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);

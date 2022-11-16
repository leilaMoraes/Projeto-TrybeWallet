import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenses, deleteExpenses, fetchCurrencies } from '../redux/actions';
import './walletForm.css';
import ButtonAdd from './ButtonAdd';

const payMethods = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

const typeFood = 'Alimentação';

const typeExpense = [
  typeFood,
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
    tag: typeFood,
    currency: 'USD',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { expenses, idToEdit, editor } = this.props;
    if (prevProps.editor !== editor && editor === true) {
      const edit = expenses.find((el) => el.id === Number(idToEdit));
      this.setState({
        value: edit.value,
        description: edit.description,
        method: edit.method,
        tag: edit.tag,
        currency: edit.currency,
      });
    }
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
    const { dispatch } = this.props;
    this.setState((prevState) => ({ value: '',
      description: '',
      id: prevState.id + 1 }));
    const { value, description, currency, method, tag, id } = this.state;
    const api = await this.callingApi();
    const exchangeRates = api;
    delete exchangeRates.USDT; // delete feito com a ajuda da Lígia Bicalho
    dispatch(addExpenses({ id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates }));
  };

  handleEdit = () => {
    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: typeFood,
      currency: 'USD',
    });
    const { dispatch, expenses, idToEdit } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const newExpense = expenses.find((el) => el.id === Number(idToEdit));
    newExpense.value = value;
    newExpense.currency = currency;
    newExpense.method = method;
    newExpense.tag = tag;
    newExpense.description = description;
    dispatch(deleteExpenses(expenses));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <section className="sec-wallet-form">
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
          <ButtonAdd
            handleClick={ editor ? this.handleEdit : this.handleClick }
            btnName={ editor ? 'Editar despesa' : 'Adicionar Despesa' }
          />
        </div>
      </section>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired),
  expenses: PropTypes.arrayOf(PropTypes.string.isRequired),
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);

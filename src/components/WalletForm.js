import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    expense: 0,
    description: '',
    payment: 'Dinheiro',
    type: 'Alimentação',
    currency: 'BRL',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { expense, description, payment, type, currency } = this.state;
    return (
      <div>
        <label htmlFor="description">
          Descrição da despesa
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="type" className="label">
          Categoria da despesa
          <select
            name="type"
            id="type"
            data-testid="tag-input"
            value={ type }
            onChange={ this.handleChange }
          >
            {
              typeExpense.map((typeE, index) => (
                <option key={ index }>{ typeE }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="expense">
          Valor
          <input
            type="number"
            name="expense"
            id="expense"
            data-testid="value-input"
            value={ expense }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="payment" className="label">
          Método de pagamento
          <select
            name="payment"
            id="payment"
            data-testid="method-input"
            value={ payment }
            onChange={ this.handleChange }
          >
            {
              payMethods.map((pay, index) => (
                <option key={ index }>{ pay }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="currency" className="label">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((pay, index) => (
                <option key={ index }>{ pay }</option>
              ))
            }
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(WalletForm);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Delete from '../images/Delete.png';
import Edit from '../images/Edit.png';
import { deleteExpenses, editExpenses } from '../redux/actions';
import './tableBody.css';
// elemento feito separado pq estava dando erro depth no table, ideia q tive vendo o pr da Mirella,

class TableBody extends Component {
  handleDeleteClick = ({ target: { id } }) => {
    const { dispatch, expenses } = this.props;
    const newExpense = expenses.filter((el) => el.id !== Number(id));
    dispatch(deleteExpenses(newExpense));
  };

  handleEditClick = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <tbody className="table-tbody">
        {expenses.length > 0
            && expenses.map((expense) => (
              <tr className="table-tr-tbody" key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(expense.value * expense
                    .exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="edit-btn"
                    id={ expense.id }
                    onClick={ this.handleEditClick }
                  >
                    <img
                      src={ Edit }
                      alt="imagem de um lápis escrevendo em um papel, ambos na cor verde"
                      id={ expense.id }
                    />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="delete-btn"
                    id={ expense.id }
                    onClick={ this.handleDeleteClick }
                  >
                    <img
                      src={ Delete }
                      alt="imagem de uma lixeira na cor vermelho bem claro, quase rosa"
                      id={ expense.id }
                    />
                  </button>
                </td>
              </tr>))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableBody);

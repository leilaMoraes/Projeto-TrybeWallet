import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import './tableBody.css';
// elemento feito separado pq estava dando erro depth no table, ideia q tive vendo o pr da Mirella,

class TableBody extends Component {
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
                    className="edit-btn"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ this.handleEditClick }
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.handleDeleteClick }
                  >
                    <FaTrash />
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

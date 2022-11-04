import React, { Component } from 'react';
import './table.css';

const tableHead = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido',
  'Moeda de conversão', 'Editar/Excluir'];
class Table extends Component {
  render() {
    return (
      <section className="sec-table">
        <div className="div-table">
          <table className="table-head">
            { tableHead.map((head, i) => (
              <th className="table-th" key={ i }>
                { head }
              </th>)) }
          </table>
        </div>
      </section>
    );
  }
}

export default Table;

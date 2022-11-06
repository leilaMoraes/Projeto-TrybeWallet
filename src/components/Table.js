import React, { Component } from 'react';
import './table.css';
import TableBody from './TableBody';

const tableHead = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido',
  'Moeda de conversão', 'Editar/Excluir'];

class Table extends Component {
  render() {
    return (
      <section className="sec-table">
        <div className="div-table">
          <table className="table-head">
            <thead className="table-thead">
              <tr className="table-tr">
                { tableHead.map((head, i) => (
                  <th className="table-th" key={ i }>
                    { head }
                  </th>)) }
              </tr>
            </thead>
            <TableBody />
          </table>
        </div>
      </section>
    );
  }
}

export default Table;

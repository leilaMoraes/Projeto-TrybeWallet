import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <div className="div-btn-add">
          <button
            className="btn-add"
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;

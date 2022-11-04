import React from 'react';
import Header from '../components/Header';
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
      </div>
    );
  }
}

export default Wallet;

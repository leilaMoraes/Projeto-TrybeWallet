import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import LogoTitle from '../images/LogoTitle.png';
import Coins from '../images/Coins.png';
import './header.css';

class Header extends Component {
  state = {
    sum: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses || prevProps.editor === true) {
      this.getSum();
    }
  }

  getSum = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const getSum = expenses.reduce((acc, curr) => {
        const getValue = Number(curr.value);
        const getCurrency = curr.currency.toString();
        const getAsk = Number(curr.exchangeRates[getCurrency].ask);
        return Number(acc) + (getValue * getAsk);
      }, 0);
      this.setState({ sum: getSum });
    } else {
      this.setState({ sum: 0 });
    }
  };

  render() {
    const { email } = this.props;
    const { sum } = this.state;
    return (
      <section className="sec-header">
        <div className="div-header">
          <div className="div-title-header">
            <img
              src={ LogoTitle }
              alt="nota de diheiro com asas e o escrito Trybe Wallet"
            />
          </div>
          <div className="div-spending">
            <img
              src={ Coins }
              alt="duas pequenas pilhas de moeda e um sinal de subtração"
            />
            <p className="spending">Total de gastos:</p>
            <p className="total" data-testid="total-field">{ sum.toFixed(2) }</p>
            <p className="total" data-testid="header-currency-field">BRL</p>
          </div>
          <div className="div-email">
            <CgProfile color="rgb(47, 193, 140)" size={ 28 } />
            <p className="fixed-email" data-testid="email-field">
              {email}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired),
  editor: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Header);

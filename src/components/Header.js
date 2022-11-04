import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import { HiMinusCircle } from 'react-icons/hi';
import { FaCoins } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import './header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <section className="sec-header">
        <div className="div-header">
          <div className="div-title-header">
            <GiMoneyStack size={ 45 } className="react-icons" />
            <h1 className="trybe-title">Trybe</h1>
            <h1 className="wallet-title">Wallet</h1>
          </div>
          <div className="div-spending">
            <FaCoins color="rgb(0, 59, 229)" size={ 28 } />
            <HiMinusCircle color="rgb(0, 59, 229)" size={ 14 } />
            <p className="spending">Total de gastos:</p>
            <p className="total" data-testid="total-field">{0}</p>
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
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

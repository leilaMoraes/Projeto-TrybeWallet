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
      <section className="header">
        <div className="div1">
          <GiMoneyStack size={ 45 } className="react-icons" />
          <h1 className="trybe">Trybe</h1>
          <h1 className="wallet">Wallet</h1>
        </div>
        <div className="div2">
          <FaCoins color="rgb(0, 59, 229)" size={ 28 } />
          <HiMinusCircle color="rgb(0, 59, 229)" size={ 14 } />
          <p className="spending">Total de gastos:</p>
          <p className="total" data-testid="total-field">{0}</p>
          <p className="total" data-testid="header-currency-field">BRL</p>
        </div>
        <div className="div3">
          <CgProfile color="rgb(47, 193, 140)" size={ 28 } />
          <p className="email" data-testid="email-field">
            {email}
          </p>
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

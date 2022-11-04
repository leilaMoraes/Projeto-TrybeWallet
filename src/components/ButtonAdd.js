import React from 'react';
import PropTypes from 'prop-types';
import './buttonAdd.css';

class ButtonAdd extends React.Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div>
        <div className="div-btn-add">
          <button
            className="btn-add"
            type="button"
            onClick={ handleClick }
          >
            Adicionar Despesa
          </button>
        </div>
      </div>
    );
  }
}

ButtonAdd.propTypes = {
  handleClick: PropTypes.func,
};

ButtonAdd.defaultProps = {
  handleClick: () => {},
};

export default ButtonAdd;

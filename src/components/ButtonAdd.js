import React from 'react';
import PropTypes from 'prop-types';
import './buttonAdd.css';

class ButtonAdd extends React.Component {
  render() {
    const { handleClick, btnName } = this.props;
    return (
      <div>
        <div className="div-btn-add">
          <button
            className="btn-add"
            type="button"
            onClick={ handleClick }
          >
            {btnName}
          </button>
        </div>
      </div>
    );
  }
}

ButtonAdd.propTypes = {
  handleClick: PropTypes.func,
  btnName: PropTypes.string.isRequired,
};

ButtonAdd.defaultProps = {
  handleClick: () => {},
};

export default ButtonAdd;

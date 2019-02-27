import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { disabled } = this.props;
  return (
    <button type="button">
      cancel
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'primary',
  style: {},
  disabled: true,
};

export default Button;

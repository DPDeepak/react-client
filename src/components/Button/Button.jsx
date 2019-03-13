import React from 'react';
import PropTypes from 'prop-types';
import Style from './styles';

const Button = (props) => {
  const { disabled, color, ...rest } = props;
  return (
    <>
      <input type="submit" {...rest} disabled={disabled} style={{ ...Style, ...color }} />
    </>
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
  color: '',
  style: {},
  disabled: false,
};

export default Button;

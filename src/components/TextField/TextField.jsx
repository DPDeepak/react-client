import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    error, value, ...rest
  } = props;
  const errorOptional = error ? style.errorStyle : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.basic, ...errorOptional }} value={value} onChange={onchange} />
      {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};
TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
TextField.defaultProps = {
  error: '',
  value: '',
};

export default TextField;

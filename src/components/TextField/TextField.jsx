import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    error, onchange, value, ...rest
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
  onchange: PropTypes.func,
  value: PropTypes.string,
};
TextField.defaultProps = {
  error: '',
  onchange: () => { },
  value: 'Deepak',
};

export default TextField;

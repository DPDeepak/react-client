import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { error, ...rest } = props;

  const errorOptional = error ? style.errorStyle : {};
  return (
    <>
      <input type="text" {...rest} style={{ ...style.basic, ...errorOptional }} />
      {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};
TextField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func,
};
TextField.defaultProps = {
  error: '',
  onChange: () => { },
};


export default TextField;

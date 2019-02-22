import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    options, error, defaultText, ...rest
  } = props;
  return (
    <>
      <select value={defaultText} {...rest} style={style.base}>
        <option value={defaultText}>{defaultText}</option>
        {
          options.map(option => <option key={option.value} value={option.label}>{option.label}</option>)
        }
      </select>
      {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};
SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  defaultText: PropTypes.string,
};

SelectField.defaultProps = {
  options: [],
  value: '',
  error: '',
  defaultText: 'Select',
};

export default SelectField;

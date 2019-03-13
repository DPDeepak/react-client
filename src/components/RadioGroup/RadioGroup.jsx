import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error, options, value, ...rest
  } = props;
  return (
    <>
      {
        (options.length) ?
          options.map(option => (
            <div>
              <label htmlFor={option.label}>
                <input type="radio" value={option.label} name="disk" {...rest} key={option.label} />

                {option.label}
              </label>
            </div>
          )
          )
      :
       ''
    }
      {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
    </>
  );
};

RadioGroup.propTypes = {
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

RadioGroup.defaultProps = {
  options: [],
  value: '',
  error: '',
};

export default RadioGroup;

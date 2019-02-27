import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    onchange, options, value,
  } = props;
  return (
    <>
      {options.map(option => (
        <div>
          <label htmlFor={option.label}>
            <input type="radio" value={option.label} id={option.label} onChange={onchange} checked={option.label === value} />
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf),
  onchange: PropTypes.func,
  value: PropTypes.string,
};

RadioGroup.defaultProps = {
  options: [{ id: 0, value: 'select' }],
  onchange: () => { },
  value: '',
};

export default RadioGroup;

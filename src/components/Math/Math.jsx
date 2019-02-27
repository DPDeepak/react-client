import PropTypes from 'prop-types';

const Math = (props) => {
  const calculate = (first, second, operator) => {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') {
      if (second === 0) return 'infinity';
      return first / second;
    }
    return 'Invalid Operator';
  };
  const {
    first, second, operator, children,
  } = props;
  const result = calculate(first, second, operator);

  if (children) {
    return children(first, second, operator, result);
  }
  return `${first} ${operator} ${second} = ${result}`;
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Math.defaultProps = {
  children: null,
};

export default Math;

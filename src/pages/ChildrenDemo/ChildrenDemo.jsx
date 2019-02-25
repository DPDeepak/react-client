import { Typography } from '@material-ui/core';
import React from 'react';
import Math from '../../components/Math';

const ChildrenDemo = () => (
  <>
    <Typography>
      <Math first={7} operator="+" second={4}>
        {(first, second, operator, result) => (
          <h3>
            {`${first} ${operator} ${second} = ${result}`}
          </h3>
        )}
      </Math>
      <Math first={7} operator="-" second={3}>
        {(first, second, operator, result) => (
          <h3>
            {`${first} ${operator} ${second} = ${result}`}
          </h3>
        )}
      </Math>

      <Math first={7} operator="/" second={0}>
        {(first, second, operator, result) => (
          <h3>
            {`${first} ${operator} ${second} = ${result}`}
          </h3>
        )}

      </Math>
      <Math first={7} operator="^" second={8}>
        {(first, second, operator, result) => (
          <h3>
            {`${first} ${operator} ${second} = ${result}`}
          </h3>
        )}
      </Math>
    </Typography>
    <Math first={7} operator="+" second={4}>
      {(first, second, operator, result) => (
        <h3>
          {`Sum of ${first} and ${second} is ${result}`}
        </h3>
      )}
    </Math>

  </>
);
export default ChildrenDemo;

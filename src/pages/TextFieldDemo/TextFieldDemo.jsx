import React from 'react';
import TextField from '../../components';

const TextFieldDemo = () => (
  <>
    <h3>This is Disabled input</h3>
    <TextField value="disabled input" disabled />
    <h3>A Valid input</h3>
    <TextField placeholder="Accessible" />
    <h3>An input with errors</h3>
    <TextField value="101" error="could not be greater than" />
  </>

);

export default TextFieldDemo;

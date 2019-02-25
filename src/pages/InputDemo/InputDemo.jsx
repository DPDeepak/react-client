import React, { Component } from 'react';
import TextField from '../../components';
import SelectField from '../../components/SelectField';
import * as options from '../../configs/constants';
import RadioGroup from '../../components/RadioGroup';
import style from './style';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueSport: '',
      valueRadio: '',
    };
  }

  onChangeHandler = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  onSportChangeHandler = (event) => {
    this.setState({
      valueSport: event.target.value,
    });
  }

  onRadioChangeHandler = (event) => {
    const { valueSport } = this.state;
    this.setState({
      valueRadio: event.target.value,
      [valueSport]: event.target.value,
    });
  }

  render() {
    const { value, valueSport, valueRadio } = this.state;

    return (
      <div>
        <div>
          <TextField value={value} onchange={this.onChangeHandler} />
          <SelectField
            options={options.sportSelect}
            value={valueSport}
            onchange={this.onSportChangeHandler}
          />
        </div>
        <div>
          {
            (valueSport) ? (
              <RadioGroup
                options={options[valueSport]}
                value={valueRadio}
                style={style}
                onchange={this.onRadioChangeHandler}
              />
            )
              : ''
          }
        </div>
      </div>
    );
  }
}
export default InputDemo;

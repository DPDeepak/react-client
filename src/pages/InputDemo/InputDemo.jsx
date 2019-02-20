import React, { Component } from 'react';
import TextField from '../../components';
import SelectField from '../../components/SelectField';
import { sportSelect, Cricket, Football } from '../../configs/constants';
import RadioGroup from '../../components/RadioGroup';
import style from './style';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueSport: '',
      Cricket: '',
      Football: '',
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
      Cricket: '',
      Football: '',
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
    console.log('--------', this.state);

    let result = 0;
    if (valueSport === 'Cricket') {
      result = Cricket;
    } else if (valueSport === 'Football') {
      result = Football;
    }
    return (
      <div>
        <div>
          <TextField value={value} onchange={this.onChangeHandler} />
          <SelectField
            options={sportSelect}
            value={valueSport}
            onchange={this.onSportChangeHandler}
          />
        </div>
        <div>
          {
            (result) ? (
              <RadioGroup
                options={result}
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

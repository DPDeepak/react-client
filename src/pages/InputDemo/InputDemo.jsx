import React, { Component } from 'react';
import * as yup from 'yup';
import TextField from '../../components';
import SelectField from '../../components/SelectField';
import { sportSelect, Cricket, Football } from '../../configs/constants';
import RadioGroup from '../../components/RadioGroup';
import style from './style';
import Button from '../../components/Button';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  sport: yup.string().required(),
  player: yup.string().required(),
});

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      player: '',
      Err: {
        name: '',
        sport: '',
        player: '',
      },
      hasError: {
        name: false,
        sport: false,
        player: false,
      },
      isTouched: {
        name: false,
        sport: false,
        player: false,
      },
    };
  }

  onChangeHandler = field => (event) => {
    const { isTouched } = this.state;
    this.setState({
      [field]: event.target.value,
      isTouched: { ...isTouched, [field]: true },
    }, this.getError(field));
  }

  getError = field => () => {
    const { name, sport, player, Err, hasError } = this.state;
    schema.validate({
      name, sport, player,
    }, { abortEarly: false })
      .then(
        this.setState({
          Err: { ...Err, [field]: '' },
          hasError: { ...hasError, [field]: false },
        }),
      )
      .catch(
        (err) => {
          err.inner.forEach((elem) => {
            if (elem.path === field) {
              this.setState({
                Err: { ...Err, [field]: elem.message },
                hasError: { ...hasError, [field]: true },
              });
            }
          });
          if (!err.inner.some(er => er.path === field) && hasError[field]) {
            this.setState({
              Err: { ...Err, [field]: '' },
              hasError: { ...hasError, [field]: false },
            });
          }
        },
      );
  }

  buttonDisabled = () => {
    const { hasError, isTouched } = this.state;
    let notError = 0;
    let touched = 0;
    let result = false;
    Object.keys(hasError).forEach((i) => {
      if (hasError[i] === false) {
        notError += 1;
      }
    });
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (notError === 3 && touched === 3) {
      result = true;
    } else if (notError !== 3 && touched !== 3) {
      result = false;
    }
    return result;
  }

  render() {

    const {
      sport, hasError, Err,
    } = this.state;

    let result = 0;
    if (sport === 'Cricket') {
      result = Cricket;
    } else if (sport === 'Football') {
      result = Football;
    }
    return (
      <div>
        <div>
          <TextField onChange={this.onChangeHandler('name')} onBlur={this.getError('name')} error={Err.name} />
          <h3>Select the game you play!</h3>
          <SelectField
            error={Err.sport}
            options={sportSelect}
            value={sport}
            onChange={this.onChangeHandler('sport')}
            onBlur={this.getError('sport')}
          />
        </div>
        <div>
          {
            (result) ? (
              <RadioGroup
                error={Err.player}
                options={result}
                onChange={this.onChangeHandler('player')}
                onBlur={this.getError('player')}

              />
            )
              : ''
          }
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button value="Cancel" />
          {
            (this.buttonDisabled()) ? <Button value="Submit" color={{ backgroundColor: 'green' }} /> : <Button value="Submit" disabled />
          }
        </div>
      </div>
    );
  }
}
export default InputDemo;

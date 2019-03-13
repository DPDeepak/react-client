import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import DialogActions from '@material-ui/core/DialogActions';
import callApi from '../../../../lib/utils/api';
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import Progress from '../../../../components/Progress';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required()
    .label('Name'),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required('No password provided.')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/,
      'Must contain 8 characters atleast 1 uppercase letter, 1 lowercase and 1 number',
    ),
  confirmPswd: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Confirm Password is required'),
});



class AddDialogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPswd: '',
      showPassword: false,
      showMatchPassword: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPswd: '',
      },
      isTouched: {
        name: false,
        email: false,
        password: false,
        confirmPswd: false,
      },
      spinner: false,
      startSpin: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowMatchPassword = () => {
    this.setState(state => ({ showMatchPassword: !state.showMatchPassword }));
  };

  handleCancel = () => {
    const { onClose } = this.props
    onClose();
  }

  handleValue = item => (event) => {
    const { error, isTouched, confirmPswd } = this.state;
    let confirmpswdCheck = error[confirmPswd];
    if (item === 'password') {
      confirmpswdCheck = '';
    }
    this.setState({
      [item]: event.target.value,
      error: { ...error, confirmPswd: confirmpswdCheck, [item]: '' },
      isTouched: { ...isTouched, [item]: true },
    }, () => {
      if (item === 'password' && confirmPswd !== '') {
        this.handleValidation('confirmPswd')();
      }
      this.handleValidation(item)();
    });
  };

  handleValidation = item => () => {
    const {
      name,
      email,
      password,
      confirmPswd,
      error,
      isTouched,
    } = this.state;

    schema
      .validate(
        {
          name,
          email,
          password,
          confirmPswd,
        },
        { abortEarly: false },
      )
      .then(this.setState({ isTouched: { ...isTouched, [item]: true, error: { ...error, [item]: '' } } }))
      .catch((err) => {
        err.inner.forEach((res) => {
          if (res.path === item) {
            this.setState({
              error: { ...error, [item]: res.message },
              isTouched: { ...isTouched, [item]: true },
            });
          }
        });
      });
  };

  buttonChecked = () => {
    const { error, isTouched } = this.state;
    let notError = 0;
    let touched = 0;
    let result = false;
    Object.keys(error).forEach((i) => {
      if (error[i] === '') {
        notError += 1;
      }
    });
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (notError === 4 && touched === 4) {
      result = true;
    } else if (notError !== 4 && touched !== 4) {
      result = false;
    }
    return result;
  };

  onSubmit = async (event, values) => {
    event.preventDefault();
    this.setState({ spinner: true, startSpin: true })
    const { onSubmit, onClose } = this.props;
    const {
      name,
      email,
      password
    } = this.state;
    const Authorization = localStorage.token;
    const auth = await callApi({ name, email, password }, { Authorization }, '/api/trainee', 'POST');
    if (auth.status === 200) {
      this.setState({ spinner: false })
      onSubmit({ name, email, password });
      values.openSnack('Successfully Add Trainee', 'success');
      onClose();
    } else {
      values.openSnack('Error in Authentication', 'error');
      this.setState({ spinner: false })
      onSubmit({ name, email, password });
      onClose();
    }
  }

  render() {
    const { open } = this.props;
    const {
      name,
      email,
      password,
      confirmPswd,
      showPassword,
      showMatchPassword,
      error,
      spinner,
      startSpin,
    } = this.state;
    return (
      <>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your trainee details</DialogContentText>
            <TextField
              label="Name *"
              value={name}
              margin="normal"
              variant="outlined"
              onChange={this.handleValue('name')}
              onBlur={this.handleValidation('name')}
              helperText={error.name}
              error={error.name}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email Address"
              value={email}
              margin="normal"
              variant="outlined"
              onChange={this.handleValue('email')}
              onBlur={this.handleValidation('email')}
              helperText={error.email}
              error={error.email}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={24}>
              <Grid item xl={6} xs={6}>
                <TextField
                  label="Password"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleValue('password')}
                  onBlur={this.handleValidation('password')}
                  helperText={error.password}
                  error={error.password}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={this.handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xl={6} xs={6}>
                <TextField
                  label="Confirm Password"
                  value={confirmPswd}
                  type={showMatchPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleValue('confirmPswd')}
                  onBlur={this.handleValidation('confirmPswd')}
                  helperText={error.confirmPswd}
                  error={error.confirmPswd}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={this.handleClickShowMatchPassword}>
                          {showMatchPassword ? (
                            <Visibility />
                          ) : (
                              <VisibilityOff />
                            )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleCancel}>
              Cancel
            </Button>
            {
              (spinner) ?
                (<Button
                  variant="contained"
                  color="primary"
                  disabled
                >
                  Submit
                  {
                    (startSpin)
                      ?
                      (<Progress size={20} />)
                      :
                      ''
                  }
                </Button>
                )
                :
                <SnackbarConsumer>
                  {values => (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={event => this.onSubmit(event, values)}
                      disabled={!(this.buttonChecked())}
                    >
                      Submit
                 </Button>)}
                </SnackbarConsumer>
            }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
AddDialogue.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
AddDialogue.defaultProps = {
  open: false,
  onClose: () => { },
  onSubmit: () => { },
};
export default AddDialogue;

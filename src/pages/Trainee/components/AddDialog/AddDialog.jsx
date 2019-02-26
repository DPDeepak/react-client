import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
  Person, Visibility, VisibilityOff, Email,
} from '@material-ui/icons';
import * as yup from 'yup';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  error: {
    color: 'red',
    margin: 10,
  },
});

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

// default values for props:
const defaultProps = {
  open: false,
  classes: {},
};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

class AddDialog extends React.Component {
  schema = yup.object().shape({
    name: yup
      .string()
      .required(),
    email: yup.string().email().required(),
    password: yup.string()
      .matches(passwordRegex, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number')
      .min(8)
      .required(),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match').required().label('confirm password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      form: {
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
      },
      error: {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
      },
      isTouched: {
        name: false,
        password: false,
        confirmPassword: false,
        email: false,
      },
    };
  }

  handleChange = field => (event) => {
    const { isTouched, form } = this.state;
    console.log('-----', event.target.value);

    this.setState({
      form: { ...form, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
    }, this.handleValidate(field));
  };

  handleValidate = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      name, email, password, confirmPassword,
    } = form;
    this.schema.validate({
      name, email, password, confirmPassword,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      if (!err.inner.some(er => er.path === field)) {
        this.setState({
          error: { ...error, [field]: '' },
          isTouched: { ...isTouched, [field]: true },
        });
      }
    });
  }

  handleOnBlur = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      name, email, password, confirmPassword,
    } = form;
    this.schema.validate({
      name, email, password, confirmPassword,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      err.inner.forEach((er) => {
        if (er.path === field) {
          this.setState({
            error: { ...error, [field]: er.message },
            isTouched: { ...isTouched, [field]: true },
          });
        }
      });
    });
  }

  hasError = () => {
    const { error } = this.state;
    if (error.name === '' && error.email === '' && error.password === '' && error.confirmPassword === '') {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const { isTouched, error } = this.state;
    let result = '';
    if (isTouched[field] === true) {
      result = error[field];
    }
    return result;
  }

  buttonChecked = () => {
    const { isTouched } = this.state;
    let touched = 0;
    let result = false;
    const checkError = this.hasError();
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (!checkError && touched === 4) {
      result = true;
    } else if (checkError && touched !== 4) {
      result = false;
    }
    return result;
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { form } = this.state;
    onSubmit(form);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  render() {
    const { open, classes } = this.props;
    const { showPassword } = this.state;
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <TextField
              fullWidth
              id="outlined-name"
              label="Name"
              // className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('name')}
              onBlur={this.handleOnBlur('name')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
              }}
            />
            <FormHelperText id="component-error-text" className={classes.error}>
              {this.getError('name')}
            </FormHelperText>
            <TextField
              fullWidth
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('email')}
              onBlur={this.handleOnBlur('email')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
              }}
            />
            <FormHelperText id="component-error-text2" className={classes.error}>
              {this.getError('email')}
            </FormHelperText>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  // className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('password')}
                  onBlur={this.handleOnBlur('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText id="component-error-text3" className={classes.error}>
                  {this.getError('password')}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-password-input1"
                  label="Confirm Password"
                  // className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('confirmPassword')}
                  onBlur={this.handleOnBlur('confirmPassword')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText id="component-error-text4" className={classes.error}>
                  {this.getError('confirmPassword')}
                </FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {
              (this.buttonChecked()) ? (
                <Button onClick={this.handleSubmit} color="primary">
                  Submit
                </Button>
              ) : (
                  <Button onClick={this.handleSubmit} color="primary" disabled>
                    Submit
                </Button>
                )
            }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
AddDialog.propTypes = propTypes;
AddDialog.defaultProps = defaultProps;
export default withStyles(styles)(AddDialog);

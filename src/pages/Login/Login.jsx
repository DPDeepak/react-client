import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, TextField, FormHelperText, IconButton, InputAdornment, Paper, Typography,
} from '@material-ui/core';
import {
  Visibility, VisibilityOff, Email,
} from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import * as yup from 'yup';
import {
  withRouter,
} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';
import Progress from '../../components/Progress';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  progress: {
    margin: theme.spacing.unit,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  error: {
    color: 'red',
  },
});

const propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisable:false,
      showPassword: false,
      form: {
        password: '',
        email: '',
      },
      error: {
        password: '',
        email: '',
      },
      isTouched: {
        password: false,
        email: false,
      },
      openProgress: false,
      email: '',
      password: '',
    };
  }

  schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  handleChange = field => (event) => {
    const { isTouched, form } = this.state;
    const buttonCheck = this.buttonChecked();
    this.setState({
      form: { ...form, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
      buttonDisable: buttonCheck,
    }, this.handleValidate(field));
  };

  handleValidate = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      email, password,
    } = form;
    this.schema.validate({
      email, password,
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
      email, password,
    } = form;
    this.schema.validate({
      email, password,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
        email,
        password,
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
    if (error.email === '' && error.password === '') {
      return false;
    }
    return true;
  }

  handleAuth = async (event, values) => {
    event.preventDefault();
    this.setState({buttonDisable: false, openProgress: true});
    const { email, password } = this.state;
    const headers={};
    const auth = await callApi({email, password},headers,'/api/user/login','POST',{});

    if (auth.status === 200) {
      localStorage.setItem('token', auth.data.data);
      this.props.history.push('/trainee');
    } else {
      values.openSnack('Error in Authentication', 'error');
      this.setState({buttonDisable: true, openProgress: false});

    }
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
    if (!checkError && touched === 2) {
      result = true;
    } else if (checkError && touched !== 2) {
      result = false;
    }
    return result;
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { classes } = this.props;
    const { showPassword, openProgress, buttonDisable } = this.state;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form}>
            <TextField
              fullWidth
              error={this.getError('email')}
              id="outlined-email-input"
              label="Email Address"
              className={classes.textField}
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
            <TextField
              fullWidth
              error={this.getError('password')}
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
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

            {
              (buttonDisable) ? (
                <SnackbarConsumer>
                  {values => (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={event => this.handleAuth(event, values)}
                      className={classes.submit}
                    >
                      SIGN IN
                  </Button>
                  )
                  }
                </SnackbarConsumer>
              ) : (
                  <Button
                    disabled
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                                        {
                        (openProgress)
                        ?

                      (<Progress size={20} />)
                        :
                        ''
                      }
                    SIGN IN
                  </Button>
                )
            }
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = propTypes;

export default withRouter(withStyles(styles)(Login));

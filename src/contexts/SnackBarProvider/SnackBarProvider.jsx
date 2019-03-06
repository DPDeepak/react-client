import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import MyContext from '../index';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};


const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class MySnackbarContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openSnack: false,
      status: '',
      message: '',
    };
  }

  openSnackBar = (status, message) => {
    this.setState({ openSnack: true, status, message });
  }

  handleClose = () => {
    this.setState({ openSnack: false });
  }

  render() {
    const {
      classes, onClose, children,
    } = this.props;
    const { openSnack, status, message } = this.state;
    const Icon = variantIcon[status];
    return (
      <>
        <MyContext.Provider value={{ handleSnack: this.openSnackBar }}>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openSnack}
            autoHideDuration={5000}
            onClose={this.handleClose}

          >

            <SnackbarContent
              className={classes[status]}
              aria-describedby="client-snackbar"
              message={
                (
                  <span id="client-snackbar" className={classes.message}>
                    <Icon className={classes.iconVariant} />
                    {message}
                  </span>
                )
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={onClose}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
            />
          </Snackbar>
          {children}
        </MyContext.Provider>
      </>
    );
  }
}


MySnackbarContent.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
export default MySnackbarContentWrapper;

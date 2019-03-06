import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {
  Person, Email,
} from '@material-ui/icons';
import * as yup from 'yup';
import MyContext from '../../../../contexts';


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

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStatus: true,
      traineeData: '',
    };
  }

  handleChange = field => (event) => {
    console.log('-----', event.target.value);
    const { traineeData } = this.state;
    const { detail } = this.props;
    detail[field] = event.target.value;
    // const updatedData = Object.assign(traineeData, source);
    this.setState({ buttonStatus: false, traineeData: detail });
  };

  handleSubmit = () => {
    const { traineeData } = this.state;
    const { close } = this.props;
    console.log('Updated Data is ', traineeData);
    this.setState({ buttonStatus: true });
    close(false);
  };

  render() {
    const {
      open, classes, close, detail,
    } = this.props;
    const { buttonStatus } = this.state;
    return (
      <>
        <MyContext.Consumer>
          {(handleSnack) => {
            console.log('-------79-----', handleSnack);
            return (
              <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={close}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter your trainee details
                  </DialogContentText>
                  <TextField
                    fullWidth
                    id="outlined-name"
                    label="Name"
                    value={detail.name}
                    // className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('name')}
                    // onBlur={this.handleOnBlur('name')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                    }}
                  />
                  <TextField
                    fullWidth
                    id="outlined-email-input"
                    label="Email Address"
                    type="email"
                    name="email"
                    value={detail.email}
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('email')}
                    // onBlur={this.handleOnBlur('email')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={close} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSnack('error', 'Not successful')
                    }
                    color="primary"
                    disabled={buttonStatus}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }}
        </MyContext.Consumer>
      </>
    );
  }
}
EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;
export default withStyles(styles)(EditDialog);

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
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../lib/utils/api';
import Progress from '../../../../components/Progress';
import styles from './styles';

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
      startSpin: false,
      spinner: false,
    };
  }

  handleChange = field => (event) => {
    const { detail } = this.props;
    const unchangedData=detail;
    unchangedData[field] = event.target.value;
    this.setState({ buttonStatus: false, traineeData: unchangedData });
  };

  handleSubmit = async (event, values) => {
    event.stopPropagation();
    const { traineeData } = this.state;
    const { close } = this.props;
    this.setState({ buttonStatus: true, spinner: true, startSpin: true });
    const data = {
      id: traineeData._id,
      name: traineeData.name,
      email: traineeData.email,
    }
    const params = {};
    const result = await callApi(data, { Authorization: localStorage.token }, '/api/trainee', 'PUT', params)
    if (result.status === 200) {
      values.openSnack('Successfully update data', 'success');
      this.setState({ spinner: false, startSpin: false });
      close(false);
    } else {
      values.openSnack('Error in updating data', 'error');
      this.setState({ spinner: false, startSpin: false });
      close(false);
    }

  };

  render() {
    const {
      open, close, detail,
    } = this.props;
    const { buttonStatus, startSpin, spinner } = this.state;
    return (
      <>
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
                (
                  <SnackbarConsumer>
                    {values => (
                      <Button
                        variant="contained"
                        onClick={(event) => { this.handleSubmit(event, values) }
                        }
                        color="primary"
                        disabled={buttonStatus}
                      >
                        Submit
                </Button>
                    )}
                  </SnackbarConsumer>
                )
            }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;
export default withStyles(styles)(EditDialog);

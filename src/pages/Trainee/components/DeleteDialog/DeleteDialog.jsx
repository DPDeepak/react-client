import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../lib/utils/api';
import Progress from '../../../../components/Progress';

class DeleteDialog extends React.Component {
  state = {
    open: false,
    startSpin: false,
    spinner: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showDetail = async (detail, openSnack) => {
    this.setState({ spinner: true, startSpin: true });
    const { close, count, skip, closeSuccess } = this.props;
    console.log(count, skip);

    const params = {};
    const result = await callApi({}, { Authorization: localStorage.token }, `/api/trainee/${detail.originalId}`, 'DELETE', params)
    if (result.status === 200) {
      openSnack('Successfully delete data', 'success');
      this.setState({ spinner: false, startSpin: false });
      if(count-1===skip) {
        closeSuccess()
      }
      close();
    } else {
      openSnack('Error in deleting data', 'error');
      this.setState({ spinner: false, startSpin: false });
      close();
    }
  };

  render() {
    const { open, close, detail } = this.props;
    const { startSpin, spinner } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={close}
        >
          <DialogTitle id="draggable-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove trainee ?
            </DialogContentText>
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
                  Delete
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
                      <Button variant="contained" color="primary" onClick={() => this.showDetail(detail, values.openSnack)}>
                        Delete
                    </Button>
                    )
                    }
                  </SnackbarConsumer>
                )
            }


          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackbarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

class DeleteDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showDetail = (detail, openSnack) => {
    console.log('Deleted Details are', detail);
    const date = new Date('2019-02-14');

    const receivedDate = new Date(detail.createdAt);
    console.log();

    (receivedDate < date) ?
      openSnack('Error , Cannot Delete Record ', 'error')
      : openSnack('Successfully Delete Record ', 'success');

    const { close } = this.props;
    close();
  };

  render() {
    const { open, close, detail } = this.props;
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
            <SnackbarConsumer>
              {values => (
                <Button variant="contained" color="primary" onClick={() => this.showDetail(detail, values.openSnack)}>
                  Delete
                </Button>
              )
              }
            </SnackbarConsumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;

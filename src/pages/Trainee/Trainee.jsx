import React from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components';

export default class Trainee extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (value) => {
    this.setState({ open: value });
  };

  handleSubmit = (form) => {
    this.setState({ open: false });
    console.log(form);
  };

  render() {
    const { open } = this.state;
    console.log('---------', this.props);

    return (
      <>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickOpen}
          >
            Add Trainee
          </Button>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        </div>
      </>
    );
  }
}

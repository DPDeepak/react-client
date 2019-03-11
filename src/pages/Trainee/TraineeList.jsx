import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddDialog from './components';
import TraineeTable from './TraineeTable';
import { trainees } from './data/trainees';
import { column } from './data/column';
import DeleteDialog from './components/DeleteDialog/DeleteDialog';
import EditDialog from './components/EditDialog';

class TraineeList extends React.Component {
  state = {
    open: false,
    order: 'asc',
    orderBy: '',
    act: '',
    traineeDetail: '',
    page: 0,
    count: 100,
    rowsPerPage: 10,
    deleteOpen: false,
    editOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangePage = (page) => {
    this.setState({ page });
  };

  handleClose = (value) => {
    this.setState({ open: value });
  };

  handleSort = (field, order) => {
    console.log('onSort', field);
    console.log('orderBy', field);
    console.log('HandleOrder', order);
    this.setState({ order: (order) === 'asc' ? 'desc' : 'asc', act: field });
  };

  handleEditDialogOpen = (event, trainee) => {
    event.preventDefault();
    this.setState({ editOpen: true, traineeDetail: trainee });
  };

  handleRemovalDialogOpen = (event, trainee) => {
    event.preventDefault();
    this.setState({ deleteOpen: true, traineeDetail: trainee });
  };

  handleDialogClose = () => {
    this.setState({ deleteOpen: false, editOpen: false });
  }

  handleSubmit = (form) => {
    this.setState({ open: false });
    console.log(form);
  };

  handleSelect = (id) => {
    this.props.history.push(`/trainee/${id}`);
  };

  render() {
    const {
      open, order, orderBy, act, page, count, rowsPerPage, deleteOpen, editOpen, traineeDetail,
    } = this.state;

    return (
      <>
        <div>
          <div style={{ textAlign: 'right', marginTop: 10 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Add Trainee
            </Button>
          </div>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
          <EditDialog open={editOpen} close={this.handleDialogClose} detail={traineeDetail} />
          <DeleteDialog open={deleteOpen} close={this.handleDialogClose} detail={traineeDetail} />
          <TraineeTable
            data={trainees}
            column={column}
            orderBy={orderBy}
            order={order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
            act={act}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.handleChangePage}
            count={count}
            actions={[
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleRemovalDialogOpen,
              },
            ]}
          />
        </div>
      </>
    );
  }
}

export default TraineeList;

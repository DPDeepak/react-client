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
import callApi from '../../lib/utils/api';
import getDateFormatted from '../../lib/utils';
import withLoaderAndMessage from '../../components/HOC';
import { limit } from './data/constants';


class TraineeList extends React.Component {
  state = {
    open: false,
    order: 'asc',
    orderBy: '',
    act: '',
    traineeDetail: '',
    page: 0,
    count: 0,
    dataLength: 0,
    rowsPerPage: limit,
    deleteOpen: false,
    editOpen: false,
    records: [],
    loader: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangePage = (page) => {
    this.setState({ page, loader: true }, () => {
      this.getData();
    });
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


  async getData() {
    const { page } = this.state;
    const skip = page * limit;

    const auth = await callApi({}, { Authorization: localStorage.token }, `/api/trainee?skip=${skip}&limit=${limit}`, 'GET');

    const { count, records } = auth.data.data;
    const dataToShow = count - skip;
    this.setState({ records, count, loader: false, dataLength: dataToShow }, () => {
      console.log('------102-----', this.state.dataLength);

    })
  }

  async componentDidMount() {
    this.getData()
  }

  render() {
    console.log('-------115----', this);

    const {
      open, order, orderBy, act, page, count, rowsPerPage, deleteOpen, editOpen, traineeDetail, records, loader, dataLength
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
            data={records}
            loader={loader}
            dataLength={dataLength}
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

// const EnhanceTraineeList = withLoaderAndMessage(TraineeList);
export default TraineeList;


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
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

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
    skip: 0,
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
    this.setState({ open: value }, () => (this.getData()));
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
    this.setState({ deleteOpen: false, editOpen: false }, () => (this.getData()));
  }

  handleDeleteClose = () => {
    const { page, count } = this.state
    const previousPage = page - 1;
    this.setState({ deleteOpen: false, editOpen: false, page: previousPage }, () => (this.getData()));
  }

  handleSubmit = (form) => {
    this.setState({ open: false });
  };

  handleSelect = (id) => {
    this.props.history.push(`/trainee/${id}`);
  };


  async getData() {
    const { page } = this.state;
    const { values } = this.props;

    const skip = page * limit;
    const params = { limit, skip }
    const auth = await callApi({}, { Authorization: localStorage.token }, '/api/trainee', 'GET', params);
    if (auth.status === 200) {
      const { count, records } = auth.data.data;
      const dataToShow = count - skip;
      this.setState({ records, count, loader: false, dataLength: dataToShow, skip })
      // values.openSnack('Successfully fetch data', 'success');
    } else {
      values.openSnack('Error in fetching data', 'error');
      this.setState({ records: [], count: 0})

    }
  }

  async componentDidMount() {
    this.getData()
  }

  render() {
    const {
      open, order, orderBy, act, page, count, rowsPerPage, deleteOpen, editOpen, traineeDetail, skip, records, loader, dataLength
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
          <DeleteDialog open={deleteOpen} close={this.handleDialogClose} closeSuccess={this.handleDeleteClose} detail={traineeDetail} count={count} skip={skip} />
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

export default ({ ...rest }) => (
  <SnackbarConsumer>
    {values => (
      <TraineeList values={values} {...rest} />
    )
    }
  </SnackbarConsumer>
)

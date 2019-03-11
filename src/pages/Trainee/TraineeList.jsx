import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddDialog from './components';
import TraineeTable from './TraineeTable';
import { trainees } from './data/trainees';
import { column } from './data/column';


class TraineeList extends React.Component {

  state = {
    open: false,
    order: 'asc',
    orderBy: '',
    act: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
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

  handleSubmit = (form) => {
    this.setState({ open: false });
    console.log(form);
  };

  handleSelect = (id) => {
    this.props.history.push(`/trainee/${id}`);
  };

  render() {
    const { open, order, orderBy, act } = this.state;

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
          <TraineeTable
            data={trainees}
            column={column}
            orderBy={orderBy}
            order={order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
            act={act}
          />

          <div>
            <ul>
              {trainees.map(trainee => (
                <li>
                  <Link to={`/trainee/${trainee.id}`}>{trainee.name}</Link>
                </li>
              ))
              }
            </ul>
          </div>

        </div>
      </>
    );
  }
}

export default TraineeList;

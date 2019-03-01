import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddDialog from './components';
import TraineeDetail from './TraineeDetail';
import TraineeTable from './TraineeTable';
import { trainees } from './data/trainees';
import { column } from './data/column';

class TraineeList extends React.Component {
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
          <TraineeTable data={trainees} column={column} />

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

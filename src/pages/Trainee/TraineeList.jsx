import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AddDialog from './components';
import TraineeDetail from './TraineeDetail1';

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
    console.log('-----------26-- trainee list-----', this);

    const { open } = this.state;
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
          <div>
            <ul>
              <li>
                <Link to="/trainee/5c6c47af7740654f0915fac9">Sachin Tendulkar</Link>
              </li>
              <li>
                <Link to="/trainee/5c6c47af7740654f0455fac9">Virat Kohli</Link>
              </li>
              <li>
                <Link to="/trainee/5c6567af7740654f0915fac9">M.S. Dhoni</Link>
              </li>
              <li>
                <Link to="/trainee/5c6c47af7747854f0915fac9">Rohit Sharma</Link>
              </li>
              <li>
                <Link to="/trainee/5c6c47af7740654f0915876c9">Bumrah</Link>
              </li>
            </ul>
          </div>

        </div>
      </>
    );
  }
}

export default TraineeList;

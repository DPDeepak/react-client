import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loginButton: {
    marginLeft: '30px',
  },
};

const handleLogout =() => {
  localStorage.removeItem('token')
}

function Navbar(props) {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Link color="inherit" component={RouterLink} to="/trainee">
            <Button color="inherit">Trainee</Button>
          </Link>
          <Link color="inherit" component={RouterLink} to="/text-field">
            <Button color="inherit">TextField Demo</Button>
          </Link>
          <Link color="inherit" component={RouterLink} to="/input-demo">
            <Button color="inherit">Input Demo</Button>
          </Link>
          <Link color="inherit" component={RouterLink} to="/children-demo">
            <Button color="inherit">Children Demo</Button>
          </Link>
          <Link color="inherit" component={RouterLink} to="/login">
          <Button color="inherit" className={classes.loginButton} onClick={handleLogout} >Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(Navbar);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';


function Navbar(props) {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Button color="inherit">Trainee</Button>
          <Button color="inherit">TextField Demo</Button>
          <Button color="inherit">Input Demo</Button>
          <Button color="inherit">Children Demo</Button>
          <Button color="inherit" className={classes.loginButton}>Login</Button>
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

import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';


const propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

function Progress(props) {
  const { size=20,margin=0, classes } = props
  return (
    <CircularProgress className={classes} size={size} margin={margin} />
  )
}

export default (withStyles(styles)(Progress));

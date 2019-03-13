import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

function Footer(props) {
  const { classes } = props;
  return (
    <>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          &#169; Successive Technologies
        </Typography>
      </footer>
    </>
  );
}
Footer.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(Footer);

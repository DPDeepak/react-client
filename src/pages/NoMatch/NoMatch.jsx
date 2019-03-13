import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  div: {
    marginTop: theme.spacing.unit,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function NoMatch(props) {
  const { classes, heading, message } = props;
  return (
    <>
      <div className={classes.div}>
        <Typography variant="h3" align="center" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {message}
        </Typography>
      </div>
    </>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(NoMatch);

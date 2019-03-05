import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileModule from './profileModule'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function ProfileInner(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <ProfileModule
              age={props.age}
              userName={props.userName}
              company={props.company}
              job={props.job}
              country={props.country}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>{props.profilePicture}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ProfileInner);

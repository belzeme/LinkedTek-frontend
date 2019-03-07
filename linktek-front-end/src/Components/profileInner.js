import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import ProfileModule from './profileModule';
import TimelineModule from './timelineModule';
import SearchModule from './searchModule'


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
      <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
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
          <Paper className={classes.paper}>
            <TimelineModule
              job={props.job}
              company={props.company}
              names={props.names}
              namesState={props.namesState}/>
          </Paper>
        </Grid>
        <Grid item xs>
          <SearchModule
            result={props.result}
            resultPicture={props.resultPicture}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ProfileInner);

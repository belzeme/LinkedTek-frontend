import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import ProfileModule from '../../../Components/ProfileModule.js';
import TimelineModule from '../../../Components/timelineModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class ProfileInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
         <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
           <Grid item xs>
             <Paper className={classes.paper}>
               <ProfileModule
                age={this.props.age}
                userName={this.props.userName}
                company={this.props.company}
                job={this.props.job}
                country={this.props.country}
                companies={this.props.companies}
                company={this.props.company}/>
             </Paper>
           </Grid>
           <Grid item xs>
             <Paper className={classes.paper}>
                <TimelineModule
                  job={this.props.job}
                  company={this.props.company}
                  names={this.props.names}
                  namesState={this.props.namesState}
                  companies={this.props.companies}/>
              </Paper>
           </Grid>
           <Grid item xs>
           </Grid>
         </Grid>
       </div>
    );
  }
}

export default withStyles(styles)(ProfileInner);

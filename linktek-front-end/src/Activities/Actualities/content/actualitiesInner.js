import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FeedModule from '../../../Components/Actualities/feedModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ActualitiesInner class
/** Handle the grid of feed page */
class ActualitiesInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FeedModule
          feed={this.props.feed}
          userEmail={this.props.userEmail}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ActualitiesInner);

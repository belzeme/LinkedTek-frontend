import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ReactDOM from 'react-dom';
import ActualityDetails from '../../Activities/Actualities/ActualityDetails.js';

const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class FeedModule extends React.Component {
  state = { expanded: false };

  handleFeedRowFrom(value) {
    return 'From : ' + value[1];
  }

  handleFeedRowDate(value) {
    return value[3] + ' : ' + value[4];
  }

  handleFeedRowTitle(value) {
    return value[0];
  }

  handleFeedRowContent(value) {
    return value[2];
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{maxHeight: 1000, overflow: 'auto', marginTop: 40}}>
        <List dense className={classes.root}>
          {this.props.feed.map((value, index) => (
            <Paper key={index} style={{marginBottom: 10, maxWidth: 800, minWidth: 800}}>
              <ListItem key={value} button onClick={() => {ReactDOM.render(<ActualityDetails />, document.getElementById('root')); }}>
                <div>
                  <ListItemText primary={this.handleFeedRowDate(value)} secondary={this.handleFeedRowFrom(value)} style={{height: 80}}/>
                  <p style={{marginTop: -20}}>{this.handleFeedRowTitle(value)}</p>
                  <p style={{color: 'grey'}}>{this.handleFeedRowContent(value)}</p>
                </div>
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(FeedModule);

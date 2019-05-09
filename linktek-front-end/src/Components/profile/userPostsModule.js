import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ReactDOM from 'react-dom';
import ActualityDetails from '../../Activities/Actualities/ActualityDetails.js';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});


class UserPostsModule extends React.Component {
  state = {
  };

  handleCardTitle() {
    return this.props.userName + ' Posts';
  }

  handlePostDate(value) {
   return value[0] + ' : ' + value[1];
  }

  handleRowTitle(value) {
   return value[2];
  }

  handleRowContent(value) {
   return value[3];
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card} style={{marginTop: 20}}>
        <CardHeader
          title={this.handleCardTitle()}
        />
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <List dense className={classes.root}>
            {this.props.userPosts.map((value, index) => (
              <Paper key={index} style={{marginBottom: 10, maxWidth: 450, minWidth: 450, marginLeft: 20}}>
                <ListItem key={value} button onClick={() => {ReactDOM.render(<ActualityDetails />, document.getElementById('root'));}}>
                  <div>
                    <ListItemText primary={this.handlePostDate(value)} style={{height: 80}}/>
                    <p style={{marginTop: -40}}>{this.handleRowTitle(value)}</p>
                    <p style={{color: 'grey'}}>{this.handleRowContent(value)}</p>
                  </div>
                </ListItem>
              </Paper>
            ))}
          </List>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(UserPostsModule);

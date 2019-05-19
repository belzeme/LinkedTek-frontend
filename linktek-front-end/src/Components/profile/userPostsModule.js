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

  handlePostDate(index) {
    let tmp = Object.values(this.props.userPosts[index]);
    return 'Date : ' + tmp[0].creation_time;
 }

  handleRowTitle(index) {
    let tmp = Object.values(this.props.userPosts[index]);
    return tmp[0].title;
 }

  handleRowContent(index) {
    let tmp = Object.values(this.props.userPosts[index]);
    return tmp[0].content;
 }

 loadActualityDetails(index) {
   ReactDOM.render(<ActualityDetails
     userEmail={this.props.userEmail}
     postId={this.props.handlePostId(index)}
     postTitle={this.handleRowTitle(index)}
     postContent={this.handleRowContent(index)}
     postDate={this.handlePostDate(index)}
     postOwner={this.props.userName}
     />, document.getElementById('root'));
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
                <ListItem key={index} button onClick={() => this.loadActualityDetails(index)}>
                  <div>
                    <ListItemText primary={this.handlePostDate(index)} style={{height: 80}}/>
                    <p style={{marginTop: -40}}>{this.handleRowTitle(index)}</p>
                    <p style={{color: 'grey'}}>{this.handleRowContent(index)}</p>
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

import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

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

class CommentsModule extends React.Component {
  state = {
  };

  handleCommentFrom(index) {
    return 'From : ' + this.props.commentsFrom[index];
  }

  handleCommentDate(index) {
    return 'Date : ' + this.props.commentsDate[index];
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="View All Comments"
        />
        <div style={{maxHeight: 550, overflow: 'auto', marginTop: 10, marginLeft: 20}}>
          <List dense className={classes.root}>
            {this.props.comments.map((value, index) => (
              <Paper key={index} style={{marginBottom: 10, maxWidth: 450, minWidth: 450}}>
                <ListItem key={value}>
                  <div>
                    <ListItemText primary={value} style={{height: 'auto'}}/>
                    <p style={{fontSize: 13}}>{this.handleCommentFrom(index)}</p>
                    <p style={{fontSize: 13, marginTop: -10, color: 'grey'}}>{this.handleCommentDate(index)}</p>
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

export default withStyles(styles)(CommentsModule);

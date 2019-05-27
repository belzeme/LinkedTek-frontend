import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import ListItemText from '@material-ui/core/ListItemText';

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

class PostModule extends React.Component {
  state = {
  };

  handlePostFrom() {
    return 'From : ' + this.props.from;
  }

  parseISOString(date) {
    return Date(date);
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.postTitle}
        />
        <CardActions className={classes.actions}>
          <div style={{width: "95%"}}>
            <ListItemText primary={this.handlePostFrom()} secondary={this.props.date} style={{height: 80}}/>
            <p style={{color: 'grey'}}>{this.props.content}</p>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(PostModule);

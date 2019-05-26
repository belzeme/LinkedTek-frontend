import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';

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

class InboxModule extends React.Component {

  handleFeedRowTo(index) {
    let tmp = Object.values(this.props.inbox[index]);
    return tmp[0].fromName + ' : ' + tmp[0].fromMail;
  }

  handleFeedRowDate(index) {
    let tmp = Object.values(this.props.inbox[index]);
    return tmp[0].date;
    //return 'date';
  }

  handleFeedRowTitle(index) {
    let tmp = Object.values(this.props.inbox[index]);
    return tmp[0].title;
  }

  handleFeedRowContent(index) {
    let tmp = Object.values(this.props.inbox[index]);
    return tmp[0].content;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Inbox"
        />
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <List dense className={classes.root}>
            {this.props.inbox.map((value, index) => (
              <Paper key={index} style={{maxWidth: 440, minWidth: 440, marginBottom: 50, marginLeft: 20}}>
                <ListItem key={index}>
                  <div>
                    <ListItemText primary={this.handleFeedRowDate(index)} secondary={this.handleFeedRowTo(index)} style={{height: 80}}/>
                    <p style={{marginTop: -20}}>{this.handleFeedRowTitle(index)}</p>
                    <p style={{color: 'grey'}}>{this.handleFeedRowContent(index)}</p>
                  </div>
                </ListItem>
                <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
                  <Grid item xs>
                    <Button variant="outlined" color="default" className={classes.button} onClick={this.props.handleReplyMessageModalShow(index)}>
                      Reply
                      <ReplyIcon className={classes.rightIcon} style={{marginLeft: 10}}/>
                    </Button>
                  </Grid>
                  <Grid item xs>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </List>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(InboxModule);

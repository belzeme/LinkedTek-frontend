import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';

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
    //let tmp = Object.values(this.props.outbox[index]);
    return 'From : Undefined';
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
                    <Button variant="outlined" color="default" className={classes.button} onClick={this.props.handleReplyMessageModalShow}>
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
        {/*Modal for reply message*/}
        <Modal visible={this.props.modalReplyMessageVisible} width="400" height="350" effect="fadeInUp" onClickAway={() => this.props.handleReplyMessageModalClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{}</h2>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <TextField
                id="standard-with-placeholder"
                label="Reply Content"
                onChange={this.props.handleReplyMessageContentChange('content')}
                className={classes.textField}
                margin="normal"
                multiline={true}
                rows={1}
                rowsMax={7}
                style={{marginLeft: 10, width: "99%"}}
              />
            </div>
            <div style={{width: "100%", marginTop: 10}}>
              <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 10, marginTop: 10}} onClick={this.props.handleReplyMessageModalClose}>
                Send
                <SendIcon className={classes.rightIcon} style={{marginLeft: 10}}/>
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(InboxModule);

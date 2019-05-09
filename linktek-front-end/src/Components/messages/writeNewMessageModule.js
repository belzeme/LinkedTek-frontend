import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Dropdown from 'react-dropdown';

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


class WriteNewMessageModule extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title="Write New Message"
        />
        <CardActions>
          <p style={{marginLeft: 20}}>
            To :
          </p>
          <div style={{marginLeft: 20}}>
            <Dropdown
              options={this.props.contact}
              onChange={this.props.handleSelectedContactChange}
              value={this.props.selectedContact}
              placeholder="Select any contact"
              style={{width: 200}}/>
          </div>
        </CardActions>
        <CardActions>
          <div style={{width: "99%", marginTop: -5}}>
            <TextField
              id="standard-with-placeholder"
              label="Message Title"
              onChange={this.props.handleNewMessageTitleChange('title')}
              className={classes.textField}
              margin="normal"
              style={{marginLeft: 10, width: "99%"}}
            />
          </div>
        </CardActions>
        <CardActions>
          <div style={{width: "100%", marginTop: -20}}>
            <TextField
              id="standard-with-placeholder"
              label="Message Content"
              className={classes.textField}
              onChange={this.props.handleNewMessageContentChange('content')}
              margin="normal"
              multiline={true}
              rows={1}
              rowsMax={7}
              style={{marginLeft: 10, width: "99%"}}
            />
          </div>
        </CardActions>
        <CardActions>
          <div style={{width: "100%", marginTop: 10}}>
            <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 10}}>
              Send
              <SendIcon className={classes.rightIcon} style={{marginLeft: 10}}/>
            </Button>
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(WriteNewMessageModule);

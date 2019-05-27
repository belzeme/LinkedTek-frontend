import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

class MyCommentsModule extends React.Component {

  parseISOString(date) {
    return Date(date);
  }

  handlePostDate(index) {
    let tmp = Object.values(this.props.myComments[index]);
    return this.parseISOString(tmp[0].postDate);
  }

  handleCommentDate(index) {
    let tmp = Object.values(this.props.myComments[index]);
    return this.parseISOString(tmp[0].myCommentDate);

  }

  handleRowTitle(index) {
    let tmp = Object.values(this.props.myComments[index]);
    return 'Title : ' + tmp[0].postTitle;
  }

  handleRowContent(index) {
    let tmp = Object.values(this.props.myComments[index]);
    return 'Content : ' + tmp[0].postContent;
  }

  handlePostFrom(index) {
    let tmp = Object.values(this.props.myComments[index]);
    return 'From : ' + tmp[0].postOwner;
  }

  handleRowComment(index) {
    let tmp = Object.values(this.props.myComments[index]);
    return tmp[0].myComment;
  }

 render() {
   const { classes } = this.props;
   return (
    <Card className={classes.card}>
      <CardHeader
        title="My Comments"
      />
      <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
        <List dense className={classes.root}>
          {this.props.myComments.map((value, index) => (
            <Paper key={index} style={{marginBottom: 10, maxWidth: 450, minWidth: 450, marginLeft: 20}}>
              <ListItem key={index}>
                <div>
                  <p>Original Post</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10}}>{this.handlePostFrom(index)}</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10, marginTop: -10}}>{this.handlePostDate(index)}</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10}}>{this.handleRowTitle(index)}</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10, marginTop: -10}}>{this.handleRowContent(index)}</p>
                </div>
              </ListItem>
              <ListItem button onClick={() => this.props.handleEditCommentModalShow(index)}>
                <div style={{marginTop: -15}}>
                  <p>My Comment</p>
                  <p style={{marginLeft: 10}}>{this.handleCommentDate(index)}</p>
                  <p style={{marginLeft: 10}}>{this.handleRowComment(index)}</p>
                </div>
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
      <Modal visible={this.props.editCommentModalVisible} width="500" height="380" effect="fadeInUp" onClickAway={() => this.props.handleEditCommentModalClose()}>
        <CardHeader
          title="Edit Comment"
        />
        <div>
          {/*texfield for comment*/}
          <TextField
            id="standard-with-placeholder"
            label="Comment"
            className={classes.textField}
            margin="normal"
            multiline={true}
            rows={1}
            rowsMax={7}
            onChange={this.props.handleEditComment('comment')}
            placeholder={this.props.editComment}
            value={this.props.editComment}
            style={{marginLeft: 10, width: "95%"}}
          />
        </div>
        <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.props.handleEditCommentValidation()}>
          Edit Comment
        </Button>
        <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.props.removeComment()}>
          Delete Comment
        </Button>
      </Modal>
    </Card>
    );
  }
}

export default withStyles(styles)(MyCommentsModule);

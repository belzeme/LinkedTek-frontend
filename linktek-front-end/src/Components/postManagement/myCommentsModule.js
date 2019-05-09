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

 handlePostDate(value) {
   return value[3] + ' : ' + value[4];
 }

 handleCommentDate(value) {
  return value[0] + ' : ' + value[1];
 }

  handleRowTitle(value) {
   return value[5];
 }

  handleRowContent(value) {
   return value[6];
 }

 handlePostFrom(value) {
   return 'From : ' + value[7];
 }

 handleRowComment(value) {
   return value[2];
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
              <ListItem key={value}>
                <div>
                  <p>Original Post</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10}}>{this.handlePostFrom(value)}</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10, marginTop: -10}}>{this.handlePostDate(value)}</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10}}>{this.handleRowTitle(value)}</p>
                  <p style={{color: 'grey', fontStyle: 'italic', marginLeft: 10}}>{this.handleRowContent(value)}</p>
                </div>
              </ListItem>
              <ListItem button onClick={() => this.props.handleEditCommentModalShow(value)}>
                <div style={{marginTop: -15}}>
                  <p>My Comment</p>
                  <p style={{marginLeft: 10}}>{this.handleCommentDate(value)}</p>
                  <p style={{marginLeft: 10}}>{this.handleRowComment(value)}</p>
                </div>
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
      <Modal visible={this.props.editCommentModalVisible} width="500" height="320" effect="fadeInUp" onClickAway={() => this.props.handleEditCommentModalClose()}>
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
        <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}}>
          Edit Comment
        </Button>
      </Modal>
    </Card>
    );
  }
}

export default withStyles(styles)(MyCommentsModule);

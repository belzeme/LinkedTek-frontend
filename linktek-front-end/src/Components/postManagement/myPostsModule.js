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

class MyPostsModule extends React.Component {

  handlePostDate(index) {
    let tmp = Object.values(this.props.myPosts[index]);
    return tmp[0].creation_time;
 }

  handleRowTitle(index) {
    let tmp = Object.values(this.props.myPosts[index]);
    return tmp[0].title;
 }

  handleRowContent(index) {
    let tmp = Object.values(this.props.myPosts[index]);
    return tmp[0].content;
 }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title="My Post"
        />
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <List dense className={classes.root}>
            {this.props.myPosts.map((value, index) => (
              <Paper key={index} style={{marginBottom: 10, maxWidth: 450, minWidth: 450, marginLeft: 20}}>
                <ListItem key={index} button onClick={() => this.props.handleEditPostModalShow(index)}>
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
        <Modal visible={this.props.editPostModalVisible} width="500" height="500" effect="fadeInUp" onClickAway={() => this.props.handleEditPostModalClose()}>
          <CardHeader
            title="Edit Post"
          />
          <div>
            {/*textField post title*/}
            <TextField
              id="standard-with-placeholder"
              label="Title"
              className={classes.textField}
              margin="normal"
              onChange={this.props.handleEditPostTitle('title')}
              placeholder={this.props.editPostTitle}
              value={this.props.editPostTitle}
              style={{marginLeft: 10, width: "95%"}}
            />
            {/*texfield for post content*/}
            <TextField
              id="standard-with-placeholder"
              label="Content"
              className={classes.textField}
              margin="normal"
              multiline={true}
              rows={1}
              rowsMax={7}
              onChange={this.props.handleEditPostContent('content')}
              placeholder={this.props.editPostContent}
              value={this.props.editPostContent}
              style={{marginLeft: 10, width: "95%"}}
            />
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.props.handleEditPostValidation()}>
            Edit Post
          </Button>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 10}} onClick={() => this.props.loadActualityDetails()}>
            View post detail
          </Button>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 10}} onClick={() => this.props.removePost()}>
            Remove Post
          </Button>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(MyPostsModule);

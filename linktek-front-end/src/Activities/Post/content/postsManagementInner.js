import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddPostModule from '../../../Components/postManagement/addPostModule.js';
import MyPostsModule from '../../../Components/postManagement/myPostsModule.js';
import MyCommentsModule from '../../../Components/postManagement/myCommentsModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class PostManagementInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto", marginTop: 20}}>
          <Grid item xs>
            <AddPostModule
              handleNewPostTitleChanged={this.props.handleNewPostTitleChanged}
              handleNewPostContentChanged={this.props.handleNewPostContentChanged}
              contact={this.props.contact}
              selectedContact={this.props.selectedContact}
              handleSelectedContactChange={this.props.handleSelectedContactChange}
              handleNewPost={this.props.handleNewPost}
              userEmail={this.props.userEmail}
            />
          </Grid>
          <Grid item xs>
            <MyPostsModule
              myPosts={this.props.myPosts}
              editPostModalVisible={this.props.editPostModalVisible}
              handleEditPostModalClose={this.props.handleEditPostModalClose}
              handleEditPostModalShow={this.props.handleEditPostModalShow}
              editPostContent={this.props.editPostContent}
              editPostTitle={this.props.editPostTitle}
              handleEditPostContent={this.props.handleEditPostContent}
              handleEditPostTitle={this.props.handleEditPostTitle}
              removePost={this.props.removePost}
              handleEditPostValidation={this.props.handleEditPostValidation}
            />
          </Grid>
          <Grid item xs>
            <MyCommentsModule
              myComments={this.props.myComments}
              editCommentModalVisible={this.props.editCommentModalVisible}
              handleEditCommentModalShow={this.props.handleEditCommentModalShow}
              handleEditCommentModalClose={this.props.handleEditCommentModalClose}
              handleEditComment={this.props.handleEditComment}
              editComment={this.props.editComment}
              removeComment={this.props.removeComment}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PostManagementInner);

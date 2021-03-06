import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from '@material-ui/icons/PowerSettingsNew';
import Login from '../Login/Login.js';
import ReactDOM from 'react-dom';
import Inner from './content/postsManagementInner.js'
import Modal from 'react-awesome-modal';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import ActualityDetails from '../Actualities/ActualityDetails.js';
import { mainListItems } from '../../Components/leftMenu';
import axios from 'axios';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

// Post class
/** Handle the post management page */
class Post extends React.Component {
  state = {
    open: true,
    newPostTitle: '',
    isModalDeleteCommentConfirmationVisible: false,
    newPostContent: '',
    myPosts: [],
    myComments: [],
    contact: [],
    isModalDeletePostConfirmationVisible: false,
    selectedContact: 0,
    editPostModalVisible: false,
    editCommentModalVisible: false,
    editPostContent: '',
    editPostTitle: '',
    editComment: '',
    userRelations: [],
    userRelationMails: [],
    currentMessageId: '',
    updatePost: [
      {label: "title", value: ""},
      {label: "content", value: ""}
    ],
    updateComment: [
      {label: "title", value: ""},
      {label: "content", value: ""}
    ],
    currentCommentId: '',
    postId: '',
    postTitle: '',
    postContent: '',
    postDate: '',
    postOwner: '',
  };

  /**
   * Request the data required from component.
   * Get user posts list
   * Get user comments list
   * Get user relations list
   */
  componentWillMount() {
    axios.post(`http://127.0.0.1:3010/post/list`, {email: this.props.userEmail})
    .then(ret => {
      console.log(ret)
      this.setState({myPosts: []});
      this.handlePostList(ret);
    })
    .catch(error => console.log(error));

    axios.post(`http://127.0.0.1:3010/comment/user`, {email: this.props.userEmail})
    .then(ret => {
      this.setState({myComments: []});
      this.handleUserCommentsList(ret);
    })
    .catch(error => console.log(error));

    axios.post(`http://127.0.0.1:3010/account/leader/list`, {email: this.props.userEmail})
    .then(ret => {
      this.setState({userRelations: []});
      this.setState({userRelationMails: []});
      this.setState({contact: []});
      this.handleRelationList(ret);
    })
    .catch(error => console.log('error : ' + error));
  }

  /**
   * Internal function used for set the comment list row into react properties
   * @param {object} ret The comment list row
   */
  addItemToCommentList(ret) {
    let tmpComment = this.state.myComments;
    let val = Object.values(ret);
    let tmp = [{
      postTitle: val[0].title,
      postContent: val[0].content,
      postDate: val[0].creation_time,
      postOwner: val[3].name,
      myComment: val[2].content,
      myCommentDate: val[2].creation_time,
      myCommentId: val[2].id
    }];
    tmpComment.push(tmp);
    this.setState({myComment: tmpComment});
  }

  /**
   * Internal function used for set the comment list into react properties
   * @param {object} ret The comment list
   */
  handleUserCommentsList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToCommentList(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for comment remove
   * Display confirmation popup
   */
  removeComment = () => {
    this.setState({editCommentModalVisible: false});
    this.handleDeleteCommentModalConfirmationShow();
  }

  /**
   * Internal function used for set user realtion into react properties
   * @param {object} value The user relation row
   */
  addItemToUserRelations(value){
    //console.log('name : ' + value.name);
    //console.log('email : ' + value.email);
    let tmp = this.state.userRelations;
    tmp.push(value.name);
    this.setState({userRelations: tmp});
    tmp = this.state.userRelationMails;
    tmp.push(value.email);
    this.setState({userRelationMails: tmp});
  }

  /**
   * Internal function used for set user realtion list into react properties
   * @param {object} ret The user relation list
   */
  handleRelationList(ret) {
    //console.log(ret);
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToUserRelations(value[k]));
      }
      i++;
    }
    let tmp = this.state.contact;
    let next;
    for (let j = 0; j < this.state.userRelations.length; j++) {
      next = this.state.userRelations[j] + ' : ' + this.state.userRelationMails[j];
      tmp.push(next);
    }
    this.setState({contact: tmp});
  }

  /**
   * Internal function used to save post properties into react properties
   */
  handlePostProperties() {
    let tmp = this.state.updatePost;
    tmp[0].value = this.state.editPostTitle;
    tmp[1].value = this.state.editPostContent;
    this.setState({updatePost: tmp});
  }

  /**
   * Internal function used to save comment properties into react properties
   */
  handleCommentProperties() {
    let tmp = this.state.updateComment;
    tmp[0].value = 'Comment';
    tmp[1].value = this.state.editComment;
    this.setState({updatePost: tmp});
  }

  /**
   * Internal function used for handling the post list
   * @param {object} ret The return of backend gateway object.
   */
  handlePostList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addPropsToState(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for add user post into react properties
   * @param {object} value The user post row
   */
  addPropsToState(row) {
    let ret = this.state.myPosts;
    let tmp = [
      {id: row.id, creation_time: row.creation_time, title: row.title, content: row.content},
    ];
    ret.push(tmp);
    this.setState({myPosts: ret});
  }

  /**
   * Internal function used for removing post
   * Display success or failure alert
   */
  handleRemovePost() {
    axios.delete(`http://127.0.0.1:3010/post`, {data: {id: this.state.currentMessageId}})
    .then(ret => {
      //console.log(ret);
      this.handleDeletePostModalConfirmationClose();
      alert('Post deleted with success !');
    })
    .catch(error => {
      //console.log(error);
      this.handleDeletePostModalConfirmationClose();
      alert('Error, post not deleted !');
    });
  }

  /**
   * Internal function used for removing comment
   * Display success or failure alert
   */
  handleRemoveComment() {
    axios.delete(`http://127.0.0.1:3010/comment`, {data: {id: this.state.currentCommentId}})
    .then(ret => {
      //console.log(ret);
      this.handleDeleteCommentModalConfirmationClose();
      alert('Comment deleted with success !');
    })
    .catch(error => {
      //console.log(error);
      this.handleDeleteCommentModalConfirmationClose();
      alert('Error, comment not deleted !');
    });
  }

  /**
   * Function used for editing post
   * Display success or failure alert
   */
  handleEditPostValidation = () => {
    this.handlePostProperties();
    axios.patch(`http://127.0.0.1:3010/post`, {id: this.state.currentMessageId, properties: this.state.updatePost})
    .then(ret => {
      this.setState({editPostModalVisible: false});
      alert('Post edited with success !');
    })
    .catch(error => {
      this.setState({editPostModalVisible: false});
      alert('Error, post had not been edited !');
    });
  }

  /**
   * Function used for editing comment
   * Display success or failure alert
   */
  handleEditCommentValidation = () => {
    this.handleCommentProperties();
    axios.patch(`http://127.0.0.1:3010/comment`, {id: this.state.currentCommentId, properties: this.state.updateComment})
   .then(ret => {
      this.setState({editCommentModalVisible: false});
      alert('Comment edited with success !');
    })
    .catch(error => {
      this.setState({editCommentModalVisible: false});
      alert('Comment, post had not been edited !');
    });
  }

  /**
   * Internal Function used for removing post
   * Display confirmation popup
   */
  removePost = () => {
    this.setState({editPostModalVisible: false});
    this.handleDeletePostModalConfirmationShow();
  }

  /**
   * Function used for open the delete post modal confirmation
   */
  handleDeletePostModalConfirmationShow = () => {
    this.setState({isModalDeletePostConfirmationVisible: true});
  }

  /**
   * Function used for close the delete post modal confirmation
   */
  handleDeletePostModalConfirmationClose = () => {
    this.setState({isModalDeletePostConfirmationVisible: false});
  }

  /**
   * Function used for close the delete comment modal confirmation
   */
  handleDeleteCommentModalConfirmationClose = () => {
    this.setState({isModalDeleteCommentConfirmationVisible: false});
  }

  /**
   * Function used for open the delete comment modal confirmation
   */
  handleDeleteCommentModalConfirmationShow = () => {
    this.setState({isModalDeleteCommentConfirmationVisible: true});
  }

  /**
   * Internal function used for set the newPostTitle into react properties
   * @param {event} event The new newPostTitle value
   */
  handleNewPostTitleChanged = name => event => {
    this.setState({ newPostTitle: event.target.value});
  }

  /**
   * Internal function used for set the newPostContent into react properties
   * @param {event} event The new newPostContent value
   */
  handleNewPostContentChanged = name => event => {
    this.setState({ newPostContent: event.target.value});
  }

  /**
   * Internal function used for set the selectedContact into react properties
   * @param {string} value The new selectedContact value
   */
  handleSelectedContactChange = (value) => {
    this.setState({ selectedContact: value});
  }

  /**
   * Internal function used for set the get the post date
   * @param {string} index The post index value
   * @return {string} the required string
   */
  handlePostDate(index) {
    let tmp = Object.values(this.state.myPosts[index]);
    return 'Date : ' + tmp[0].creation_time;
  }

  /**
   * Internal function used for set the get the post title
   * @param {string} index The post index value
   * @return {string} the required string
   */
  handleRowTitle(index) {
    let tmp = Object.values(this.state.myPosts[index]);
    console.log(tmp[0].title);
    return tmp[0].title;
  }

  /**
   * Internal function used for set the get the post content
   * @param {string} index The post index value
   * @return {string} the required string
   */
  handleRowContent(index) {
    let tmp = Object.values(this.state.myPosts[index]);
    return tmp[0].content;
  }

  /**
   * Internal function used for set the get the post owner
   * @param {string} index The post index value
   * @return {string} the required string
   */
  handlePostOwner(index) {
    return this.props.userName;
  }

  /**
   * Internal function used for set the get the post id
   * @param {string} index The post index value
   * @return {string} the required string
   */
  handlePostId(index) {
    let tmp = Object.values(this.state.myPosts[index]);
    return tmp[0].id;
  }

  /**
   * Function used to load and display the selected post details
   */
  loadActualityDetails = () => {
    ReactDOM.render(<ActualityDetails
      userEmail={this.props.userEmail}
      postId={this.state.postId}
      postTitle={this.state.postTitle}
      postContent={this.state.postContent}
      postDate={this.state.postDate}
      postOwner={this.props.userName}
      />, document.getElementById('root'));
      this.handleEditPostModalClose();
  }

  /**
   * Function used to edit a post details
   * @param {string} index The post index value
   * Display the edit post popup
   */
  handleEditPostModalShow = (index) => {
    let tmp = Object.values(this.state.myPosts[index]);
    this.setState({ editPostContent: tmp[0].content});
    this.setState({ editPostTitle: tmp[0].title});
    this.setState({ currentMessageId: tmp[0].id});
    this.setState({ postId: this.handlePostId(index)});
    this.setState({ postContent: this.handleRowContent(index)});
    this.setState({ postTitle: this.handleRowTitle(index)});
    this.setState({ postDate: this.handlePostDate(index)});
    this.setState({ postOwner: this.handlePostOwner(index)});
    this.setState({ editPostModalVisible: true});
  }

  /**
   * Function used to close the edit post details popup
   */
  handleEditPostModalClose = () => {
    this.setState({ postId: 0});
    this.setState({ postContent: ''});
    this.setState({ postTitle: ''});
    this.setState({ postDate: ''});
    this.setState({ postOwner: ''});
    this.setState({ editPostContent: ''});
    this.setState({ editPostTitle: ''});
    this.setState({currentMessageId: ''});
    this.setState({ editPostModalVisible: false});
  }

  /**
   * Function used to edit a comment details
   * @param {string} index The post index value
   * Display the edit comment popup
   */
  handleEditCommentModalShow = (index) => {
    let tmp = Object.values(this.state.myComments[index]);
    this.setState({ editComment: tmp[0].myComment});
    this.setState({ currentCommentId: tmp[0].myCommentId});
    this.setState({ editCommentModalVisible: true});
  }

  /**
   * Function used to close the edit comment details popup
   */
  handleEditCommentModalClose = () => {
    this.setState({ editComment: ''});
    this.setState({ currentCommentId: 0});
    this.setState({ editCommentModalVisible: false});
  }

  /**
   * Function used to close the edit comment details popup
   */
  handleEditCommentModalValidation = () => {
    this.handleCommentProperties();
    this.setState({ editComment: ''});
    this.setState({ currentCommentId: 0});
    this.setState({ editCommentModalVisible: false});
  }

  /**
   * Internal function used for set the editPostContent into react properties
   * @param {event} event The new editPostContent value
   */
  handleEditPostContent = name => event => {
    this.setState({ editPostContent: event.target.value});
  }

  /**
   * Internal function used for set the editPostTitle into react properties
   * @param {event} event The new editPostTitle value
   */
  handleEditPostTitle = name => event => {
    this.setState({ editPostTitle: event.target.value});
  }

  /**
   * Internal function used for set the editComment into react properties
   * @param {event} event The new editComment value
   */
  handleEditComment = name => event => {
    this.setState({ editComment: event.target.value});
  }

  /**
   * Function used to validate a new post
   * Display success or failure alert
   */
  handleNewPost = () => {
    axios.post(`http://127.0.0.1:3010/post`, {email: this.props.userEmail, title: this.state.newPostTitle, content: this.state.newPostContent})
    .then(ret => {
      alert('Post success !');
    })
    .catch(ret => {
      alert('Post failed !');
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Advanced Cloud : LinkedTek
            </Typography>
            <IconButton color="inherit" onClick={() => {ReactDOM.render(<Login />, document.getElementById('root')); }}>
                <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h3">
            Posts Management
          </Typography>
          <Inner
            handleNewPostTitleChanged={this.handleNewPostTitleChanged}
            handleNewPostContentChanged={this.handleNewPostContentChanged}
            myPosts={this.state.myPosts}
            myComments={this.state.myComments}
            contact={this.state.contact}
            selectedContact={this.state.selectedContact}
            handleSelectedContactChange={this.handleSelectedContactChange}
            editPostModalVisible={this.state.editPostModalVisible}
            handleEditPostModalClose={this.handleEditPostModalClose}
            handleEditPostModalShow={this.handleEditPostModalShow}
            editCommentModalVisible={this.state.editCommentModalVisible}
            handleEditCommentModalShow={this.handleEditCommentModalShow}
            handleEditCommentModalClose={this.handleEditCommentModalClose}
            editPostContent={this.state.editPostContent}
            editPostTitle={this.state.editPostTitle}
            handleEditPostContent={this.handleEditPostContent}
            handleEditPostTitle={this.handleEditPostTitle}
            handleEditComment={this.handleEditComment}
            editComment={this.state.editComment}
            handleNewPost={this.handleNewPost}
            removePost={this.removePost}
            handleEditPostValidation={this.handleEditPostValidation}
            userEmail={this.props.userEmail}
            removeComment={this.removeComment}
            handleEditCommentModalValidation={this.handleEditCommentModalValidation}
            handleEditCommentValidation={this.handleEditCommentValidation}
            loadActualityDetails={this.loadActualityDetails}
          />
        </main>
        <Modal visible={this.state.isModalDeletePostConfirmationVisible} width="500" height="230" effect="fadeInUp" onClickAway={() => this.handleDeletePostModalConfirmationClose()}>
          <CardHeader
            title="Remove Post"
          />
          <div>
            <h3 style={{textAlign: 'center', marginTop: 20}}>This action cannot be undone, continue ?</h3>
          </div>
          <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
            <Grid item xs>
              <Button style={{backgroundColor: '#3f51b5', width: "90%", color: "white", marginTop: 10, marginLeft: 10}} onClick={() => this.handleRemovePost()}>
                Yes
              </Button>
            </Grid>
            <Grid item xs>
              <Button style={{backgroundColor: '#3f51b5', width: "90%", color: "white", marginTop: 10, marginLeft: -10}} onClick={() => this.handleDeletePostModalConfirmationClose()}>
                NO
              </Button>
            </Grid>
          </Grid>
        </Modal>
        <Modal visible={this.state.isModalDeleteCommentConfirmationVisible} width="500" height="230" effect="fadeInUp" onClickAway={() => this.handleDeleteCommentModalConfirmationClose()}>
          <CardHeader
            title="Remove Comment"
          />
          <div>
            <h3 style={{textAlign: 'center', marginTop: 20}}>This action cannot be undone, continue ?</h3>
          </div>
          <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
            <Grid item xs>
              <Button style={{backgroundColor: '#3f51b5', width: "90%", color: "white", marginTop: 10, marginLeft: 10}} onClick={() => this.handleRemoveComment()}>
                Yes
              </Button>
            </Grid>
            <Grid item xs>
              <Button style={{backgroundColor: '#3f51b5', width: "90%", color: "white", marginTop: 10, marginLeft: -10}} onClick={() => this.handleDeleteCommentModalConfirmationClose()}>
                NO
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Post);

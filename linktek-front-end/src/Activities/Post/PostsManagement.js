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

class Post extends React.Component {
  state = {
    open: true,
    newPostTitle: '',
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
  };

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
    }];
    tmpComment.push(tmp);
    this.setState({myComment: tmpComment});
  }

  handleUserCommentsList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToCommentList(value[k]));
      }
      i++;
    }
  }

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

  handlePostProperties() {
    let tmp = this.state.updatePost;
    tmp[0].value = this.state.editPostTitle;
    tmp[1].value = this.state.editPostContent;
    this.setState({updatePost: tmp});
  }

  handlePostList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addPropsToState(value[k]));
      }
      i++;
    }
  }

  addPropsToState(row) {
    let ret = this.state.myPosts;
    //console.log('id : ' + row.id);
    let tmp = [
      {id: row.id, creation_time: row.creation_time, title: row.title, content: row.content},
    ];
    ret.push(tmp);
    this.setState({myPosts: ret});
  }

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

  handleEditPostValidation = () => {
    //console.log('Title : ' + this.state.editPostTitle + '\nComment : ' + this.state.editPostContent + '\nID : ' + this.state.currentMessageId);
    this.handlePostProperties();
    axios.patch(`http://127.0.0.1:3010/post`, {id: this.state.currentMessageId, properties: this.state.updatePost})
    .then(ret => {
      //console.log(ret);
      this.setState({editPostModalVisible: false});
      alert('Post edited with success !');
    })
    .catch(error => {
      //console.log(error);
      this.setState({editPostModalVisible: false});
      alert('Error, post had not been edited !');
    });

  }

  removePost = () => {
    this.setState({editPostModalVisible: false});
    this.handleDeletePostModalConfirmationShow();
  }

  handleDeletePostModalConfirmationShow = () => {
    this.setState({isModalDeletePostConfirmationVisible: true});
  }

  handleDeletePostModalConfirmationClose = () => {
    this.setState({isModalDeletePostConfirmationVisible: false});
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleNewPostTitleChanged = name => event => {
    this.setState({ newPostTitle: event.target.value});
  }

  handleNewPostContentChanged = name => event => {
    this.setState({ newPostContent: event.target.value});
  }

  handleSelectedContactChange = (value) => {
    this.setState({ selectedContact: value});
  }

  handleEditPostModalShow = (index) => {
    let tmp = Object.values(this.state.myPosts[index]);
    this.setState({ editPostContent: tmp[0].content});
    this.setState({ editPostTitle: tmp[0].title});
    this.setState({currentMessageId: tmp[0].id});
    this.setState({ editPostModalVisible: true});
  }

  handleEditPostModalClose = () => {
    this.setState({ editPostModalVisible: false});
    this.setState({ editPostContent: ''});
    this.setState({ editPostTitle: ''});
    this.setState({currentMessageId: ''});
  }

  handleEditCommentModalShow = (value) => {
    this.setState({ editCommentModalVisible: true});
    this.setState({ editComment: value[2]});
  }

  handleEditCommentModalClose = () => {
    this.setState({ editCommentModalVisible: false});
    this.setState({ editComment: ''});
  }

  handleEditPostContent = name => event => {
    this.setState({ editPostContent: event.target.value});
  }

  handleEditPostTitle = name => event => {
    this.setState({ editPostTitle: event.target.value});
  }

  handleEditComment = name => event => {
    this.setState({ editComment: event.target.value});
  }

  handleNewPost = () => {
    //console.log("Mail : " + this.props.userEmail + '\nTitle: ' + this.state.newPostTitle + '\nContent : ' + this.state.newPostContent);
    axios.post(`http://127.0.0.1:3010/post`, {email: this.props.userEmail, title: this.state.newPostTitle, content: this.state.newPostContent})
    .then(ret => {
      //console.log(ret);
      alert('Post success !');
    })
    .catch(ret => {
      //console.log(ret)
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
              LinkTek
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
      </div>
    );
  }
}

export default withStyles(styles)(Post);

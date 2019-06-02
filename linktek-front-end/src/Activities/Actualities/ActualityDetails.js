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
import Inner from './content/actualityDetailsInner.js';
import axios from 'axios';
import { mainListItems } from '../../Components/leftMenu';

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

// ActualityDetails class
/** Handle the selected post */
class ActualityDetails extends React.Component {
  state = {
    open: true,
    postTitle: '',
    from: '',
    date: '',
    content: '',
    comments:[],
    newComment: '',
  };

  /**
   * Request the data required from component.
   * Get the selected post values
   * Get the selected post comments
   */
  componentWillMount() {
    this.handlePostValues();
    //console.log('ID : ' + this.props.postId);
    axios.post(`http://127.0.0.1:3010/post/comment/list`, {id: this.props.postId})
    .then(ret => {
      console.log(ret);
      this.setState({comments: []});
      this.handleCommentList(ret);
    })
    .catch(error => {
      console.log('Comment error');
      console.log(error);
    });
  }

  /**
   * Internal function used for set the newComment into react properties
   * @param {event} event The new newComment value
   */
  handleCommentChange = name => event => {
    this.setState({ newComment: event.target.value});
  }

  /**
   * Internal function used for set the comment row into react properties
   * @param {object} value The comment row
   */
  addItemToComments(value){
    let ret = this.state.comments;
    let tmp = [{date: value.comment.creation_time, content: value.comment.content, from: (value.user.name ? value.user.name : 'Test User')}];
    ret.push(tmp);
    this.setState({comments: ret});
  }

  /**
   * Internal function used for handling the comment list
   * @param {object} ret The return of backend gateway object.
   */
  handleCommentList(ret) {
    this.setState({comments: []});
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToComments(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for handling the post values
   */
  handlePostValues() {
    this.setState({postTitle: this.props.postTitle});
    this.setState({content: this.props.postContent});
    this.setState({date: this.props.postDate});
    this.setState({from: this.props.postOwner});
  }

  /**
   * Function used for post a new comment
   */
  handleAddNewComment = () => {
    if (this.state.newComment === '') {
      alert('Error, new comment field cannot be empty !');
    }
    else {
      console.log('Email : ' + this.props.email + '\nId: ' + this.props.postId + '\nComment : ' + this.state.newComment);
      axios.post(`http://127.0.0.1:3010/comment`, {email: localStorage.getItem('userEmail'), id: this.props.postId, content: this.state.newComment})
      .then(ret => {
        alert('Comment post with success !');
      })
      .catch(error => {
        console.log(error);
        alert('Comment post failed !');
      });
    }
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
            Actuality Details
          </Typography>
          <Inner
            postTitle={this.state.postTitle}
            from={this.state.from}
            date={this.state.date}
            content={this.state.content}
            comments={this.state.comments}
            newComment={this.state.newComment}
            handleCommentChange={this.handleCommentChange}
            handleAddNewComment={this.handleAddNewComment}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(ActualityDetails);

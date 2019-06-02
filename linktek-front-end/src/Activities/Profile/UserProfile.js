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
import Inner from './content/userProfileInner.js';
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

// UserProfile class
/** Handle the user profile page */
class UserProfile extends React.Component {
  state = {
    open: true,
    userName: '',
    userJob: '',
    userState: '',
    userCompany: '',
    userAge: '0',
    deleteRelationModalVisible: false,
    userPosts: [],
    userComments: [],
    userEmail: '',
  };

  componentWillMount() {
    //console.log(this.props.searchUserMail);
    axios.post(`http://127.0.0.1:3010/post/list`, {email: this.props.searchUserMail})
    .then(ret => this.handleSearchPosts(ret))
    .catch(error => console.log('error : ' + error));
    this.setState({userEmail: localStorage.getItem('userEmail')});

    axios.post(`http://127.0.0.1:3010/account/profile`, {email: this.props.searchUserMail})
    .then(ret => {
      this.handleUserInformation(ret);
    })
    .catch(error => console.log(error));
  }


  handleUserInformation(ret) {
    console.log(ret);
    console.log(ret.data.job.title);
    this.setState({userCompany: ret.data.company.name});
    this.setState({userState: ret.data.country.name});
    this.setState({userJob: ret.data.job.title});
  }

  handleSearchPosts(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addPropsToState(value[k]));
      }
      i++;
    }
  }

  removeRelation(value) {
    alert('Remove relation done !');
  }

  removeRelationError(error) {
    console.log(error);
    alert('Remove relation error !');
  }

  addPropsToState(row) {
    let ret = this.state.userPosts;
    //console.log(row);
    let tmp = [
      {id: row.id, creation_time: row.creation_time, title: row.title, content: row.content},
    ];
    ret.push(tmp);
    this.setState({userPosts: ret});
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDeleteRelationClose = () => {
    axios.delete(`http://127.0.0.1:3010/account/leader`, {data: {follower: this.props.userEmail, leader: this.props.searchUserMail}})
    .then(ret => this.removeRelation(ret))
    .catch(error => this.removeRelationError(error));
    this.setState({ deleteRelationModalVisible: false });
  }

  handleDeleteRelationShow = () => {
    this.setState({ deleteRelationModalVisible: true });
  }

  handlePostId = (index) => {
    let tmp = Object.values(this.state.userPosts[index]);
    return tmp[0].id;
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
          <List>
            {mainListItems}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <Typography variant="h4" gutterBottom component="h3">
              {this.props.searchUserName} Profile
            </Typography>
            <Inner
              userName={this.props.searchUserName}
              userAge={this.state.userAge}
              userState={this.state.userState}
              userCompany={this.state.userCompany}
              userJob={this.state.userJob}
              handleDeleteRelationClose={this.handleDeleteRelationClose}
              handleDeleteRelationShow={this.handleDeleteRelationShow}
              deleteRelationModalVisible={this.state.deleteRelationModalVisible}
              userPosts={this.state.userPosts}
              userComments={this.state.userComments}
              userEmail={this.state.userEmail}
              handlePostId={this.handlePostId}
              handlePostOwner={this.handlePostOwner}
            />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);

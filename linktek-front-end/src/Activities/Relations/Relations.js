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
import UserProfile from '../Profile/UserProfile.js';
import ReactDOM from 'react-dom';
import Inner from './content/relationsInner.js';
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

// Relations class
/** Handle the user relations page */
class Relations extends React.Component {
  state = {
    open: true,
    searchResult: [],
    userRelations: [],
    userRelationMails: [],
    relationSuggestion: [],
    searchUserSelectedName: "",
    searchUserSelectedCompany: '',
    searchUserSelectedJob: '',
    searchUserSelectedAge: 0,
    searchUserModalVisible: false,
    searchUserSelectstate: "",

    relationSelectedName: "",
    relationSelectedCompany: '',
    relationSelectedJob: '',
    relationSelectedAge: 0,
    relationSelectedModalVisible: false,
    relationSelectstate: "",
    relationEmail: '',

    relationSuggestionSelectedName: "",
    relationSuggestionSelectedCompany: '',
    relationSuggestionSelectedMail: "",
    relationSuggestionSelectedJob: '',
    relationSuggestionSelectedAge: '',
    realtionSuggestionModalVisible: '',
    relationSuggestionSelectstate: '',
  };

  /**
   * Request the data required from component.
   * Get user relation list
   * Get user relation suggestion list
   */
  componentWillMount() {
    axios.post(`http://127.0.0.1:3010/account/leader/list`, {email: this.props.userEmail})
    .then(ret => this.handleRelationList(ret))
    .catch(error => console.log('error : ' + error));

    axios.post(`http://127.0.0.1:3010/account/suggestion`, {email: this.props.userEmail})
    .then(ret => {
      console.log(ret);
      this.setState({relationSuggestion : []});
      this.handleSuggestionList(ret);
    })
    .catch(error => console.log('error : ' + error));
  }

  /**
   * Internal function used for set the relation suggestion list into react properties
   * @param {object} ret The relation suggestion list
   */
  handleSuggestionList(ret) {
    //console.log(ret);
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToSuggestion(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for set the relation suggestion row into react properties
   * @param {string} value The relation suggestion row
   */
  addItemToSuggestion(value){
    let ret = this.state.relationSuggestion;
    let tmp = [{name: value.name, mail: value.email}];
    ret.push(tmp);
    this.setState({relationSuggestion: ret});
  }

  /**
   * Internal function used for set the relation row into react properties
   * @param {string} value The relation row
   */
  addItemToUserRelations(value){
    let tmp = this.state.userRelations;
    tmp.push(value.name);
    this.setState({userRelations: tmp});
    tmp = this.state.userRelationMails;
    tmp.push(value.email);
    this.setState({userRelationMails: tmp});
  }

  /**
   * Internal function used for set the relation list into react properties
   * @param {object} ret The relation list
   */
  handleRelationList(ret) {
    this.setState({userRelations: []});
    this.setState({userRelationMails: []});
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToUserRelations(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for search user
   * @param {object} ret The backend return object
   */
  handleSearch(ret) {
    alert('Relation added !');
    console.log(ret);
  }

  /**
   * Internal function used for debugging search user
   * @param {object} error The backend return error object
   */
  handleSearchError(error) {
    console.log('error : ' + error);
  }

  /**
   * Internal function used to open the drawer
   */
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  /**
   * Internal function used to close the drawer
   */
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  /**
   * Internal function used to display the search user modal
   * @param {string} searchUserSelectedName The search user name
   * @param {string} searchUserSelectedJob The search user job
   */
  handleSearchUserModalShow = (name, email) => {
    this.setState({searchUserSelectedName: name});
    this.setState({searchUserSelectedJob: email});
    this.setState({ searchUserModalVisible: true });
  }

  /**
   * Internal function used to close the search user modal
   */
  handleSearchUserModalClose = () => {
    this.setState({ searchUserModalVisible: false });
  }

  /**
   * Internal function used to close the search user modal
   * Request backend for search user
   */
  handleSearchUserModalCloseValidated = () => {
    axios.post(`http://127.0.0.1:3010/account/leader`, {follower: this.props.userEmail, leader: this.state.searchUserSelectedJob})
    .then(ret => this.handleSearch(ret))
    .catch(error => this.handleSearchError(error));
    this.setState({ searchUserModalVisible: false });
  }

  /**
   * Internal function used to remove a relation
   * @param {object} value Used for debugging
   */
  removeRelation(value) {
    alert('Remove relation done !');
  }

  /**
   * Internal function used to remove a relation error
   * @param {object} error Used for debugging
   */
  removeRelationError(error) {
    console.log(error);
    alert('Remove relation error !');
  }

  /**
   * Internal function used to remove a relation
   */
  handleRemoveRelation() {
    axios.delete(`http://127.0.0.1:3010/account/leader`, {data: {follower: this.props.userEmail, leader: this.state.relationEmail}})
    .then(ret => this.removeRelation(ret))
    .catch(error => this.removeRelationError(error));
  }

  /**
   * Internal function used to display the relation modal
   * @param {string} index the selected relation index
   */
  handleRelationModalShow = (index) => {
    this.setState({ relationEmail: this.state.userRelationMails[index]});
    this.setState({ relationSelectedName: this.state.userRelations[index]});
    this.setState({ relationSelectedModalVisible: true });
  }

  /**
   * Internal function used to close the relation modal
   * Load and display the selected user profile
   */
  handleRelationModalCloseValidated = () => {
    ReactDOM.render(<UserProfile searchUserName={this.state.relationSelectedName} searchUserMail={this.state.relationEmail} userEmail={this.props.userEmail} />, document.getElementById('root'));
  }

  /**
   * Internal function used to close the relation modal
   */
  handleRelationModalClose = () => {
    this.setState({ relationSelectedModalVisible: false });
  }

  /**
   * Internal function used to display the relation suggestion modal
   * @param {string} index the selected relation suggestion index
   */
  handleSelectedSuggestionModalShow = (index) => {
    this.setState({relationSuggestionSelectedName: this.state.relationSuggestion[index][0].name});
    this.setState({relationSuggestionSelectedMail: this.state.relationSuggestion[index][0].mail});
    this.setState({ realtionSuggestionModalVisible: true });
  }

  /**
   * Internal function used to close the relation suggestion modal
   */
  handleSelectedSuggestionModalClose = () => {
    this.setState({ realtionSuggestionModalVisible: false });
  }

  /**
   * Internal function used to close the relation suggestion modal
   */
  handleSelectedSuggestionModalCloseValidated = () => {
    axios.post(`http://127.0.0.1:3010/account/leader`, {follower: this.props.userEmail, leader: this.state.relationSuggestionSelectedMail})
    .then(ret => alert('User added as relation !'))
    .catch(error => this.handleSearchError(error));
    this.setState({ realtionSuggestionModalVisible: false });
  }

  /**
   * Internal function used for set the searchUserSelectedName into react properties
   * @param {event} event The new searchUserSelectedName value
   */
  handleSearchUserSelectedName = (event) => {
    this.setState({ searchUserSelectedName: event.target.value });
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
              Relations
            </Typography>
            <Inner
              searchResult={this.state.searchResult}
              userRelations={this.state.userRelations}
              relationSuggestion={this.state.relationSuggestion}
              searchUserSelectedName={this.state.searchUserSelectedName}
              searchUserSelectedCompany={this.state.searchUserSelectedCompany}
              searchUserSelectedJob={this.state.searchUserSelectedJob}
              searchUserSelectedAge={this.state.searchUserSelectedAge}
              handleSearchUserModalShow={this.handleSearchUserModalShow}
              handleSearchUserModalClose={this.handleSearchUserModalClose}
              searchUserModalVisible={this.state.searchUserModalVisible}
              searchUserSelectstate={this.state.searchUserSelectstate}
              handleSearchUserSelectedName={this.handleSearchUserSelectedName}
              handleSearchUserModalCloseValidated={this.handleSearchUserModalCloseValidated}

              relationSelectedName={this.state.relationSelectedName}
              relationSelectedCompany={this.state.relationSelectedCompany}
              relationSelectedJob={this.state.relationSelectedJob}
              relationSelectedAge={this.state.relationSelectedAge}
              handleRelationModalShow={this.handleRelationModalShow}
              handleRelationModalClose={this.handleRelationModalClose}
              relationSelectedModalVisible={this.state.relationSelectedModalVisible}
              relationSelectstate={this.state.relationSelectstate}
              userRelationMails={this.state.userRelationMails}
              handleRemoveRelation={this.handleRemoveRelation}
              handleRelationEmailChange={this.handleRelationEmailChange}
              relationEmail={this.state.relationEmail}
              handleRelationModalCloseValidated={this.handleRelationModalCloseValidated}

              relationSuggestionSelectedName={this.state.relationSuggestionSelectedName}
              relationSuggestionSelectedCompany={this.state.relationSuggestionSelectedCompany}
              relationSuggestionSelectedJob={this.state.relationSuggestionSelectedJob}
              relationSuggestionSelectedAge={this.state.relationSuggestionSelectedAge}
              realtionSuggestionModalVisible={this.state.realtionSuggestionModalVisible}
              relationSuggestionSelectstate={this.state.relationSuggestionSelectstate}
              handleSelectedSuggestionModalShow={this.handleSelectedSuggestionModalShow}
              handleSelectedSuggestionModalClose={this.handleSelectedSuggestionModalClose}
              handleSelectedSuggestionModalCloseValidated={this.handleSelectedSuggestionModalCloseValidated}
            />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Relations);

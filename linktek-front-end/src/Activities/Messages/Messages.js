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
import Inner from './content/messagesInner.js';
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

class Messages extends React.Component {
  state = {
    open: true,
    inbox: [],
    sendTo: 'Undefined',
    contact: [],
    contactDetails: [],
    outbox: [],
    selectedContact: 0,
    newMessageTitle: '',
    newMessageContent: '',
    replyMessageContent: '',
    modalDeleteMessageVisible: false,
    modalReplyMessageVisible: false,
    messageSender: 'John Doe',
  };

  componentWillMount() {
    axios.post(`http://127.0.0.1:3010/account/leader/list`, {email: this.props.userEmail})
    .then(ret => this.handleRelationList(ret))
    .catch(error => console.log('error : ' + error));

    axios.post(`http://127.0.0.1:3010/account/outbox`, {email: this.props.userEmail})
    .then(ret => this.handleOutBox(ret))
    .catch(error => console.log('error : ' + error));

    axios.post(`http://127.0.0.1:3010/account/inbox`, {email: this.props.userEmail})
    .then(ret => this.handleInBox(ret))
    .catch(error => console.log('error : ' + error));
  }

  handleRelationList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToUserRelations(value[k]));
      }
      i++;
    }
  }

  handleInBox(ret) {
    console.log(ret);
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToInbox(value[k]));
      }
      i++;
    }
  }

  handleOutBox(ret) {
    //console.log(ret);
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToOutbox(value[k]));
      }
      i++;
    }
  }

  addItemToInbox(value) {
    let tmpOutbox = this.state.inbox;
    let tmp = [{title: value.title, content: value.content, id: value.id, date: value.creation_time}];
    tmpOutbox.push(tmp);
    this.setState({inbox: tmpOutbox});
  }

  addItemToOutbox(value) {
    let tmpOutbox = this.state.inbox;
    let tmp = [{title: value.title, content: value.content, id: value.id, date: value.creation_time}];
    tmpOutbox.push(tmp);
    this.setState({outbox: tmpOutbox});
  }

  addItemToUserRelations(value){
    let contact = this.state.contact;
    let details = this.state.contactDetails;
    let tmpContact = value.name;
    let tmpMail = value.email;

    contact.push(tmpContact);
    details.push({name: tmpContact, mail: tmpMail});
    this.setState({contact: contact});
    this.setState({contactDetails: details});
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleSelectedContactChange = (value) => {
    this.setState({ selectedContact: value});
  }

  handleNewMessageTitleChange = name => event => {
    this.setState({ newMessageTitle: event.target.value});
  }

  handleNewMessageContentChange = name => (event) => {
    this.setState({ newMessageContent: event.target.value});
  }

  getUserEmail() {
    if (this.state.newMessageTitle === '' || this.state.newMessageContent === '') {
      return -1;
    }
    let contact = this.state.contact;
    for (let i = 0; i < contact.length; i++) {
      if (this.state.contact[i] === this.state.selectedContact.value) {
        return i;
      }
    }
    return -1;
  }

  handleSendMessage() {
    alert('Message send with success !');
    this.setState({newMessageTitle: ''});
    this.setState({newMessageContent: ''});
    this.setState({selectedContact: 0});
  }

  sendNewMessage = () => {
    let index = this.getUserEmail();
    if (index >= 0) {
      axios.post(`http://127.0.0.1:3010/account/message`, {sender: this.props.userEmail, receiver: this.state.contactDetails[index].mail, title: this.state.newMessageTitle, content: this.state.newMessageContent})
      .then(ret => this.handleSendMessage())
      .catch(error => console.log('error : ' + error));
    }
    else {
      alert("Message cannot be sent !");
    }
  }

  handleDeleteMessageModalShow = () => {
    this.setState({ modalDeleteMessageVisible: true });
  }

  handleDeleteMessageModalClose = () => {
    this.setState({ modalDeleteMessageVisible: false });
  }

  handleReplyMessageModalShow = () => {
    this.setState({ modalReplyMessageVisible: true });
  }

  handleReplyMessageModalClose = () => {
    this.setState({ modalReplyMessageVisible: false });
  }

  handleReplyMessageContentChange = name => (event) => {
    this.setState({ replyMessageContent: event.target.value});
  }

  sendReplyMessage = () => {

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
            Messages
          </Typography>
          <Inner
            inbox={this.state.inbox}
            sendTo={this.state.sendTo}
            contact={this.state.contact}
            selectedContact={this.state.selectedContact}
            handleSelectedContactChange={this.handleSelectedContactChange}
            handleNewMessageTitleChange={this.handleNewMessageTitleChange}
            handleNewMessageContentChange={this.handleNewMessageContentChange}
            sendNewMessage={this.sendNewMessage}
            modalDeleteMessageVisible={this.state.modalDeleteMessageVisible}
            modalReplyMessageVisible={this.state.modalReplyMessageVisible}
            handleDeleteMessageModalShow={this.handleDeleteMessageModalShow}
            handleDeleteMessageModalClose={this.handleDeleteMessageModalClose}
            handleReplyMessageModalShow={this.handleReplyMessageModalShow}
            handleReplyMessageModalClose={this.handleReplyMessageModalClose}
            messageSender={this.state.messageSender}
            handleReplyMessageContentChange={this.handleReplyMessageContentChange}
            outbox={this.state.outbox}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Messages);

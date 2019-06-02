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
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';
import TextField from '@material-ui/core/TextField';
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

// Message class
/** Handle the messages page */
class Messages extends React.Component {
  state = {
    open: true,
    inbox: [],
    sendTo: '',
    contact: [],
    contactDetails: [],
    outbox: [],
    selectedContact: 0,
    newMessageTitle: '',
    newMessageContent: '',
    replyMessageContent: '',
    modalDeleteMessageVisible: false,
    modalReplyMessageVisible: false,
    messageSender: '',
    replyIndex: 0,
  };

  /**
   * Request the data required from component.
   * Get user relation list
   * Get user inbox
   * Get user outbox
   */
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

  /**
   * Internal function used for handling the relation list
   * @param {object} ret The return of backend gateway object.
   */
  handleRelationList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToUserRelations(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for handling the inbox
   * @param {object} ret The return of backend gateway object.
   */
  handleInBox(ret) {
    //console.log(ret);
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToInbox(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for handling the outbox
   * @param {object} ret The return of backend gateway object.
   */
  handleOutBox(ret) {
    console.log(ret);
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToOutbox(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for set the inbox row into react properties
   * @param {object} value The feed row
   */
  addItemToInbox(value) {
    let tmpInbox = this.state.inbox;
    let tmp = [{title: value.title, content: value.content, id: value.id, date: value.creation_time, fromName: value.sender.name, fromMail: value.sender.email}];
    tmpInbox.push(tmp);
    this.setState({inbox: tmpInbox});
  }

  /**
   * Internal function used for set the outbox row into react properties
   * @param {object} value The feed row
   */
  addItemToOutbox(value) {
    let tmpOutbox = this.state.outbox;
    let tmp = [{title: value.title, content: value.content, id: value.id, date: value.creation_time, to: value.receiver.name, toMail: value.receiver.email}];
    tmpOutbox.push(tmp);
    this.setState({outbox: tmpOutbox});
  }

  /**
   * Internal function used for set the relation row into react properties
   * @param {object} value The feed row
   */
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

  /**
   * Internal function used for set the selectedContact into react properties
   * @param {object} value The new selectedContact value
   */
  handleSelectedContactChange = (value) => {
    this.setState({ selectedContact: value});
  }

  /**
   * Internal function used for set the newMessageTitle into react properties
   * @param {event} event The new newMessageTitle value
   */
  handleNewMessageTitleChange = name => event => {
    this.setState({ newMessageTitle: event.target.value});
  }

  /**
   * Internal function used for set the newMessageContent into react properties
   * @param {event} event The new newMessageContent value
   */
  handleNewMessageContentChange = name => (event) => {
    this.setState({ newMessageContent: event.target.value});
  }

  /**
   * Internal function used to get the user email
   */
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

  /**
   * Internal function used to warn user that the message had been send
   * Reset used react properties
   */
  handleSendMessage() {
    alert('Message send with success !');
    this.setState({newMessageTitle: ''});
    this.setState({newMessageContent: ''});
    this.setState({selectedContact: 0});
  }

  /**
   * Function used to send new message
   */
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

  /**
   * Function used to open reply message modal
   * Set the reply message index to react properties
   */
  handleReplyMessageModalShow = index => () => {
    this.setState({replyIndex: index});
    this.setState({ modalReplyMessageVisible: true });
  }

  /**
   * Function used to closed reply message modal
   */
  handleReplyMessageModalClose = () => {
    this.setState({ modalReplyMessageVisible: false });
  }

  /**
   * Internal function handle the message reply title
   */
  handleReplyTitle() {
    let tmp = Object.values(this.state.inbox[this.state.replyIndex]);
    return 'Reply to : ' + tmp[0].title;
  }

  /**
   * Internal function handle the message reply content
   */
  handleReplyContent() {
    return  this.state.replyMessageContent;
  }

  /**
   * Internal function handle the message reply address
   */
  handleReplyAddress() {
    let tmp = Object.values(this.state.inbox[this.state.replyIndex]);
    return tmp[0].fromMail;
  }

  /**
   * Function used to closed reply message modal
   * Send new message to user
   */
  handleReplyMessageModalClosePopup = () => {
    axios.post(`http://127.0.0.1:3010/account/message`, {sender: this.props.userEmail, receiver: this.handleReplyAddress(), title: this.handleReplyTitle(), content: this.handleReplyContent()})
    .then(ret => this.handleSendMessage())
    .catch(error => console.log('error : ' + error));
    this.setState({ modalReplyMessageVisible: false });
  }

  /**
   * Internal function used set the reply message content to react properties
   * @param {event} event The new replyMessage content
   */
  handleReplyMessageContentChange = name => (event) => {
    this.setState({ replyMessageContent: event.target.value});
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
        {/*Modal for reply message*/}
        <Modal visible={this.state.modalReplyMessageVisible} width="400" height="350" effect="fadeInUp" onClickAway={() => this.handleReplyMessageModalClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{}</h2>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <TextField
                id="standard-with-placeholder"
                label="Reply Content"
                onChange={this.handleReplyMessageContentChange('content')}
                className={classes.textField}
                margin="normal"
                multiline={true}
                rows={1}
                rowsMax={7}
                style={{marginLeft: 10, width: "99%"}}
              />
            </div>
            <div style={{width: "100%", marginTop: 10}}>
              <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 10, marginTop: 10}} onClick={this.handleReplyMessageModalClosePopup}>
                Send
                <SendIcon className={classes.rightIcon} style={{marginLeft: 10}}/>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Messages);

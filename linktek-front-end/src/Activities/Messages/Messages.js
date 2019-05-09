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
    messages: [
      ["Artung !!!", "User 1", "enean sagittis, justo a tincidunt pharetra, ipsum ex pretium libero, eu placerat felis felis vitae arcu. Aliquam sit amet accumsan dui, fermentum posuere magna. Donec sed nulla finibus, semper turpis eu, vestibulum lacus. ", "01.01.2001", "15H20"],
      ["Youwiiiiii", "User 2", "Etiam quis convallis nibh. Nullam ligula sem, tempus sit amet finibus vel, pulvinar nec felis. Nunc cursus eget ex nec dictum. Donec sodales dictum mi nec luctus.", "01.01.2001", "15H22"],
      ["OMG", "User 3", "ellentesque congue, ligula vel ultricies finibus, ex elit dignissim lorem, eget mollis magna mi vel odio. Vivamus auctor et dolor non vulputate. In vel erat tempus, consectetur nulla sit amet, posuere sem.", "01.01.2001", '18h00'],
      ["QSddd ", "User 2", "Morbi sollicitudin sed metus at scelerisque. Donec varius in sapien sed aliquam. Quisque consectetur neque eu consequat pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus ornare eros eget sem venenatis imperdiet. Etiam est neque, facilisis in convallis vitae, lacinia at dui. Vivamus id tortor pharetra, rhoncus quam ac, ornare orci.", "01.01.2001", '19h00'],
      ["Bqs dff", "User 3", "ellentesque congue, ligula vel ultricies finibus, ex elit dignissim lorem, eget mollis magna mi vel odio. Vivamus auctor et dolor non vulputate. In vel erat tempus, consectetur nulla sit amet, posuere sem.", "01.01.2001", '18h00'],
    ],
    sendTo: 'Undefined',
    contact: [
      '',
      'John Doe',
      'Aplus Didée',
      'Joanne Doe',
      'User Ulop',
      'Blop User',
    ],
    selectedContact: 0,
    newMessageTitle: '',
    newMessageContent: '',
    replyMessageContent: '',
    modalDeleteMessageVisible: false,
    modalReplyMessageVisible: false,
    messageSender: 'John Doe',
  };

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

  sendNewMessage = () => {

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
            messages={this.state.messages}
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
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Messages);

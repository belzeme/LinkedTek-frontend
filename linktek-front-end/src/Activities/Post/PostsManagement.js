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
    myPosts: [
      ["01.01.2001", "10H00", "Artung !!!", "Enean sagittis, justo a tincidunt pharetra, ipsum ex pretium libero, eu placerat felis felis vitae arcu. Aliquam sit amet accumsan dui, fermentum posuere magna. Donec sed nulla finibus, semper turpis eu, vestibulum lacus."],
      ['01.01.2001', '11H44', 'Blop', 'Aliquam consectetur ultricies urna vitae consectetur. Morbi varius condimentum eros at vehicula. Proin faucibus id tortor sed cursus. Proin non laoreet mauris.'],
      ['01.01.2001', '15h25', 'Itsum !', 'Cras bibendum, mi vitae condimentum tincidunt, eros quam semper erat, sit amet maximus justo ante ut ipsum. Phasellus sit amet placerat leo. Aliquam congue libero in velit imperdiet ornare.'],
      ['01.01.2001', '19h00', 'Quisquet su ameth', 'Etiam imperdiet purus vel tempus ullamcorper. Ut vel lacus metus. Nam congue mauris ac urna facilisis imperdiet. Donec in ante at arcu ultricies interdum. Nunc risus est, dapibus in lobortis in, sagittis vel magna. Quisque et risus massa.'],
      ['01.01.2001', '22h10', 'Proin eleifend', 'Phasellus pretium dui quis faucibus convallis. Integer mattis sapien quis ligula pellentesque, id mattis massa commodo. Aliquam eget erat eros. Ut leo urna, gravida vel rhoncus vitae, tristique quis massa. '],
      ['02.01.2001', '08h08', 'Venenatis !', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis nibh quis ex varius facilisis. Nunc fringilla arcu sit amet velit bibendum vehicula.'],
      ['02.01.2001', '08h55', 'Accumsan nisl lacinia !!!', 'Donec pretium felis non luctus scelerisque. Etiam facilisis eros sit amet odio facilisis tincidunt. Phasellus fermentum nec tortor nec feugiat. Curabitur finibus leo quis posuere laoreet.'],
      ['02.01.2001', '11h12', 'Etiam convallis risus diam', 'Pellentesque id lacus suscipit metus dignissim rutrum. Etiam felis urna, faucibus eget urna sed, cursus porttitor metus. Sed non ligula in tellus ornare molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'],
    ],
    myComments: [
      ["01.01.2001", "10H00", 'Suspendisse ac enim lorem.', '01.01.2001', '9h50', 'Nunc eget scelerisque', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit molestie, cursus justo eget, vehicula lorem. Sed quis arcu a eros ultrices commodo. Nulla ac scelerisque mauris. Vivamus vel tortor at ante elementum tempus.', 'User 1'],
      ['01.01.2001', '11H44', 'Vivamus condimentum nunc id lacinia consequat.', '01.01.2001', '10h00', 'Aenean porttitor eget', 'Quisque semper mattis dui, eu pellentesque ex. Phasellus sollicitudin arcu eget orci faucibus scelerisque. Aliquam aliquet erat vitae laoreet lobortis.', 'User 2'],
      ['01.01.2001', '15h25', 'Proin sed leo ligula.', '01.01.2001', '12h12', 'Acondimentum lacus', 'Maecenas posuere convallis felis ut rutrum. Donec consectetur vestibulum elit id aliquet. Mauris scelerisque velit vel magna lacinia, ac efficitur massa dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis pretium metus ut risus porttitor congue.', 'User 3'],
      ['01.01.2001', '19h00', 'Duis interdum scelerisque mi, in rhoncus sem pellentesque id.', '01.01.2001', '21h09', 'Aliquam vitae dictum  !!', 'Donec et ligula lorem. Morbi aliquam suscipit massa eget facilisis. Phasellus finibus dolor et nisi vehicula, ut vestibulum est bibendum.', 'User 4'],
      ['01.01.2001', '22h10', 'Integer laoreet blandit suscipit. Integer hendrerit libero felis. Pellentesque laoreet a lacus in gravida.', '01.01.2001', '22h05', 'Mauris at lacus sapien !', 'Sed pretium erat ac nunc placerat cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.', 'User 5'],
      ['02.01.2001', '08h08', 'Nam facilisis turpis quis consequat viverra. Sed elementum elit sit amet auctor blandit. Sed ac dui at dolor vulputate sollicitudin in ut sapien. Maecenas nec viverra massa.', '02.01.2001', '07h50', 'Rosodales lorem', 'Suspendisse aliquam ultrices orci, vel bibendum leo convallis dictum. Suspendisse feugiat purus et ex maximus consectetur. Duis dolor mi, tempor id tincidunt nec, tempus eu orci.', 'User 3'],
      ['02.01.2001', '08h55', 'Praesent mattis interdum augue, sed sollicitudin felis venenatis in. Praesent massa sapien, interdum vel elit non, imperdiet pellentesque nunc.', '02.01.2001', '07h45', 'Quisque ac faucibus velit', ' Sed vehicula aliquam turpis, sed suscipit nulla efficitur blandit. Sed ligula felis, pellentesque sed nisi nec, blandit porta diam. Vivamus eu tincidunt tellus, nec porta leo.', 'User 1'],
      ['02.01.2001', '11h12', 'Vivamus accumsan lacinia massa et euismod.', '02.01.2001', '11h11', 'Pellentesque feugiat mi !!!', 'Morbi at libero tincidunt, finibus mauris ac, auctor neque. Aliquam eu sem vel purus pretium venenatis.', 'User 4'],
    ],
    contact: [
      '',
      'John Doe',
      'Aplus Didée',
      'Joanne Doe',
      'User Ulop',
      'Blop User',
      'Toto AAA',
      'Toto BBB',
      'Toto CCC',
      'Toto DDD',
      'Toto EEE',
      'Toto FFF',
    ],
    selectedContact: 0,
    editPostModalVisible: false,
    editCommentModalVisible: false,
    editPostContent: '',
    editPostTitle: '',
    editComment: '',
  };

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

  handleEditPostModalShow = (value) => {
    this.setState({ editPostContent: value[3]});
    this.setState({ editPostTitle: value[2]});
    this.setState({ editPostModalVisible: true});
  }

  handleEditPostModalClose = () => {
    this.setState({ editPostModalVisible: false});
    this.setState({ editPostContent: ''});
    this.setState({ editPostTitle: ''});

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
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Post);

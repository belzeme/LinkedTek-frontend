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

class ActualityDetails extends React.Component {
  state = {
    open: true,
    postTitle: 'Artung !!!',
    from: 'User 1',
    date: '01.01.2001 : 15H20',
    content: 'enean sagittis, justo a tincidunt pharetra, ipsum ex pretium libero, eu placerat felis felis vitae arcu. Aliquam sit amet accumsan dui, fermentum posuere magna. Donec sed nulla finibus, semper turpis eu, vestibulum lacus.',
    comments:[
      'Quantum patre etiam hunc illo hoc tantum munita ad erudiretur sit etiam ad dicam est potuit deditšnihil mecum patris patre.',
      'Urbes habitaculis agrestibus opibus nominibus veteres conditoris viribus quae inposita quae construxit quam institutores enim urbes enim enim appellentur.',
      'Construxit firmas nomina arbitrium eis nominibus nominibus Assyria veteres praesens pleraeque hominum ex inposita lingua et ad non conditoris in et.',
      'Sermo mentionem haberi videretur eam in incidisset arbitratu atque Marci filio in sermonem Marci enim paucis altero loquentes inquit.',
      'C disputationis mortem ab libro ab quasi quas altero tamquam secum Scaevola quasi tamquam haberi memoriae cum eam cum paucis mandavi.',
      'Amicis quidquid quibus sunt simus si sumenda quidquid quidem de de Ex si accedunt statuerimus hoc vel ab Ex iis concedere res aut hoc eorum quidem velint numero si Ex.',
      'Et saeculis magnis Phoenice Phoenice et saeculis nominum plena hanc in Libano et gratiarum nominum in adclinis venustatis Libano in et quibus pares quibus Libano magnis adclinis Emissa condita Berytus.'
    ],
    commentsFrom: ['John Doe', 'Aplus didée', 'Joane Doe', 'Mister blop', 'Jean Valjean', 'Encore un', 'Le dernier'],
    commentsDate: ['01.01.2001 : 15H25', '01.01.2001 : 16h02', '01.01.2001 : 16h20', '01.01.2001 : 17H40', '01.01.2001 : 18H22', '01.01.2001 : 19H37', '01.01.2001 : 23H48'],
    newComment: '',
  };

  handleCommentChange = name => event => {
    this.setState({ newComment: event.target.value});
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
            Actualities Feed
          </Typography>
          <Inner
            postTitle={this.state.postTitle}
            from={this.state.from}
            date={this.state.date}
            content={this.state.content}
            comments={this.state.comments}
            commentsDate={this.state.commentsDate}
            commentsFrom={this.state.commentsFrom}
            newComment={this.state.newComment}
            handleCommentChange={this.handleCommentChange}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(ActualityDetails);

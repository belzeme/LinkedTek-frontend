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
import ProfileModule from './content/ProfileInner.js';
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

class Profile extends React.Component {
  state = {
    open: true,
    selectedPicture: '',
    profileModalVisible: false,
    userModalVisible: false,
    jobInputModalVisible: false,
    jobEditModalVisible: false,
    userName: 'John Doe',
    currentJobStartTime: '01.01.2000',
    job: 'Front-End Developer',
    company: 'NanoSoft',
    companyNumber: '3',
    age: '22',
    country: "USA",
    names: ['Epitech Toulouse', 'Blop 1', 'Blop 2', 'NanoSoft'],
    namesState: ['School', 'Company', 'Company', 'Company'],
    namesJob: ['Strudent', 'Software Developer', 'Software Developer', 'Software Architect'],
    result: ['Jean valjean', 'Jean valjean'],
    resultPicture: ['../Images/profilePicture1.png', '../Images/profilePicture2.png'],
    companies: ['Lateral Software', 'Eco-Software', 'Mobile Software', 'NanoSoft'],
    searchResultName: ['Name 1', 'Name 2', 'Name 3', 'Name 4'],
    searchResultJobTitle: ['Software Developer', 'Software engineer', 'Software Architect', 'Business Developer'],
    searchUserName: "User Name",
    searchUserCompany: "User Company",
    searchUserCountry: "User Country",
    searchUserJob: "User Job Title",
    searchUserAge: "Search User Age",
    selectedEditInput: 0,
    newJobInputType: 'Company',
    countries: [
      '',
      'USA',
      'JAPAN',
      'FRANCE',
      'ITALIA',
      'MEXICO',
    ],
    selectedCountry: 'USA',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileModalShow = () => {
    this.setState({ profileModalVisible: true });
  }

  handleProfileModalClose = () => {
    this.setState({ profileModalVisible: false });
  }

  handleUserModalShow = () => {
    this.setState({ userModalVisible: true });
  }

  handleUserModalClose = () => {
    this.setState({ userModalVisible: false });
  }

  handleJobInputModalShow = () => {
    this.setState({ jobInputModalVisible: true });
  }

  handleJobInputModalClose = () => {
    this.setState({ jobInputModalVisible: false });
  }

  handleJobEditModalShow = () => {
    this.setState({ jobEditModalVisible: true });
  }

  handleJobEditModalClose = () => {
    this.setState({ jobEditModalVisible: false });
  }

  handleUserNameChange = name => event => {
    this.setState({ userName: event.target.value });
  }

  handleCountryChange = name => event => {
    this.setState({ country: event.target.value });
  }

  handleCompanyChange = name => event => {
    this.setState({ company: event.target.value });
  }

  handleJobChange = name => event => {
    this.setState({ job: event.target.value });
  }

  handleAgeChange = name => event => {
    this.setState({ age: event.target.value });
  }

  handleCurrentJobStartDate = name => event => {
    this.setState({ currentJobStartTime: event.target.value });
  }

  handleProfilePictureChange = name => event => {
    this.setState({ selectedPicture: event.target.value });
  }

  handleNewJobInputCompanyTypeChanged = () => {
    if (this.state.newJobInputType === 'School') {
      this.setState({ newJobInputType: 'Company' });
    }
    else if (this.state.newJobInputType === 'Company') {
      this.setState({ newJobInputType: 'School' });
    }
  }

  handleSelectedCountryChange = (value) => {
    this.setState({ selectedCountry: value});
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
            Profile
          </Typography>
          <ProfileModule
            userName={this.state.userName}
            job={this.state.job}
            company={this.state.company}
            age={this.state.age}
            country={this.state.country}
            currentJobStartTime={this.state.currentJobStartTime}
            names={this.state.names}
            namesState={this.state.namesState}
            result={this.state.result}
            resultPicture={this.state.resultPicture}
            companies={this.state.companies}
            companyNumber={this.state.companyNumber}
            handleProfileModalClose={this.handleProfileModalClose}
            handleProfileModalShow={this.handleProfileModalShow}
            profileModalVisible={this.state.profileModalVisible}
            handleUserNameChange={this.handleUserNameChange}
            handleCountryChange={this.handleCountryChange}
            handleCompanyChange={this.handleCompanyChange}
            handleJobChange={this.handleJobChange}
            handleAgeChange={this.handleAgeChange}
            handleJobInputModalShow={this.handleJobInputModalShow}
            handleJobInputModalClose={this.handleJobInputModalClose}
            jobInputModalVisible={this.state.jobInputModalVisible}
            handleCurrentJobStartDate={this.handleCurrentJobStartDate}
            handleProfilePictureChange={this.handleProfilePictureChange}
            searchResultName={this.state.searchResultName}
            searchResultJobTitle={this.state.searchResultJobTitle}
            handleUserModalShow={this.handleUserModalShow}
            handleUserModalClose={this.handleUserModalClose}
            userModalVisible={this.state.userModalVisible}
            searchUserName={this.state.searchUserName}
            searchUserCountry={this.state.searchUserCountry}
            searchUserJob={this.state.searchUserJob}
            searchUserAge={this.state.searchUserAge}
            searchUserCompany={this.state.searchUserCompany}
            jobEditModalVisible={this.state.jobEditModalVisible}
            handleJobEditModalShow={this.handleJobEditModalShow}
            handleJobEditModalClose={this.handleJobEditModalClose}
            selectedEditInput={this.state.selectedEditInput}
            namesJob={this.state.namesJob}
            newJobInputType={this.state.newJobInputType}
            handleNewJobInputCompanyTypeChanged={this.handleNewJobInputCompanyTypeChanged}
            editNamesState={this.editNamesState}
            countries={this.state.countries}
            selectedCountry={this.state.selectedCountry}
            handleSelectedCountryChange={this.handleSelectedCountryChange}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);

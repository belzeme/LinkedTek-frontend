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
import Actualities from '../Actualities/Actualities.js';
import ReactDOM from 'react-dom';
import ProfileModule from './content/ProfileInner.js';
import Modal from 'react-awesome-modal';
import Dropdown from 'react-dropdown';
import Button from '@material-ui/core/Button';
import UserProfile from './UserProfile.js';
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

// Profile class
/** Handle the user profile page */
class Profile extends React.Component {
  state = {
    open: true,
    selectedPicture: '',
    profileModalVisible: false,
    userModalVisible: false,
    jobInputModalVisible: false,
    jobEditModalVisible: false,
    userName: '',
    currentJobStartTime: '',
    inputJobStartTime: '',
    inputJobStopTime: '',
    job: '',
    company: '',
    companyNumber: '3',
    age: '',
    names: [],
    namesJob: [],
    result: [],
    resultPicture: ['../Images/profilePicture1.png', '../Images/profilePicture2.png'],
    companies: [],
    searchUserName: "",
    searchUserCompany: "",
    searchUserCountry: "",
    searchUserJob: "",
    searchUserAge: "Search User Age",
    selectedEditInput: 0,
    newJobInputType: '',
    countries: [],
    selectedCountry: '',
    country: '',
    selectedComp: '',
    selectedCompJob: '',
    searchUserList: [{name: '', mail: ''}],
    jobList: [],
    compJobInputVisible: false,
    jobInput: '',
    selectedUserMail: '',
    selectedUserName: '',
  };

  /**
   * Request the data required from component.
   * Get user profile details
   * Get user country list
   * Get user company list
   * Get user job timeline
   */
  componentWillMount() {
    this.setState({userName: this.props.userName})
    axios.post(`http://127.0.0.1:3010/account/profile`, {email: this.props.userEmail})
    .then(ret => {
      this.handleUserProfile(ret);
    })
    .catch(error => console.log(error));

    axios.get(`http://127.0.0.1:3010/country/list`)
    .then(ret => this.handleCountryList(ret))
    .catch(error => console.log('error : ' + error));

    axios.get(`http://127.0.0.1:3010/company/list`)
    .then(ret => this.handleCompList(ret))
    .catch(error => console.log('error : ' + error));

    axios.post(`http://127.0.0.1:3010/account/profile/history/job/list`, {email: this.props.userEmail})
    .then(ret => this.handleJobList(ret))
    .catch(error => console.log('error : ' + error));
  }

  /**
   * Internal function used for set the company name row into react properties
   * @param {string} value The new company input
   */
  addNewCompanyToState(value) {
    let tmp = this.state.companies;
    tmp.push(value.name);
    this.setState({companies: tmp});
  }

  /**
   * Internal function used for set the job row into react properties
   * @param {string} value The new job input
   */
  addJobToList(value) {
    let tmpList = this.state.jobList;
    let tmp = {name: value.company.name, start: Date(value.job.from), stop: Date(value.job.to), type: 'Company', title: value.job.title};
    tmpList.push(tmp);
    this.setState({jobList: tmpList});
  }

  /**
   * Internal function used for set the company list into react properties
   * @param {object} ret The company list
   */
  handleCompList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewCompanyToState(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for set the job list into react properties
   * @param {object} ret The company list
   */
  handleJobList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addJobToList(value[k]));
      }
      i++;
    }
  }

  /**
   * Internal function used for set new user profile into react properties
   * @param {object} ret The user new profile
   */
  handleUserProfile(ret) {
    this.setState({userName: ret.data.name});
    this.setState({job: ret.data.job.title});
    this.setState({company: ret.data.company.name});
    this.setState({country: ret.data.country.name});
    this.setState({currentJobStartTime: Date(ret.data.job.since)});
  }

  /**
   * Internal function used for handle the user search functionality
   * @param {object} ret The search result
   */
  handleSearchUser = (ret) => {
    this.setState({searchUserList: []});
    if (ret.data.length > 0) {
      for(let i = 0; i < ret.data.length; i++) {
        let tmpList = this.state.searchUserList;
        let tmp = [{name : ret.data[i].name, mail: ret.data[i].email}];
        tmpList.push(tmp);
        this.setState({searchUserList: tmpList});
      }
    }
    else {
      alert('NO USER FOUND');
    }
  }

  /**
   *  Function used for set the searchUserName into react properties
   * @param {event} event The new searchUserName value
   */
  handleSearchUserName = (event) => {
    this.setState({searchUserName: event.target.value});
  };

  /**
   *  Function used for open the profile drawer
   */
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  /**
   *  Function used for close the profile drawer
   */
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  /**
   *  Function used for open the profile modal
   */
  handleProfileModalShow = () => {
    this.setState({ profileModalVisible: true });
  }

  /**
   *  Function used for close the profile modal
   */
  handleProfileModalClose = () => {
    this.updateCountry();
    this.setState({ profileModalVisible: false });
  }

  /**
   *  Function used when update profile from modal
   *  Update the user name and Age
   *  Update the user current job
   *  Update the user country
   */
  handleProfileModalCloseValidated = () => {
    if (this.checkForEditProfile()) {
      let tmp = this.setNewProfile();
      axios.patch(`http://127.0.0.1:3010/account/profile`, {email: this.props.userEmail, properties: tmp})
      .then(ret => {
        console.log(ret)
      })
      .catch(error => console.log(error));

      axios.patch(`http://127.0.0.1:3010/account/profile/job`, {email: this.props.userEmail, company: this.state.selectedComp.value, title: this.state.job})
      .then(ret => {
        console.log(ret)
      })
      .catch(error => console.log(error));

      axios.patch(`http://127.0.0.1:3010/account/profile/country`, {email: this.props.userEmail, country: this.state.selectedCountry.value})
      .then(ret => {
        console.log(ret)
      })
      .catch(error => console.log(error));
      this.setState({ profileModalVisible: false });
      alert('Profile updated !');
      ReactDOM.render(<Actualities userEmail={this.props.userEmail} userName={this.props.userName} />, document.getElementById('root'));
    }
    else {
      alert('Please fill all fields correctly');
    }
  }

  /**
   *  Function used fcheck the fields of edit profile modal
   *  @return {boolean} false if error
   */
  checkForEditProfile() {
    if (this.state.selectedComp === '') {
      return false;
    }
    if (this.state.selectedCountry === '') {
      return false;
    }
    return true;
  }

  /**
   * Function used for opening the user modal
   * @param {string} mail The selected user mail
   * @param {string} name The selected user name
   */
  handleUserModalShow = (mail, name) => {
    this.setState({selectedUserMail: mail});
    this.setState({selectedUserName: name});
    this.setState({ userModalVisible: true });
  }

  /**
   * Function used for close the user modal
   */
  handleUserModalClose = () => {
    this.setState({ userModalVisible: false });
  }

  /**
   *  Function used for close the user modal
   *  Load and display the user profile page
   */
  handleUserModalCloseValidated = () => {
    this.setState({ userModalVisible: false });
    ReactDOM.render(<UserProfile
      searchUserMail={this.state.selectedUserMail}
      searchUserName={this.state.selectedUserName}
      />, document.getElementById('root'));
  }

  /**
   * Function used for display the job modal
   */
  handleJobInputModalShow = () => {
    this.setState({ jobInputModalVisible: true });
  }

  /**
   * Function used for close the job modal
   */
  handleJobInputModalClose = () => {
    this.setState({ jobInputModalVisible: false });
  }

  /**
   * Function used for validate the new job input
   * Display success or failure alert
   */
  handleJobInputModalCloseValidated = () => {
    axios.post(`http://127.0.0.1:3010/account/profile/history/job`, {email: this.props.userEmail, company: this.state.selectedCompJob, job: {from: this.state.inputJobStartTime, to: this.state.inputJobStopTime, title: this.state.jobInput}})
    .then(ret => {
      this.setState({selectedCompJob: ''});
      this.setState({inputJobStartTime: ''});
      this.setState({inputJobStopTime: ''});
      this.setState({jobInput: ''});
      alert('Job input created with success !');
    })
    .catch(error => console.log(error));

    this.setState({ jobInputModalVisible: false });
  }

  /**
   * Function used for open the edit job modal
   */
  handleJobEditModalShow = () => {
    this.setState({ jobEditModalVisible: true });
  }

  /**
   * Function used for close the edit job modal
   */
  handleJobEditModalClose = () => {
    this.setState({ jobEditModalVisible: false });
  }

  /**
   * Internal function used for set the userName into react properties
   * @param {event} event The new userName value
   */
  handleUserNameChange = name => event => {
    this.setState({ userName: event.target.value });
  }

  /**
   * Internal function used for set the country into react properties
   * @param {event} event The new country value
   */
  handleCountryChange = name => event => {
    this.setState({ country: event.target.value });
  }

  /**
   * Internal function used for set the company into react properties
   * @param {event} event The new company value
   */
  handleCompanyChange = name => event => {
    this.setState({ company: event.target.value });
  }

  /**
   * Internal function used for set the selectedCompJob into react properties
   * @param {event} event The new selectedCompJob value
   */
  handleCompanyChangeJob = name => event => {
    this.setState({ selectedCompJob: event.target.value });
  }

  /**
   * Internal function used for set the job into react properties
   * @param {event} event The new job value
   */
  handleJobChange = name => event => {
    this.setState({ job: event.target.value });
  }

  /**
   * Internal function used for set the jobInput into react properties
   * @param {event} event The new jobInput value
   */
  handleJobInputChange = name => event => {
    this.setState({ jobInput: event.target.value });
  }

  /**
   * Internal function used for set the age into react properties
   * @param {event} event The new age value
   */
  handleAgeChange = name => event => {
    this.setState({ age: event.target.value });
  }

  /**
   * Internal function used for set the inputJobStartTime into react properties
   * @param {event} event The new inputJobStartTime value
   */
  handleCurrentJobStartDate = name => event => {
    this.setState({ inputJobStartTime: event.target.value });
  }

  /**
   * Internal function used for set the inputJobStopTime into react properties
   * @param {event} event The new inputJobStopTime value
   */
  handleCurrentJobStopDate = name => event => {
    this.setState({ inputJobStopTime: event.target.value });
  }

  /**
   * Internal function used for set the selectedPicture into react properties
   * @param {event} event The new selectedPicture value
   */
  handleProfilePictureChange = name => event => {
    this.setState({ selectedPicture: event.target.value });
  }

  /**
   * Internal function used for set the type of new input job into react properties
   */
  handleNewJobInputCompanyTypeChanged = () => {
    if (this.state.newJobInputType === 'School') {
      this.setState({ newJobInputType: 'Company' });
    }
    else if (this.state.newJobInputType === 'Company') {
      this.setState({ newJobInputType: 'School' });
    }
  }

  /**
   * Internal function used for set the selectedCompJob into react properties
   * @param {string} value The new selectedCompJob value
   */
  handleSelectedCompJobChange = (value) => {
    this.setState({ selectedCompJob: value.value});
  }

  /**
   * Internal function used for set the selectedCountry into react properties
   * @param {string} value The new selectedCountry value
   */
  handleSelectedCountryChange = (value) => {
    this.setState({ selectedCountry: value});
  }

  /**
   * Internal function used for set the selectedComp into react properties
   * @param {string} value The new selectedComp value
   */
  handleSelectedCompChange = (value) => {
    this.setState({ selectedComp: value});
  }

  /**
   * Internal function used to close the job modal
   */
  compJobClose = () => {
    this.setState({compJobInputVisible: false});
  }

  /**
   * Internal function used to close the job modal
   * Display job input modal
   */
  compJobCloseValidated = () => {
    if (this.state.selectedCompJob !== '') {
      this.setState({compJobInputVisible: false});
      this.setState({ jobInputModalVisible: true });
    }
    else {
      alert("Please select a company");
    }
  }

  /**
   * Function used for close the job modal
   */
  compJobShow = () => {
    this.setState({compJobInputVisible: true});
  }

  /**
   * Function used to update user country
   */
  updateCountry() {
    if (this.state.country !== this.state.selectedCountry) {
      this.setState({country: this.state.selectedCountry})
    }
  }

  /**
   * Function used to update user country
   *  @return {object} the new user profile
   */
  setNewProfile() {
    this.updateCountry();
    let tmpNameRow = {label: 'name', value: this.state.userName};
    let tmpAgeRow = {label: 'age', value: this.state.age};
    let tmpProfile = [];
    tmpProfile.push(tmpNameRow);
    tmpProfile.push(tmpAgeRow);
    return tmpProfile;
  }

  /**
   * Function used to update user country
   *  @param {object} the new user country
   */
  handleCountryList(ret) {
    this.setState({countries: ret.data});
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
            handleProfileModalCloseValidated={this.handleProfileModalCloseValidated}
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
            updateCountry={this.updateCountry}
            handleSearchUserName={this.handleSearchUserName}
            searchUserList={this.state.searchUserList}
            handleSearchUser={this.handleSearchUser}
            selectedComp={this.state.selectedComp}
            handleSelectedCompChange={this.handleSelectedCompChange}
            jobList={this.state.jobList}
            handleCurrentJobStopDate={this.handleCurrentJobStopDate}
            selectedCompJob={this.state.selectedCompJob}
            compJobInputVisible={this.state.compJobInputVisible}
            compJobClose={this.compJobClose}
            compJobShow={this.compJobShow}
            handleJobInputModalCloseValidated={this.handleJobInputModalCloseValidated}
            handleJobInputChange={this.handleJobInputChange}
            handleUserModalCloseValidated={this.handleUserModalCloseValidated}
          />
        </main>
        {/*Modal add new job input*/}
        <Modal visible={this.state.compJobInputVisible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.compJobClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>Select company</h2>
            <div style={{marginLeft: 20 }}>
              <Dropdown
                options={this.state.companies}
                onChange={this.handleSelectedCompJobChange}
                value={this.state.selectedCompJob}
                placeholder="Select a company"
                style={{width: 200}}/>
                <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginTop: 20 }} onClick={this.compJobCloseValidated}>
                  Validate
                </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);

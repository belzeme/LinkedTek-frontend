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
import Inner from './content/schoolAndCompaniesInner.js';
import Modal from 'react-awesome-modal';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
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

class School extends React.Component {
  state = {
    open: true,
    newInputTypes: ['School', 'Company'],
    newInputTypeSelected: 0,
    newInputName: '',
    newInputDescription: '',
    countryList: [''],
    selectedCountry: 0,
    schoolList: [],
    schoolDescription: [],
    schoolSubscribed: [],
    companyList: [],
    companyDescription: [],
    companySubscribed: [],
    filteredCountrySchools: 0,
    filteredCountryCompanies: 0,
    isSuccessModalVisible: false,
    isErrorsModalVisible: false,
    isEditSchoolModalVisible: false,
    isEditCompanyModalVisible: false,
    editInputName: '',
    editInputDesc: '',
  };

  addNewSchoolToState(value) {
//    console.log('val : ' + value.name);
    let tmp = this.state.schoolList;
    tmp.push(value.name);
    this.setState({schoolList: tmp});

    tmp = this.state.schoolDescription;
    tmp.push(value.description);
    this.setState({schoolDescription: tmp});
  }

  addNewCompanyToState(value) {
    //console.log("NAME : " + value.name);
    let tmp = this.state.companyList;
    tmp.push(value.name);
    this.setState({companyList: tmp});

    //console.log("DESC : " + value.description);
    tmp = this.state.companyDescription;
    tmp.push(value.description);
    this.setState({companyDescription: tmp});
  }

  componentWillMount() {
    axios.get(`http://127.0.0.1:3010/country/list`)
    .then(ret => this.handleCountryList(ret))
    .catch(error => console.log('error : ' + error));

    axios.get(`http://127.0.0.1:3010/school/list`)
    .then(ret => this.handleSchoolList(ret))
    .catch(error => console.log('error : ' + error));

    axios.get(`http://127.0.0.1:3010/company/list`)
    .then(ret => this.handleCompList(ret))
    .catch(error => console.log('error : ' + error));

    axios.post(`http://127.0.0.1:3010/account/subscription/list`, {email: this.props.userEmail, target: 'school'})
    .then(ret => this.handleUserSubscriptionsSchool(ret))
    .catch(error => console.log('error : ' + error));

    axios.post(`http://127.0.0.1:3010/account/subscription/list`, {email: this.props.userEmail, target: 'company'})
    .then(ret => this.handleUserSubscriptionsCompany(ret))
    .catch(error => console.log('error : ' + error));
  }

  handleCountryList(ret) {
    this.setState({countryList: ret.data});
  }

  handleCompList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewCompanyToState(value[k]));
      }
      i++;
    }
  }

  addItemToUserSubscriptions(value, type) {
    if (type === 'school') {
      let tmp = this.state.schoolSubscribed;
      tmp.push(value.name);
      this.setState({schoolSubscribed: tmp});
    }
    else if (type === 'company') {
      let tmp = this.state.companySubscribed;
      tmp.push(value.name);
      this.setState({companySubscribed: tmp});
    }
  }

  handleUserSubscriptionsSchool(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToUserSubscriptions(value[k], 'school'));
      }
      i++;
    }
  }

  handleUserSubscriptionsCompany(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addItemToUserSubscriptions(value[k], 'company'));
      }
      i++;
    }
  }

  handleSchoolList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewSchoolToState(value[k], k));
      }
      i++;
    }
  }

  createNewSchoolReturn(value, ret) {
    if (value === true) {
      this.handleSuccessModalShow();
    }
    else {
      //console.log('ret : ' + ret);
      this.handleErrorModalShow();
    }
  }

  createNewCompReturn(value, ret) {
    if (value === true) {
      //console.log("TRUE");
      console.log(ret);
      this.handleSuccessModalShow();
    }
    else {
      //console.log("FALSE");
      this.handleErrorModalShow();
    }
  }

  handleSuccessModalClose = () => {
    this.setState({ isSuccessModalVisible: false });
  }

  handleSuccessModalShow = () => {
    this.setState({ isSuccessModalVisible: true });
  }

  handleErrorModalClose = () => {
    this.setState({ isErrorModalVisible: false });
  }

  handleErrorModalShow = () => {
    this.setState({ isErrorModalVisible: true });
  }

  handleCreateNewItemTests(type) {
    if (type === 0) {
      if (this.state.newInputName === '' || this.state.newInputDescription === '' || this.state.selectedCountry === '') {
        this.setState({ isErrorModalVisible: true });
        return 'KO';
      }
    }
    else {
      if (this.state.newInputName === '' || this.state.newInputDescription === '' || this.state.selectedCountry === '') {
        this.setState({ isErrorModalVisible: true });
        return 'KO';
      }
    }
    return 'OK';
  }

  handleCreateNewSchool = (props) => {
    if (this.handleCreateNewItemTests(this.state.newInputTypeSelected) === 'OK') {
      if (this.state.newInputTypeSelected === 0) {
        axios.post(`http://127.0.0.1:3010/school/create`, {name: this.state.newInputName, description: this.state.newInputDescription, country: this.state.selectedCountry})
        .then(ret => {
          this.createNewSchoolReturn(true, ret);
        })
        .catch(ret => this.createNewSchoolReturn(false, ret));
      }
      else {
        //console.log("NAME : " + this.state.newInputName + '\nDESC: ' + this.state.newInputDescription + '\nCountry : ' + this.state.selectedCountry);
        axios.post(`http://127.0.0.1:3010/company/create`, {name: this.state.newInputName, description: this.state.newInputDescription, country: this.state.selectedCountry})
        .then(ret => {
          this.createNewCompReturn(true, ret);
        })
        .catch(ret => this.createNewCompReturn(false, ret));
      }
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleNewInputTypeChanged = () => {
    if (this.state.newInputTypeSelected === 0) {
      this.setState({ newInputTypeSelected: 1 });
    }
    else {
      this.setState({ newInputTypeSelected: 0 });
    }
  }

  handleInputNameChanged = (event) => {
    this.setState({ editInputName: event.target.value });
  }

  handleInputDescChanged = (event) => {
    this.setState({ editInputDesc: event.target.value });
  }

  handleNewInputDescriptionChanged = (event) => {
    this.setState({ newInputDescription: event.target.value });
  }

  handleSelectedCountryChange = (value) => {
    this.setState({ selectedCountry: value.value});
  }

  handleEditSchoolModalClose = () =>{
    this.setState({isEditSchoolModalVisible: false});
  }

  handleEditSchoolModalShow = (index) => {
    this.setState({editInputName: this.state.schoolList[index]});
    this.setState({editInputDesc: this.state.schoolDescription[index]});
    this.setState({isEditSchoolModalVisible: true});
  }

  handleEditCompanyModalClose = () =>{
    this.setState({isEditCompanyModalVisible: false});
  }

  handleEditCompanyModalShow = (index) => {
    this.setState({editInputName: this.state.companyList[index]});
    this.setState({editInputDesc: this.state.companyDescription[index]});
    this.setState({isEditCompanyModalVisible: true});
  }

  handleSchoolorCompanySubscription(value, ret, name, subscribe) {
    if (value) {
      //success
      console.log(ret);
      if (subscribe) {
        alert("You are now subscribed to " + name);
      }
      else {
        alert("You are now unsubscribed to " + name);
      }
    }
    else {
      //failure
      if (subscribe) {
        alert("Error with subscription to " + name + " please retry later");
        console.log('ret : ' + ret);
      }
      else {
        alert("Error with unsubscription to " + name + " please retry later");
        console.log('ret : ' + ret);
      }
    }
  }

  handleUserSchoolOrCompanySubscription = (selectedName, type) => {
    if (type === 'school') {
      let subscribed = false;
      for (let i = 0; i < this.state.schoolSubscribed.length; i++) {
        if (selectedName === this.state.schoolSubscribed[i]) {
          //Unsubscribe
          subscribed = true;
          if (subscribed) {
            axios.delete(`http://127.0.0.1:3010/account/subscription`, {data : {email: this.props.userEmail, target: 'school', name: selectedName}})
            .then(ret => {
              this.handleSchoolorCompanySubscription(true, ret, selectedName, false);
            })
            .catch(ret => this.handleSchoolorCompanySubscription(false, ret, selectedName, false));
          }
        }
      }
      //Subscribe
      if (!subscribed) {
        axios.post(`http://127.0.0.1:3010/account/subscription`, {email: this.props.userEmail, target: 'school', name: selectedName})
        .then(ret => {
          this.handleSchoolorCompanySubscription(true, ret, selectedName, true);
        })
        .catch(ret => this.handleSchoolorCompanySubscription(false, ret, selectedName, true));
      }
    }
    else if (type === 'company') {
      let subscribed = false;
      for (let i = 0; i < this.state.companySubscribed.length; i++) {
        if (selectedName === this.state.companySubscribed[i]) {
          //Unsubscribe
          subscribed = true;
          if (subscribed) {
            axios.delete(`http://127.0.0.1:3010/account/subscription`, {data : {email: this.props.userEmail, target: 'company', name: selectedName}})
            .then(ret => {
              this.handleSchoolorCompanySubscription(true, ret, selectedName, false);
            })
            .catch(ret => this.handleSchoolorCompanySubscription(false, ret, selectedName, false));
          }
        }
      }
      //Subscribe
      if (!subscribed) {
        axios.post(`http://127.0.0.1:3010/account/subscription`, {email: this.props.userEmail, target: 'company', name: selectedName})
        .then(ret => {
          this.handleSchoolorCompanySubscription(true, ret, selectedName, true);
        })
        .catch(ret => this.handleSchoolorCompanySubscription(false, ret, selectedName, true));
      }
    }
  }

  handleFilterSchool(sucess, ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewSchoolToState(value[k], k));
      }
      i++;
    }
  }

  handleFilterCompany(sucess, ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewCompanyToState(value[k], k));
      }
      i++;
    }
  }

  handleFilteredCountryChangeSchools = (value) => {
    this.setState({filteredCountrySchools: value});
    axios.post(`http://127.0.0.1:3010/school/filter`, {name: value.value})
    .then(ret => {
      this.setState({schoolList: []});
      this.setState({schoolDescription: []});
      this.handleFilterSchool(true, ret);
    })
    .catch(error => console.log(error));
  }

  handleFilteredCountryChangeCompanies = (value) => {
    this.setState({ filteredCountryCompanies: value});
    axios.post(`http://127.0.0.1:3010/company/filter`, {name: value.value})
    .then(ret => {
      this.setState({companyList: []});
      this.setState({companyDescription: []});
      this.handleFilterCompany(true, ret);
    })
    .catch(error => console.log(error));
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
            School and Companies
          </Typography>
          <Inner
            newInputTypes={this.state.newInputTypes}
            newInputTypeSelected={this.state.newInputTypeSelected}
            handleNewInputTypeChanged={this.handleNewInputTypeChanged}
            handleNewInputNameChanged={this.handleNewInputNameChanged}
            handleNewInputDescriptionChanged={this.handleNewInputDescriptionChanged}
            countryList={this.state.countryList}
            selectedCountry={this.state.selectedCountry}
            handleSelectedCountryChange={this.handleSelectedCountryChange}
            schoolList={this.state.schoolList}
            schoolDescription={this.state.schoolDescription}
            schoolSubscribed={this.state.schoolSubscribed}
            companyDescription={this.state.companyDescription}
            companyList={this.state.companyList}
            companySubscribed={this.state.companySubscribed}
            filteredCountrySchools={this.state.filteredCountrySchools}
            filteredCountryCompanies={this.state.filteredCountryCompanies}
            handleFilteredCountryChangeSchools={this.handleFilteredCountryChangeSchools}
            handleFilteredCountryChangeCompanies={this.handleFilteredCountryChangeCompanies}
            handleNewInputValidate={this.handleCreateNewSchool}
            newInputName={this.state.newInputName}
            newInputDescription={this.state.newInputDescription}
            isSuccessModalVisible={this.state.isSuccessModalVisible}
            isErrorModalVisible={this.state.isErrorModalVisible}
            handleErrorModalClose={this.handleErrorModalClose}
            handleSuccessModalClose={this.handleSuccessModalClose}
            handleEditSchoolModalShow={this.handleEditSchoolModalShow}
            handleEditCompanyModalShow={this.handleEditCompanyModalShow}
            handleUserSchoolOrCompanySubscription={this.handleUserSchoolOrCompanySubscription}
          />
        </main>
        <Modal visible={this.state.isEditCompanyModalVisible} width="500" height="420" effect="fadeInUp" onClickAway={() => this.handleEditCompanyModalClose()}>
          <CardHeader
            title="Edit Company"
          />
          <CardActions style={{marginLeft: 5, marginTop: 10 }}>
            <TextField
              id="standard-with-placeholder"
              label="Company Name"
              value={this.state.editInputName}
              placeholder={this.state.editInputName}
              className={classes.textField}
              margin="normal"
              style={{marginLeft: 10, width: "95%"}}
              onChange={this.handleInputNameChanged}
            />
          </CardActions>
          <CardActions style={{marginLeft: 5, marginTop: 10 }}>
            <TextField
              id="standard-with-placeholder"
              label="Company description"
              value={this.state.editInputDesc}
              placeholder={this.state.editInputDesc}
              className={classes.textField}
              margin="normal"
              multiline={true}
              rows={1}
              rowsMax={7}
              onChange={this.handleInputDescChanged}
              style={{marginLeft: 10, width: "95%"}}
            />
          </CardActions>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.handleEditCompanyModalClose()}>
            Edit
          </Button>
        </Modal>
        <Modal visible={this.state.isEditSchoolModalVisible} width="500" height="420" effect="fadeInUp" onClickAway={() => this.handleEditSchoolModalClose()}>
          <CardHeader
            title="Edit School"
          />
          <CardActions style={{marginLeft: 5, marginTop: 10 }}>
            <TextField
              id="standard-with-placeholder"
              label="Company Name"
              value={this.state.editInputName}
              placeholder={this.state.editInputName}
              className={classes.textField}
              margin="normal"
              style={{marginLeft: 10, width: "95%"}}
              onChange={this.handleInputNameChanged}
            />
          </CardActions>
          <CardActions style={{marginLeft: 5, marginTop: 10 }}>
            <TextField
              id="standard-with-placeholder"
              label="Company description"
              value={this.state.editInputDesc}
              placeholder={this.state.editInputDesc}
              className={classes.textField}
              margin="normal"
              multiline={true}
              rows={1}
              rowsMax={7}
              onChange={this.handleInputDescChanged}
              style={{marginLeft: 10, width: "95%"}}
            />
          </CardActions>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.handleEditSchoolModalClose()}>
            Edit
          </Button>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(School);

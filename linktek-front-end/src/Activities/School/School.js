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
    schoolSubscribed: [
      true,
      false,
      true,
      false,
      false,
      false,
    ],
    companyList: [],
    companyDescription: [],
    companySubscribed: [
      false,
      true,
      true,
      false,
      false,
      true,
    ],
    filteredCountrySchools: 0,
    filteredCountryCompanies: 0,
    isSuccessModalVisible: false,
    isErrorsModalVisible: false,
  };

  addNewSchoolToState(value) {
    //console.log("NAME : " + value.name);
    let tmp = this.state.schoolList;
    tmp.push(value.name);
    this.setState({schoolList: tmp});

    //console.log("DESC : " + value.description);
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
    .then(ret => this.handleCountryList(ret));

    axios.get(`http://127.0.0.1:3010/school/list`)
    .then(ret => this.handleSchoolList(ret));

    axios.get(`http://127.0.0.1:3010/company/list`)
    .then(ret => this.handleCompList(ret));
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

  handleSchoolList(ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewSchoolToState(value[k]));
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

  handleCreateNewSchool = (props) => {
    if ((this.state.newInputName === '' || this.state.newInputDescription === '' || this.state.selectedCountry === '') && this.state.newInputTypeSelected === 0) {
      this.createNewSchoolReturn(false, 0);
    }
    else if ((this.state.newInputName === '' || this.state.newInputDescription === '' || this.state.selectedCountry === '') && this.state.newInputTypeSelected === 1) {
      this.createNewCompReturn(false, 0);
    }
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

  handleNewInputNameChanged = (event) => {
    this.setState({ newInputName: event.target.value });
  }

  handleNewInputDescriptionChanged = (event) => {
    this.setState({ newInputDescription: event.target.value });
  }

  handleSelectedCountryChange = (value) => {
    this.setState({ selectedCountry: value.value});
  }

  handleFilterSchool(sucess, ret) {
    let i = 0;
    for (let value of Object.values(ret)) {
      if (i === 0) {
        Object.keys(value).map(k => this.addNewSchoolToState(value[k]));
      }
      i++;
    }
  }

  handleFilteredCountryChangeSchools = (value) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
    this.setState({ filteredCountrySchools: value});
    axios.post(`http://127.0.0.1:3010/school/filter`, {name: value.value})
    .then(ret => {
      console.log('ret', ret);
      this.setState({ schoolList: ['']});
      this.handleFilterSchool(true, ret);
    })
    .catch(error => console.log(error));
  }

  handleFilteredCountryChangeCompanies = (value) => {
    this.setState({ filteredCountryCompanies: value});
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
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(School);

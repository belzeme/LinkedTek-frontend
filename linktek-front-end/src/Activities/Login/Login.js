
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactDOM from 'react-dom';
import Register from './Register.js';
import Actualities from '../Actualities/Actualities.js';
import Modal from 'react-awesome-modal';
import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "blue",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor() {
    super();

    this.state = {
      login: "",
      password: "",
      token: '',
      isConnectionFailedModalVisible: false,
    };
  }

  handleErrorMessage() {
    if (this.state.login === '') {
      return 'Error email field cannot be empty';
    }
    else if (this.state.password === '') {
      return 'Error password field cannot be empty';
    }
    else {
      return 'OK';
    }
  }

  handleLoginChange(event)  {
    this.setState({login: event.target.value});
  }

  handlePasswordChange(event)  {
    this.setState({password: event.target.value});
  }

  handleConnectionSuccess(ret) {
    console.log('test : ' + ret.data.token);
    this.setState({token: ret.data.token})
    ReactDOM.render(<Actualities userEmail={this.state.login} />, document.getElementById('root'));
  }

  handleConnectionFailed() {
    this.handleConnectionFailedModalShow();
  }

  handleConnectionFailedModalShow() {
    this.setState({isConnectionFailedModalVisible: true});
  }

  handleConnectionFailedModalClose() {
    this.setState({isConnectionFailedModalVisible: false});
  }

  clickOnSubmitButton() {
    if (this.handleErrorMessage() !== 'OK') {
      this.handleConnectionFailedModalShow();
    }
    else {
      axios.post(`http://127.0.0.1:3010/auth/login`, {email: this.state.login, password: this.state.password})
      .then(ret => this.handleConnectionSuccess(ret))
      .catch(error => this.handleConnectionFailed());
    }
  }

  clickOnRegisterButton() {
    //console.log("Login : " + this.state.login + '\nPassword : ' + this.state.password);
    ReactDOM.render(<Register />, document.getElementById('root'));
  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={(event) => this.handleLoginChange(event)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={(event) => this.handlePasswordChange(event)}/>
            </FormControl>
            <Button onClick={() => this.clickOnSubmitButton()}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Button onClick={() => this.clickOnRegisterButton()}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
        </Paper>
        <Modal visible={this.state.isConnectionFailedModalVisible} width="500" height="200" effect="fadeInUp" onClickAway={() => this.handleConnectionFailedModalClose()}>
          <div>
            <h3 style={{marginTop: 40, textAlign: 'center'}}>Connection failed !</h3>
            <h3 style={{textAlign: 'center'}}>An error occured on login or password</h3>
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 11, marginTop: 10 }} onClick={() => this.handleConnectionFailedModalClose()}>
            Close
          </Button>
        </Modal>
      </main>
    );
  }
}

export default withStyles(styles)(Login);

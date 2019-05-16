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
import Modal from 'react-awesome-modal';
import Login from './Login.js';
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

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmation: "",
      name: "",
      isModalVisible: false,
      isReturnServerOKModalVisible: false,
      isReturnServerKOModalVisible: false,
    };
  }

  handleEmailChange(event)  {
    this.setState({email: event.target.value});
  }

  handleNameChange(event)  {
    console.log('test : ' + event.target.value);
    this.setState({name: event.target.value});
  }

  handlePasswordChange(event)  {
    this.setState({password: event.target.value});
  }

  handleConfirmChange(event)  {
    this.setState({confirmation: event.target.value});
  }

  handleModalShow() {
    this.setState({isModalVisible: true});
  }

  handleModalClose() {
    this.setState({isModalVisible: false});
  }

  handleKoModalShow() {
    this.setState({isReturnServerKOModalVisible: true});
  }

  handleKoModalClose() {
    this.setState({isReturnServerKOModalVisible: false});
  }

  handleOkModalShow() {
    this.setState({isReturnServerOKModalVisible: true});
  }

  handleOkModalClose() {
    this.setState({isReturnServerOKModalVisible: false});
  }

  handleErrorMessage() {
    if (this.state.email === '') {
      return 'Error email field cannot be empty';
    }
    else if (this.state.name === '') {
      return 'Error user name field cannot be empty';
    }
    else if (this.state.password === '') {
      return 'Error password field cannot be empty';
    }
    else if (this.state.confirmation === '') {
      return 'Error, password confirmation cannot be empty';
    }
    else if (this.state.password !== this.state.confirmation) {
      return 'Error with password and password confirmation';
    }
    else {
      return 'OK';
    }
  }

  handleAccountCreationSuccess() {
    this.handleOkModalClose();
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  clickOnSubmitButton = (email, password) => {
    //console.log("Email : " + this.state.email + '\nPassword : ' + this.state.password + '\nConfirmation : ' + this.state.confirmation);

    if (this.handleErrorMessage() !== 'OK') {
      this.handleModalShow()
    }
    else {
      axios.post(`http://127.0.0.1:3010/auth/register`, {email: this.state.email, password: this.state.password, name: this.state.name})
      .then(ret => this.handleOkModalShow())
      .catch(error => this.handleKoModalShow());
    }
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
            Register
          </Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={(event) => this.handleEmailChange(event)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Name</InputLabel>
              <Input id="email" name="name" autoComplete="name" autoFocus onChange={(event) => this.handleNameChange(event)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={(event) => this.handlePasswordChange(event)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password Confirmation</InputLabel>
              <Input name="passwordConfirmatiobn" type="password" id="passwordConfirmation" autoComplete="current-password" onChange={(event) => this.handleConfirmChange(event)}/>
            </FormControl>
            <Button onClick={() => this.clickOnSubmitButton(this.state.email, this.state.password)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
        </Paper>
        <Modal visible={this.state.isModalVisible} width="500" height="200" effect="fadeInUp" onClickAway={() => this.handleModalClose()}>
          <div>
            <h3 style={{marginTop: 60, textAlign: 'center'}}>{this.handleErrorMessage()}</h3>
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 11, marginTop: 10 }} onClick={() => this.handleModalClose()}>
            Close
          </Button>
        </Modal>
        <Modal visible={this.state.isReturnServerOKModalVisible} width="500" height="200" effect="fadeInUp" onClickAway={() => this.handleOkModalClose()}>
          <div>
            <h3 style={{marginTop: 60, textAlign: 'center'}}>Account creation success !</h3>
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 11, marginTop: 10 }} onClick={() => this.handleAccountCreationSuccess()}>
            Close
          </Button>
        </Modal>
        <Modal visible={this.state.isReturnServerKOModalVisible} width="500" height="200" effect="fadeInUp" onClickAway={() => this.handleKoModalClose()}>
          <div>
            <h3 style={{marginTop: 60, textAlign: 'center'}}>Account creation failed, email alreay used !</h3>
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 11, marginTop: 10 }} onClick={() => this.handleKoModalClose()}>
            Close
          </Button>
        </Modal>
      </main>
    );
  }
}

export default withStyles(styles)(Register);

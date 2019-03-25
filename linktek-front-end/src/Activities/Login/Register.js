
import React, { Component } from 'react';
import { Alert } from 'react';
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
import Login from './Login.js';
import Snackbar from '../../Components/snackBar.js';

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
    };
  }

  handleEmailChange(event)  {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event)  {
    this.setState({password: event.target.value});
  }

  handleConfirmChange(event)  {
    this.setState({confirmation: event.target.value});
  }

  clickOnSubmitButton = () => {
    //console.log("Email : " + this.state.email + '\nPassword : ' + this.state.password + '\nConfirmation : ' + this.state.confirmation);
    //ReactDOM.render(<Login />, document.getElementById('root'));
    if (this.state.password !== this.state.passwordConfirmation) {
      console.log("BLOP");
      return <Snackbar />
    }
    else {

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
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={(event) => this.handlePasswordChange(event)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password Confirmation</InputLabel>
              <Input name="passwordConfirmatiobn" type="password" id="passwordConfirmation" autoComplete="current-password" onChange={(event) => this.handleConfirmChange(event)}/>
            </FormControl>
            <Button onClick={() => this.clickOnSubmitButton()}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Register);

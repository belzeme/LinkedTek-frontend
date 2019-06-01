import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';
import TextField from '@material-ui/core/TextField';
import Dropdown from 'react-dropdown';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function handleUserAge(age) {
  return age + " Years old";
}

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div style={{marginLeft: "auto", marginRight: "auto"}}>
      <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        <ListItem>
          <ListItemText primary={props.job}/>
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary={props.company}/>
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText primary={handleUserAge(props.age)}/>
        </ListItem>
      </List>
      <Button style={{backgroundColor: '#3f51b5', width: "100%", color: "white" }} onClick={props.handleProfileModalShow}>
        Edit profile
      </Button>
      {/*edit user profile modal*/}
      <Modal visible={props.profileModalVisible} width="410" height="550" effect="fadeInUp" onClickAway={() => props.handleProfileModalClose()}>
        <div style={{maxHeight: 550, overflow: 'auto'}}>
          <h2 style={{display: 'flex', justifyContent: 'center'}}>Edit profile</h2>
          {/*textField for user name*/}
          <TextField
            id="standard-with-placeholder"
            label="Name"
            placeholder={props.userName}
            className={classes.textField}
            value={props.userName}
            margin="normal"
            onChange={props.handleUserNameChange('userName')}
            style={{marginLeft: 10, width: "95%"}}
          />
          {/*company for title change*/}
          <div style={{marginLeft: 13, marginTop: 10, marginBottom: 10}}>
            <p style={{fontSize: 13, color: 'grey'}}>Company </p>
            <Dropdown
              options={props.companies}
              onChange={props.handleSelectedCompChange}
              value={props.selectedComp}
              style={{width: 200}}
            />
            <p style={{color: 'grey', marginTop: -5, marginBottom: -5}}>________________________________________________</p>
          </div>
          {/*textField for job title change*/}
          <TextField
            id="standard-with-placeholder"
            label="Current Job"
            placeholder={props.job}
            value={props.job}
            onChange={props.handleJobChange('Job')}
            className={classes.textField}
            margin="normal"
            style={{marginLeft: 10, width: "95%"}}
          />
          {/*country for title change*/}
          <div style={{marginLeft: 13, marginTop: 10, marginBottom: 10}}>
            <p style={{fontSize: 13, color: 'grey'}}>Country </p>
            <Dropdown
              options={props.countries}
              onChange={props.handleSelectedCountryChange}
              value={props.selectedCountry}
              style={{width: 200}}
            />
            <p style={{color: 'grey', marginTop: -5, marginBottom: -5}}>________________________________________________</p>
          </div>
          {/*age picker */}
          <TextField
            id="date"
            label="Age"
            type="number"
            defaultValue={props.age}
            onChange={props.handleAgeChange('Age')}
            className={classes.textField}
            style={{marginLeft: 10, marginTop: 15, width: "95%"}}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/*profile image picker */}
          <div>
            <input
              accept="image/*"
              className={classes.input}
              style={{ marginTop: 20, marginLeft: 10, width: '95%' }}
              id="raised-button-file"
              type="file"
              onChange={props.handleProfilePictureChange('Picture')}
            />
          </div>

          <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
            <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={props.handleProfileModalCloseValidated}>
              Validate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(PaperSheet);

import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dropdown from 'react-dropdown';
import Modal from 'react-awesome-modal';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class AddNewSchoolOrCompany extends React.Component {

  handleSuccessText() {
    if (this.props.newInputTypeSelected === 0) {
        return 'Shool creation failed !';
    }
    else {
      return 'Company creation failed !';
    }
  }

  handleErrorText() {
    if (this.props.newInputTypeSelected === 0) {
        return 'Shool creation sucess !';
    }
    else {
      return 'Company creation success !';
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} style={{marginTop: 20}}>
        <CardHeader
          title="Add New Input"
        />
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <CardActions style={{marginLeft: 10}}>
            <FormControl component="fieldset" className={classes.formControl}>
             <FormLabel component="legend">Input Type</FormLabel>
               <RadioGroup
                 aria-label="Input type"
                 name="gender1"
                 className={classes.group}
                 value={this.props.newInputTypes[this.props.newInputTypeSelected]}
                 onChange={this.props.handleNewInputTypeChanged}
               >
                 <FormControlLabel value="School" control={<Radio />} label="School" />
                 <FormControlLabel value="Company" control={<Radio />} label="Company" style={{marginTop: -5}}/>
              </RadioGroup>
            </FormControl>
          </CardActions>
          <CardActions style={{marginLeft: 5 }}>
            <TextField
              id="standard-with-placeholder"
              label="New input name"
              placeholder="Enter name here ..."
              className={classes.textField}
              margin="normal"
              onChange={this.props.handleNewInputNameChanged}
              style={{marginLeft: 10, width: "95%"}}
            />
          </CardActions>
          <CardActions style={{marginLeft: 5, marginTop: 10 }}>
            <TextField
              id="standard-with-placeholder"
              label="New input description"
              placeholder="Enter description here ..."
              className={classes.textField}
              margin="normal"
              multiline={true}
              rows={1}
              rowsMax={7}
              onChange={this.props.handleNewInputDescriptionChanged}
              style={{marginLeft: 10, width: "95%"}}
            />
          </CardActions>
          <CardActions style={{marginTop: 12 }}>
            <p style={{marginLeft: 15}}>
              Country :
            </p>
            <div>
              <Dropdown
                options={this.props.countryList}
                onChange={this.props.handleSelectedCountryChange}
                value={this.props.selectedCountry}
                placeholder="Select any country"
                style={{width: 200}}/>
            </div>
          </CardActions>
          <CardActions>
            <div style={{width: "100%", marginTop: 10}}>
              <Button style={{backgroundColor: '#3f51b5', width: "96%", color: "white", marginLeft: 10, marginTop: 10}} onClick={() => this.props.handleNewInputValidate(this.props)}>
                VALIDATE
              </Button>
            </div>
          </CardActions>
        </div>
        <Modal visible={this.props.isSuccessModalVisible} width="500" height="200" effect="fadeInUp" onClickAway={() => this.props.handleSuccessModalClose()}>
          <div>
            <h3 style={{textAlign: 'center', marginTop: 50}}>{this.handleSuccessText()}</h3>
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.props.handleSuccessModalClose()}>
            Close
          </Button>
        </Modal>
        <Modal visible={this.props.isErrorModalVisible} width="500" height="200" effect="fadeInUp" onClickAway={() => this.props.handleErrorModalClose()}>
          <div>
            <h3 style={{textAlign: 'center', marginTop: 50}}>{this.handleErrorText()}</h3>
          </div>
          <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20}} onClick={() => this.props.handleErrorModalClose()}>
            Close
          </Button>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(AddNewSchoolOrCompany);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from './papers.js';
import TimelineList from './timelineList.js';
import Modal from 'react-awesome-modal';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dropdown from 'react-dropdown';

const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
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
  avatar: {
    backgroundColor: red[500],
  },
  formControl: {
    margin: theme.spacing.unit * 1,
  },
});

class TimelineModule extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleJobTitle(job, company) {
    return job + ' for ' + company;
  };

  handleJobStartTime = (date) => {
    return 'Since: ' + date;
  }

  handleNewInputType = () => {
    if (this.props.newJobIsCompany) {}
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Current Job"
        />
        <CardActions className={classes.actions}>
          <Paper
            title={this.handleJobTitle(this.props.job, this.props.company)}
            description={this.handleJobStartTime(this.props.currentJobStartTime)}/>
        </CardActions>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
          <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardHeader
              title="TimeLine"
            />
            <TimelineList
              names={this.props.names}
              namesState={this.props.namesState}
              companies={this.props.companies}
              getAvatarImage={this.getAvatarImage}
              formatThatLine={this.formatThatLine}
              jobList={this.props.jobList}
              handleJobEditModalShow={this.props.handleJobEditModalShow}
              />
          </CardContent>
          <CardContent>
            <Button style={{backgroundColor: '#3f51b5', width: "100%", color: "white" }} onClick={this.props.handleJobInputModalShow}>
              Add New Input
            </Button>
            {/*Modal add new job input*/}
            <Modal visible={this.props.jobInputModalVisible} width="400" height="550" effect="fadeInUp" onClickAway={() => this.props.handleJobInputModalClose()}>
              <div>
                <h2 style={{display: 'flex', justifyContent: 'center'}}>Add new job input</h2>
                {/*company for title change*/}
                <div style={{marginLeft: 13, marginTop: 10, marginBottom: 10}}>
                  <p style={{fontSize: 13, color: 'grey'}}>Company </p>
                  <Dropdown
                    options={this.props.companies}
                    onChange={this.props.handleSelectedCompChange}
                    value={this.props.selectedCompJob}
                    style={{width: 200}}
                  />
                  <p style={{color: 'grey', marginTop: -5, marginBottom: -5}}>________________________________________________</p>
                </div>
                {/*textField for job name*/}
                <TextField
                  id="standard-with-placeholder"
                  label="Job title"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.props.handleJobChange('Job')}
                  style={{marginLeft: 10, width: "95%"}}
                />
                {/*textField for date*/}
                <TextField
                  id="date start"
                  label="Start date"
                  type="date"
                  className={classes.textField}
                  style={{marginLeft: 10, marginTop: 20, width: "95%"}}
                  onChange={this.props.handleCurrentJobStartDate('Date')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/*textField for date*/}
                <TextField
                  id="date stop"
                  label="Stop date"
                  type="date"
                  className={classes.textField}
                  style={{marginLeft: 10, marginTop: 20, width: "95%"}}
                  onChange={this.props.handleCurrentJobStopDate('Date')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div style={{marginTop: 20}}>
                  <FormControl component="fieldset" className={classes.formControl}>
                   <FormLabel component="legend">Input Type</FormLabel>
                   <RadioGroup
                     aria-label="Input type"
                     name="gender1"
                     className={classes.group}
                     value={this.props.newJobInputType}
                     onChange={this.props.handleNewJobInputCompanyTypeChanged}
                   >
                     <FormControlLabel value="School" control={<Radio />} label="School" />
                     <FormControlLabel value="Company" control={<Radio />} label="Company" style={{marginTop: -5}}/>
                   </RadioGroup>
                 </FormControl>
               </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                  <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={this.props.handleJobInputModalClose}>
                    Close
                  </Button>
                </div>
              </div>
            </Modal>
          </CardContent>
        </Collapse>
        {/*Modal Edit job input*/}
        <Modal visible={this.props.jobEditModalVisible} width="400" height="550" effect="fadeInUp" onClickAway={() => this.props.handleJobEditModalClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{"Edit Job Input"}</h2>
            <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
              <TextField
                id="standard-with-placeholder"
                label="Company Name"
                className={classes.textField}
                margin="normal"
                placeholder={this.props.names[this.props.selectedEditInput]}
                onChange={this.props.handleCompanyChange('Company')}
                style={{marginLeft: 10, width: "95%"}}
              />
              {/*textField for job name*/}
              <TextField
                id="standard-with-placeholder"
                label="Job title"
                placeholder={this.props.namesJob[this.props.selectedEditInput]}
                className={classes.textField}
                margin="normal"
                onChange={this.props.handleJobChange('Job')}
                style={{marginLeft: 10, width: "95%"}}
              />
              {/*textField for start date*/}
              <TextField
                id="date"
                label="Start date"
                type="date"
                className={classes.textField}
                style={{marginLeft: 10, marginTop: 20, width: "95%"}}
                onChange={this.props.handleCurrentJobStartDate('Date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/*textField for stop date*/}
              <TextField
                id="date"
                label="Stop date"
                type="date"
                className={classes.textField}
                style={{marginLeft: 10, marginTop: 20, width: "95%"}}
                onChange={this.props.handleCurrentJobStartDate('Date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div style={{marginTop: 20}}>
                <FormControl component="fieldset" className={classes.formControl}>
                 <FormLabel component="legend">Input Type</FormLabel>
                 <RadioGroup
                   aria-label="Input type"
                   name="gender1"
                   className={classes.group}
                   /*value={this.props.namesState[this.props.selectedEditInput]}*/
                 >
                   <FormControlLabel value="School" control={<Radio />} label="School" />
                   <FormControlLabel value="Company" control={<Radio />} label="Company" style={{marginTop: -5}}/>
                 </RadioGroup>
               </FormControl>
             </div>
            </List>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: -5}}>
              <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={this.props.handleJobEditModalClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(TimelineModule);

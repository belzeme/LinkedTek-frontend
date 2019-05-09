import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileModule from '../../../Components/profile/ProfileModule.js';
import TimelineModule from '../../../Components/profile/timelineModule.js';
import SearchModule from '../../../Components/profile/searchModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class ProfileInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
         <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
           <Grid item xs>
             <Paper className={classes.paper}>
               <ProfileModule
                age={this.props.age}
                userName={this.props.userName}
                company={this.props.company}
                job={this.props.job}
                country={this.props.country}
                companies={this.props.companies}
                handleProfileModalClose={this.props.handleProfileModalClose}
                handleProfileModalShow={this.props.handleProfileModalShow}
                profileModalVisible={this.props.profileModalVisible}
                handleUserNameChange={this.props.handleUserNameChange}
                handleCountryChange={this.props.handleCountryChange}
                handleCompanyChange={this.props.handleCompanyChange}
                handleJobChange={this.props.handleJobChange}
                handleAgeChange={this.props.handleAgeChange}
                handleProfilePictureChange={this.props.handleProfilePictureChange}
                countries={this.props.countries}
                selectedCountry={this.props.selectedCountry}
                handleSelectedCountryChange={this.props.handleSelectedCountryChange}
              />
             </Paper>
           </Grid>
           <Grid item xs>
             <Paper className={classes.paper}>
                <TimelineModule
                  job={this.props.job}
                  company={this.props.company}
                  names={this.props.names}
                  currentJobStartTime={this.props.currentJobStartTime}
                  namesState={this.props.namesState}
                  companies={this.props.companies}
                  handleJobInputModalShow={this.props.handleJobInputModalShow}
                  handleJobInputModalClose={this.props.handleJobInputModalClose}
                  jobInputModalVisible={this.props.jobInputModalVisible}
                  handleJobChange={this.props.handleJobChange}
                  handleCompanyChange={this.props.handleCompanyChange}
                  handleCurrentJobStartDate={this.props.handleCurrentJobStartDate}
                  jobEditModalVisible={this.props.jobEditModalVisible}
                  handleJobEditModalShow={this.props.handleJobEditModalShow}
                  handleJobEditModalClose={this.props.handleJobEditModalClose}
                  selectedEditInput={this.props.selectedEditInput}
                  namesJob={this.props.namesJob}
                  handleNewJobInputCompanyTypeChanged={this.props.handleNewJobInputCompanyTypeChanged}
                  newJobInputType={this.props.newJobInputType}
                  editNamesState={this.props.editNamesState}/>
              </Paper>
           </Grid>
           <Grid item xs>
           <Paper className={classes.paper}>
            <SearchModule
              searchResultJobTitle={this.props.searchResultJobTitle}
              searchResultName={this.props.searchResultName}
              handleUserModalShow={this.props.handleUserModalShow}
              handleUserModalClose={this.props.handleUserModalClose}
              userModalVisible={this.props.userModalVisible}
              searchUserName={this.props.searchUserName}
              searchUserCountry={this.props.searchUserCountry}
              searchUserJob={this.props.searchUserJob}
              searchUserAge={this.props.searchUserAge}
              searchUserCompany={this.props.searchUserCompany}
              />
           </Paper>
           </Grid>
         </Grid>
       </div>
    );
  }
}

export default withStyles(styles)(ProfileInner);

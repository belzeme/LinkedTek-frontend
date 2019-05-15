import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddNewSchoolOrCompanyModule from '../../../Components/schoolsAndCompanies/addNewSchoolOrCompany.js';
import MySubscriptionsModule from '../../../Components/schoolsAndCompanies/mySubscriptionsSchools.js';
import SchoolsAndCompaniesListModule from '../../../Components/schoolsAndCompanies/mySubscriptionsCompanies.js';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SchoolAndCompaniesInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
          <Grid item xs>
            <AddNewSchoolOrCompanyModule
              newInputTypes={this.props.newInputTypes}
              newInputTypeSelected={this.props.newInputTypeSelected}
              handleNewInputTypeChanged={this.props.handleNewInputTypeChanged}
              handleNewInputNameChanged={this.props.handleNewInputNameChanged}
              handleNewInputDescriptionChanged={this.props.handleNewInputDescriptionChanged}
              countryList={this.props.countryList}
              selectedCountry={this.props.selectedCountry}
              handleSelectedCountryChange={this.props.handleSelectedCountryChange}
              handleNewInputValidate={this.props.handleNewInputValidate}
              handleSuccessModalClose={this.props.handleSuccessModalClose}
              isSuccessModalVisible={this.props.isSuccessModalVisible}
              isErrorModalVisible={this.props.isErrorModalVisible}
              handleErrorModalClose={this.props.handleErrorModalClose}
            />
          </Grid>
          <Grid item xs>
            <MySubscriptionsModule
              schoolList={this.props.schoolList}
              schoolDescription={this.props.schoolDescription}
              schoolSubscribed={this.props.schoolSubscribed}
              countryList={this.props.countryList}
              filteredCountrySchools={this.props.filteredCountrySchools}
              handleFilteredCountryChangeSchools={this.props.handleFilteredCountryChangeSchools}
              handleEditSchoolModalClose={this.props.handleEditSchoolModalClose}
              isEditSchoolModalVisible={this.props.isEditSchoolModalVisible}
              handleEditSchoolModalShow={this.props.handleEditSchoolModalShow}
            />
          </Grid>
          <Grid item xs>
            <SchoolsAndCompaniesListModule
              companyDescription={this.props.companyDescription}
              companyList={this.props.companyList}
              companySubscribed={this.props.companySubscribed}
              countryList={this.props.countryList}
              filteredCountryCompanies={this.props.filteredCountryCompanies}
              handleFilteredCountryChangeCompanies={this.props.handleFilteredCountryChangeCompanies}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SchoolAndCompaniesInner);

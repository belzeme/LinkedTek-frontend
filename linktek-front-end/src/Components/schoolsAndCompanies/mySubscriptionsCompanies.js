import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Dropdown from 'react-dropdown';
import ListSchool from './schoolList.js';

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

class MySubscriptionsCompanies extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} style={{marginTop: 20}}>
        <CardHeader
          title="Companies List"
        />
        <div style={{marginLeft: 30}}>
          <p>Filtered by country : </p>
          <Dropdown
            options={this.props.countryList}
            onChange={this.props.handleFilteredCountryChangeCompanies}
            value={this.props.filteredCountryCompanies}
            placeholder="Select any country"
            style={{width: 200}}/>
        </div>
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <ListSchool
            companyList={this.props.companyList}
            companySubscribed={this.props.companySubscribed}
            companyDescription={this.props.companyDescription}
            handleUserSchoolOrCompanySubscription={this.props.handleUserSchoolOrCompanySubscription}
            handleEditCompanyModalShow={this.props.handleEditCompanyModalShow}
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(MySubscriptionsCompanies);

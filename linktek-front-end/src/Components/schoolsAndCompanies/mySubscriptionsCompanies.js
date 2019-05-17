import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dropdown from 'react-dropdown';
import ListItemText from '@material-ui/core/ListItemText';

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

  handleCompanyIndex(index) {
    return this.props.companyList[index];
  }

  handleCompanyDescription(index) {
    return this.props.companyDescription[index];
  }

  isUserSubscribed(index) {
    let company = this.props.companyList[index];
    for (let i = 0; i < this.props.companyList.length; i++) {
        if (this.props.companySubscribed[i] === company) {
          return 'Unsubscribe';
        }
    }
    return 'Subscribe';
  }

  companySubscribed(index) {
    if (this.isUserSubscribed(index) === 'Subscribe') {
      return "primary"
    }
    else {
      return "secondary"
    }
  }

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
          <List dense className={classes.root}>
            {this.props.companyList.map((value, index) => (
              <ListItem key={index} style={{width: 480}} >
                <ListItemText primary={this.handleCompanyIndex(index)} secondary={this.handleCompanyDescription(index)} onClick={() => this.props.handleEditCompanyModalShow(index)}/>
                <Button variant="outlined" color={this.companySubscribed(index)} className={classes.button} style={{width: 120}} onClick={() => this.props.handleUserSchoolOrCompanySubscription(this.props.companyList[index], 'company')}>
                  {this.isUserSubscribed(index)}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(MySubscriptionsCompanies);

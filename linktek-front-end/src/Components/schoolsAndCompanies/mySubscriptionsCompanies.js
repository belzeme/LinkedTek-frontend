import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dropdown from 'react-dropdown';

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
    return this.props.companySubscribed[index];
  }

  companySubscribed(index) {
    if (this.isUserSubscribed(index)) {
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
              <ListItem key={value} style={{width: 480}}>
                <ListItem button>
                  <div style={{marginRight: 40}}>
                    <p style={{fontSize: 15}}>
                      {this.handleCompanyIndex(index)}
                    </p>
                    <p style={{fontSize: 15}}>
                      {this.handleCompanyDescription(index)}
                    </p>
                    </div>
                  </ListItem>
                  <ListItem style={{width: 150}}>
                    <Button variant="outlined" color={this.companySubscribed(index)} className={classes.button} style={{width: 120}}>
                      {this.isUserSubscribed(index) ? 'Unsubscribe' : 'Subscribe'}
                    </Button>
                </ListItem>
              </ListItem>
            ))}
          </List>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(MySubscriptionsCompanies);

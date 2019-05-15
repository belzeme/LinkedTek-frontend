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

class MySubscriptionsSchools extends React.Component {

  handleSchoolIndex(index) {
    return this.props.schoolList[index];
  }

  handleSchoolDescription(index) {
    return this.props.schoolDescription[index];
  }

  isUserSubscribed(index) {
    return this.props.schoolSubscribed[index];
  }

  schoolSubscribed(index) {
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
          title="Schools List"
        />
        <div style={{marginLeft: 30}}>
          <p>Filtered by country : </p>
          <Dropdown
            options={this.props.countryList}
            onChange={this.props.handleFilteredCountryChangeSchools}
            value={this.props.filteredCountrySchools}
            placeholder="Select any country"
            style={{width: 200}}/>
        </div>
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <List dense className={classes.root}>
            {this.props.schoolList.map((value, index) => (
              <ListItem key={value} style={{width: 495}}>
                <ListItem button onClick={() => this.props.handleEditSchoolModalShow(index)}>
                  <div style={{marginRight: 40}}>
                    <p style={{fontSize: 15}}>
                      {this.handleSchoolIndex(index)}
                    </p>
                    <p style={{fontSize: 15}}>
                      {this.handleSchoolDescription(index)}
                    </p>
                  </div>
                </ListItem>
                <ListItem style={{width: 150}}>
                  <Button variant="outlined" color={this.schoolSubscribed(index)} className={classes.button} style={{width: 120}}>
                    {this.isUserSubscribed(index, classes) ? 'Unsubscribe' : 'Subscribe'}
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

export default withStyles(styles)(MySubscriptionsSchools);

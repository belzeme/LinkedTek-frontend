import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

class SchoolList extends React.Component {

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
    );
  }
}

export default withStyles(styles)(SchoolList);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import WorkPicture from '../Images/work.png';
import SchoolPicture from '../Images/school.png';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class TimelineList extends React.Component {
  constructor() {
    super();
  }

  test(value) {
    return SchoolPicture;
    console.log("VALUE OF nameState at : " + value + this.props.namesState[value]);
  }

  render() {
    const { classes } = this.props;

    return (
      <List dense className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        {this.props.companies.map((value, index) => (
          <ListItem key={value} button>
            <ListItemAvatar >
              <Avatar
                src={this.props.namesState[index] == 'School' ? SchoolPicture : WorkPicture}
              />
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <ListItemText primary={this.props.names[index]} secondary={"01.01.1900 - 01.01.1901"} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TimelineList);

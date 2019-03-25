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


  render() {
    const { classes } = this.props;

    function getAvatarImage(value) {
      if (value === 'School') {
        return SchoolPicture;
      }
      else if (value === 'Company'){
        return WorkPicture;
      }
    }

    function formatThatLine(value) {
        return value + " 01.01.1900 - 01.01.1901";
    }

    function makeArray() {
      var N = 20;
       return Array.apply(null, {length: N}).map(Number.call, Number)
    }

    return (
      <List dense className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        {makeArray().map(value => (
          <ListItem key={value} button style={{display: this.props.namesState[value] ? 'block ' : 'none' }} >
            <ListItemAvatar >
              <Avatar
                src={getAvatarImage(this.props.namesState[value])}
              />
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <ListItemText primary={this.props.names[value]} secondary={"01.01.1900 - 01.01.1901"} style={{display: this.props.names[value] ? 'block ' : 'none' }} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TimelineList);

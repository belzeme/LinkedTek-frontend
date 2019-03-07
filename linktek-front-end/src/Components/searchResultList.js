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
import Picture1 from '../Images/profilePicture1.png';
import Picture2 from '../Images/profilePicture2.png';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SearchResultList extends React.Component {
  constructor() {
    super();

  }

  render() {
    const { classes } = this.props;

    function makeArray() {
      var N = 20;
       return Array.apply(null, {length: N}).map(Number.call, Number)
    }

    function getAvatar(value) {
      if (value === 0) {
        return Picture1;
      }
      else if (value === 1) {
        return Picture2;
      }
    }

    return (
      <List dense className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        {makeArray().map(value => (
          <ListItem key={value} button style={{display: this.props.result[value] ? 'block ' : 'none' }} >
            <ListItemAvatar >
              <Avatar
                src={getAvatar(value)}
              />
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <ListItemText primary={this.props.result[value]} style={{display: this.props.result[value] ? 'block ' : 'none' }} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(SearchResultList);

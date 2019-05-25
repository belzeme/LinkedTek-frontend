import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SearchUserList extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{maxHeight: 400, overflow: 'auto'}}>
        <List dense className={classes.root} >
          {this.props.searchUserList.map((value, index) => (
            <ListItem key={index} button onClick={() => this.props.handleSearchUserModalShow(this.props.searchUserList[index], this.props.searchUserEmail[index])}>
              <ListItemText primary={this.props.searchUserList[index]} secondary={this.props.searchUserEmail[index]} style={{height: 50}}/>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(SearchUserList);

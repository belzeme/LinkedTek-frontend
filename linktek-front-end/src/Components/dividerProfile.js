import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

function formatCompany(value) {
  return value + " Company";
}

function formatAge(value) {
  return value + " Years old";
}

function DividerProfile(props) {
  const { classes } = props;
  return (
    <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
      <ListItem>
        <ListItemText primary={props.job}/>
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText primary={formatCompany(props.company)}/>
      </ListItem>
      <ListItem>
        <ListItemText primary={props.country}/>
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={formatAge(props.age)}/>
      </ListItem>
    </List>
  );
}

export default withStyles(styles)(DividerProfile);

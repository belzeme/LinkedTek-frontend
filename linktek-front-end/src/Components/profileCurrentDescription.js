import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function handleCompanyName(name) {
  return name + " Company";
}

function handleUserAge(age) {
  return age + " Years old";
}

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div style={{marginLeft: "auto", marginRight: "auto"}}>
      <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        <ListItem>
          <ListItemText primary={props.job}/>
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary={handleCompanyName(props.company)}/>
        </ListItem>
        <ListItem>
          <ListItemText primary={props.state}/>
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemText primary={handleUserAge(props.age)}/>
        </ListItem>
      </List>
      <Button style={{backgroundColor: '#3f51b5', width: "100%", color: "white" }}>
        Edit profile
      </Button>
    </div>
  );
}

export default withStyles(styles)(PaperSheet);

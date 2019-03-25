import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Picture1 from '../Images/profilePicture1.png';
import Picture2 from '../Images/profilePicture2.png';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Profile from './searchProfileModuleDetails';

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function SearchProfileDetails(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
    <div>

      <ListItem button key={props.value} style={{display: props.result[props.value] ? 'block ' : 'none' }} onClick={handleClickOpen}>
        <ListItemAvatar>
          <Avatar
            src={getAvatar(props.value)}
          />
        </ListItemAvatar>
        <ListItemSecondaryAction>
          <ListItemText primary={props.result[props.value]} style={{display: props.result[props.value] ? 'block ' : 'none' }} />
        </ListItemSecondaryAction>
      </ListItem>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Jean Valjean Profile
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Profile
          age={33}
          userName={"Jean Valjean"}
          company={"Les Tenardiers"}
          job={"Bagnard"}
          country={"France"}/>
      </Dialog>

    </div>
  );
}

export default SearchProfileDetails;

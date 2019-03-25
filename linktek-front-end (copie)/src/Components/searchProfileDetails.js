import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Picture1 from '../Images/profilePicture1.png';
import Picture2 from '../Images/profilePicture2.png';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Profile from './searchProfileModuleDetails.js';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

function SearchProfileDetails(props) {
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Profile
            age={33}
            userName={"Jean Valjean"}
            company={"Les Tenardiers"}
            job={"Bagnard"}
            country={"France"}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchProfileDetails;

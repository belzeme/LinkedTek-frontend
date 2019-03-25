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
import FormEditProfile from './FormEditProfile.js';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

function EditProfile(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button style={{backgroundColor: '#3f51b5', width: "100%", color: "white", marginTop: -20}} onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <FormEditProfile
            age={33}
            userName={"Jean Valjean"}
            company={"Les Tenardiers"}
            job={"Bagnard"}
            country={"France"}
            companies={props.companies}
            Company={props.company} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProfile;

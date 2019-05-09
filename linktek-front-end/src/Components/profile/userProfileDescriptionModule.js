import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import UserProfilePicture from '../../Images/profilePicture.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-awesome-modal';
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


class UserProfileDescriptionModule extends React.Component {
  state = {
  };

  handleCompanyName(name) {
    return name + " Company";
  }

  handleUserAge(age) {
    return age + " Years old";
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card} style={{marginTop: 20}}>
        <CardHeader
          title="Profile"
        />
        <CardMedia
          className={classes.media}
          image={ UserProfilePicture }
          style={{marginBottom: 10}}
        />
        <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
          <ListItem>
            <ListItemText primary={this.props.userJob}/>
          </ListItem>
          <Divider />
          <ListItem divider>
            <ListItemText primary={this.handleCompanyName(this.props.userCompany)}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={this.props.userState}/>
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText primary={this.handleUserAge(this.props.userAge)}/>
          </ListItem>
        </List>
        <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 11, marginBottom: 10 }} onClick={() => this.props.handleDeleteRelationShow()}>
          Remove from relations
        </Button>
        <Modal visible={this.props.deleteRelationModalVisible} width="400" height="210" effect="fadeInUp" onClickAway={() => this.props.handleDeleteRelationClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{'Delete ' + this.props.userName }</h2>
            <h3 style={{marginLeft: 20}}>This action cannot be undonne.</h3>
            <h3 style={{marginLeft: 20, marginTop: -10, marginBottom: 30}}>Continue anyway ?</h3>
            <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
              <Grid item xs>
                <Button style={{backgroundColor: '#3f51b5', width: "90%", color: "white", marginLeft: 11, marginBottom: 10 }} onClick={() => this.props.handleDeleteRelationClose()}>
                  YES
                </Button>
              </Grid>
              <Grid item xs>
                <Button style={{backgroundColor: '#3f51b5', width: "90%", color: "white", marginBottom: 10, marginLeft: -15 }} onClick={() => this.props.handleDeleteRelationClose()}>
                  NO
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(UserProfileDescriptionModule);

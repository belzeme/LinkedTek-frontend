import React from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatarImage from '../../Images/profilePicture2.png';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import UserPicture from '../../Images/profilePicture2.png';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class DisplayRelationsModule extends React.Component {

  formatRelationJobModalTitle() {
    return "Job : " + this.props.relationSelectedJob;
  }

  formatRelationCompanyModalTitle() {
    return "Company : " + this.props.relationSelectedCompany;
  }

  formatRelationAgeModalTitle() {
    return "Age : " + this.props.relationSelectedAge;
  }

  formatRelationStateModalTitle() {
    return "State : " + this.props.relationSelectstate;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Your Relationships"
        />
        <div style={{maxHeight: 400, overflow: 'auto'}}>
          <List dense className={classes.root}>
            {this.props.userRelations.map((value, index) => (
              <ListItem key={value} button onClick={() => this.props.handleRelationModalShow(this.props.userRelationMails[index])}>
              <ListItemAvatar style={{marginRight: 30}}>
                <Avatar
                  src={UserAvatarImage}
                />
              </ListItemAvatar>
              <ListItemAvatar >
                <ListItemText primary={this.props.userRelations[index]} secondary={this.props.userRelationMails[index]} style={{height: 50}}/>
              </ListItemAvatar>
              </ListItem>
            ))}
          </List>
        </div>
        <Modal visible={this.props.relationSelectedModalVisible} width="400" height="600" effect="fadeInUp" onClickAway={() => this.props.handleRelationModalClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{this.props.relationSelectedName}</h2>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={ UserPicture }
              />
            </Card>
            <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto", marginTop: 20}}>
              <ListItem>
                <ListItemText primary={this.formatRelationJobModalTitle()}/>
              </ListItem>
              <Divider />
              <ListItem divider>
                <ListItemText primary={this.formatRelationCompanyModalTitle()}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={this.formatRelationStateModalTitle()}/>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary={this.formatRelationAgeModalTitle()}/>
              </ListItem>
            </List>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={this.props.handleRelationModalCloseValidated}>
                Remove relation
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(DisplayRelationsModule);

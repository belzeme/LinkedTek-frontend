import React from 'react';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatarImage from '../../Images/profilePicture2.png';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import UserPicture from '../../Images/profilePicture2.png';

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

class RelationSuggestionsModule extends React.Component {


  handleRelationSuggestionName(index) {
    let tmp = Object.values(this.props.relationSuggestion[index]);
    return tmp[0].name;
  }

  handleRelationSuggestionMail(index) {
    let tmp = Object.values(this.props.relationSuggestion[index]);
    return tmp[0].mail;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Relation Suggestions"
        />
        <div style={{maxHeight: 400, overflow: 'auto'}}>
         <List dense className={classes.root}>
          {this.props.relationSuggestion.map((value, index) => (
            <ListItem key={index} button onClick={() => this.props.handleSelectedSuggestionModalShow(index)} style={{width: 480}}>
              <ListItemAvatar style={{marginRight: 30}}>
                <Avatar
                  src={UserAvatarImage}
                />
              </ListItemAvatar>
              <ListItemText primary={this.handleRelationSuggestionName(index)} secondary={this.handleRelationSuggestionMail(index)} style={{height: 50}}/>
            </ListItem>
          ))}
        </List>
      </div>
      <Modal visible={this.props.realtionSuggestionModalVisible} width="400" height="390" effect="fadeInUp" onClickAway={() => this.props.handleSelectedSuggestionModalClose()}>
        <div>
          <h2 style={{display: 'flex', justifyContent: 'center'}}>{this.props.relationSuggestionSelectedName}</h2>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={ UserPicture }
            />
          </Card>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
            <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={this.props.handleSelectedSuggestionModalCloseValidated}>
              Add as relation
            </Button>
          </div>
        </div>
      </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(RelationSuggestionsModule);

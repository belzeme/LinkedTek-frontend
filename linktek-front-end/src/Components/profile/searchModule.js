import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from 'react-awesome-modal';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import UserPicture from '../../Images/profilePicture1.png';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
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
  avatar: {
    backgroundColor: red[500],
  },
});

class SearchModule extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleJobTitle(job, company) {
    return job + ' for ' + company + ' company';
  };

  handleJobStartTime = (date) => {
    return 'Since: ' + date;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="View User Page"
        />
        <CardActions className={classes.actions}>
          <div style={{width: "95%"}}>
            <TextField
              id="standard-with-placeholder"
              label="Search user"
              placeholder={'Enter name here ...'}
              className={classes.textField}
              margin="normal"
              style={{marginLeft: 10, width: "95%"}}
            />
            <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white", marginLeft: 10, marginTop: 10}} onClick={this.handleExpandClick}>
              Validate
            </Button>
          </div>
        </CardActions>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardHeader
              title="Search Results"
            />
            <List dense className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
              {this.props.searchResultName.map((value, index) => (
                <ListItem key={value} button>
                  <ListItemText primary={this.props.searchResultName[index]} secondary={this.props.searchResultJobTitle[index]} style={{height: 50}} onClick={() => this.props.handleUserModalShow()}/>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
        <Modal visible={this.props.userModalVisible} width="400" height="550" effect="fadeInUp" onClickAway={() => this.props.handleUserModalClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{this.props.searchUserName + ' Profile'}</h2>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={ UserPicture }
              />
            </Card>
            <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
              <ListItem>
                <ListItemText primary={this.props.searchUserJob}/>
              </ListItem>
              <Divider />
              <ListItem divider>
                <ListItemText primary={this.props.searchUserCompany}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={this.props.searchUserCountry}/>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary={this.props.searchUserAge}/>
              </ListItem>
            </List>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={this.props.handleUserModalClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(SearchModule);

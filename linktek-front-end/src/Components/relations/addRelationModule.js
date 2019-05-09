import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-awesome-modal';
import CardMedia from '@material-ui/core/CardMedia';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import SearchUserList from './searchUserList.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UserPicture from '../../Images/profilePicture2.png';

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

class AddRelationModule extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  formatSeachJobModalTitle() {
    return "Job : " + this.props.searchUserSelectedJob;
  }

  formatSeachCompanyModalTitle() {
    return "Company : " + this.props.searchUserSelectedCompany;
  }

  formatSeachAgeModalTitle() {
    return "Age : " + this.props.searchUserSelectedAge;
  }

  formatSeachStateModalTitle() {
    return "State : " + this.props.searchUserSelectstate;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Add New Relation"
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
              Search
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
            <SearchUserList
              searchResult={this.props.searchResult}
              handleSearchUserModalShow={this.props.handleSearchUserModalShow}
            />
          </CardContent>
        </Collapse>
        <Modal visible={this.props.searchUserModalVisible} width="400" height="600" effect="fadeInUp" onClickAway={() => this.props.handleSearchUserModalClose()}>
          <div>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>{this.props.searchUserSelectedName}</h2>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={ UserPicture }
              />
            </Card>
            <List component="nav" className={classes.root} style={{marginLeft: "auto", marginRight: "auto", marginTop: 20}}>
              <ListItem>
                <ListItemText primary={this.formatSeachJobModalTitle()}/>
              </ListItem>
              <Divider />
              <ListItem divider>
                <ListItemText primary={this.formatSeachCompanyModalTitle()}/>
              </ListItem>
              <ListItem>
                <ListItemText primary={this.formatSeachStateModalTitle()}/>
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary={this.formatSeachAgeModalTitle()}/>
              </ListItem>
            </List>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <Button style={{backgroundColor: '#3f51b5', width: "95%", color: "white" }} onClick={this.props.handleSearchUserModalClose}>
                Add as relation
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    );
  }
}

export default withStyles(styles)(AddRelationModule);
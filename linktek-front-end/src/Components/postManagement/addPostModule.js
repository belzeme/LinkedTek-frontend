import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Dropdown from 'react-dropdown';
import UserProfile from '../../Activities/Profile/UserProfile.js';
import ReactDOM from 'react-dom';

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

class AddPostModule extends React.Component {

  handleUserProfile() {
    var words = this.props.selectedContact.label.split(' : ');
    ReactDOM.render(<UserProfile searchUserName={words[0]} searchUserMail={words[1]} userEmail={this.props.userEmail}/>, document.getElementById('root'));
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title="Add New Post"
        />
        <div style={{maxHeight: 600, overflow: 'auto', marginTop: 20}}>
          <CardActions>
            <div style={{width: "99%", marginTop: -5}}>
              <TextField
                id="standard-with-placeholder"
                label="Post Title"
                className={classes.textField}
                margin="normal"
                onChange={this.props.handleNewPostTitleChanged('title')}
                style={{marginLeft: 10, width: "99%"}}
              />
            </div>
          </CardActions>
          <CardActions>
            <div style={{width: "100%", marginTop: -20}}>
              <TextField
                id="standard-with-placeholder"
                label="Post Content"
                className={classes.textField}
                margin="normal"
                onChange={this.props.handleNewPostContentChanged('title')}
                multiline={true}
                rows={1}
                rowsMax={7}
                style={{marginLeft: 10, width: "99%"}}
              />
            </div>
          </CardActions>
          <CardActions>
            <div style={{width: "100%"}}>
              <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 10}} onClick={() => this.props.handleNewPost()}>
                Post
              </Button>
            </div>
          </CardActions>
          <p style={{color: 'grey'}}>________________________________________________________________</p>
          <CardActions style={{marginTop: 20}}>
            <CardHeader
              title="Relations Posts"
            />
          </CardActions>
          <CardActions>
                <p style={{marginLeft: 20, marginRight: 10, marginTop: 1}}> Select Relation : </p>
                <Dropdown
                  options={this.props.contact}
                  onChange={this.props.handleSelectedContactChange}
                  value={this.props.selectedContact}
                  placeholder="..........."
                  style={{width: 50}}
                />
          </CardActions>
          <CardActions>
            <div style={{width: "100%"}}>
              <Button style={{backgroundColor: '#3f51b5', width: "97%", color: "white", marginLeft: 10, marginTop: 20, marginBottom: 28}} onClick={() => this.handleUserProfile()}>
                View Posts
              </Button>
            </div>
          </CardActions>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(AddPostModule);

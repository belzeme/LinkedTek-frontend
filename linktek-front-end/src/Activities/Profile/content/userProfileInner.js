import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserProfileDescriptionModule from '../../../Components/profile/userProfileDescriptionModule.js';
import UserPostsModule from '../../../Components/profile/userPostsModule.js';
import UserCommentsModule from '../../../Components/profile/userCommentsModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class UserProfileInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
         <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
           <Grid item xs>
             <Paper className={classes.paper}>
               <UserProfileDescriptionModule
                  userAge={this.props.userAge}
                  userState={this.props.userState}
                  userCompany={this.props.userCompany}
                  userJob={this.props.userJob}
                  handleDeleteRelationClose={this.props.handleDeleteRelationClose}
                  handleDeleteRelationShow={this.props.handleDeleteRelationShow}
                  deleteRelationModalVisible={this.props.deleteRelationModalVisible}
                  userName={this.props.userName}
              />
             </Paper>
           </Grid>
           <Grid item xs>
             <Paper className={classes.paper}>
                <UserPostsModule
                  userName={this.props.userName}
                  userPosts={this.props.userPosts}
                />
              </Paper>
           </Grid>
           <Grid item xs>
           <Paper className={classes.paper}>
            <UserCommentsModule
              userName={this.props.userName}
              userComments={this.props.userComments}
            />
           </Paper>
           </Grid>
         </Grid>
       </div>
    );
  }
}

export default withStyles(styles)(UserProfileInner);

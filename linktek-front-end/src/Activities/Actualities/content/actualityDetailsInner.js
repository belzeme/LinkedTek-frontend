import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostModule from '../../../Components/Actualities/postModule.js';
import CommentsModule from '../../../Components/Actualities/commentsModule.js';
import AddCommentModule from '../../../Components/Actualities/addCommentModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class ActualityDetailsInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{marginTop: 30}}>
         <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
           <Grid item xs>
            <PostModule
              postTitle={this.props.postTitle}
              from={this.props.from}
              date={this.props.date}
              content={this.props.content}
            />
           </Grid>
           <Grid item xs>
            <CommentsModule
              comments={this.props.comments}
              commentsDate={this.props.commentsDate}
              commentsFrom={this.props.commentsFrom}
            />
           </Grid>
           <Grid item xs>
            <AddCommentModule
              newComment={this.props.newComment}
              handleCommentChange={this.props.handleCommentChange}
            />
           </Grid>
         </Grid>
       </div>
    );
  }
}

export default withStyles(styles)(ActualityDetailsInner);

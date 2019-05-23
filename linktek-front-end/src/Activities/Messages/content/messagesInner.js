import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InboxModule from '../../../Components/messages/inboxModule.js';
import OutboxModule from '../../../Components/messages/outboxModule.js';
import WriteNewMessageModule from '../../../Components/messages/writeNewMessageModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class MessagesInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{marginTop: 30}}>
         <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
           <Grid item xs>
            <InboxModule
              messages={this.props.messages}
              modalDeleteMessageVisible={this.props.modalDeleteMessageVisible}
              modalReplyMessageVisible={this.props.modalReplyMessageVisible}
              handleDeleteMessageModalShow={this.props.handleDeleteMessageModalShow}
              handleDeleteMessageModalClose={this.props.handleDeleteMessageModalClose}
              handleReplyMessageModalShow={this.props.handleReplyMessageModalShow}
              handleReplyMessageModalClose={this.props.handleReplyMessageModalClose}
              messageSender={this.props.messageSender}
              handleReplyMessageContentChange={this.props.handleReplyMessageContentChange}
            />
           </Grid>
           <Grid item xs>
             <OutboxModule
               messages={this.props.messages}
               modalDeleteMessageVisible={this.props.modalDeleteMessageVisible}
               modalReplyMessageVisible={this.props.modalReplyMessageVisible}
               handleDeleteMessageModalShow={this.props.handleDeleteMessageModalShow}
               handleDeleteMessageModalClose={this.props.handleDeleteMessageModalClose}
               handleReplyMessageModalShow={this.props.handleReplyMessageModalShow}
               handleReplyMessageModalClose={this.props.handleReplyMessageModalClose}
               messageSender={this.props.messageSender}
               handleReplyMessageContentChange={this.props.handleReplyMessageContentChange}
               outbox={this.props.outbox}
             />
          </Grid>
           <Grid item xs>
            <WriteNewMessageModule
              sendTo={this.props.sendTo}
              contact={this.props.contact}
              selectedContact={this.props.selectedContact}
              handleSelectedContactChange={this.props.handleSelectedContactChange}
              handleNewMessageTitleChange={this.props.handleNewMessageTitleChange}
              handleNewMessageContentChange={this.props.handleNewMessageContentChange}
              sendNewMessage={this.props.sendNewMessage}
            />
           </Grid>
         </Grid>
       </div>
    );
  }
}

export default withStyles(styles)(MessagesInner);

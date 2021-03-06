import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddRelationModule from '../../../Components/relations/addRelationModule.js';
import DisplayRelationsModule from '../../../Components/relations/displayRelationsModule.js';
import RelationSuggestionsModule from '../../../Components/relations/relationSuggestionsModule.js';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

// RelationInner class
/** Handle the grid of relations page */
class RelationInner extends React.Component {
  state = {
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{marginTop: 30}}>
         <Grid container spacing={24} style={{marginLeft: "auto", marginRight: "auto"}}>
           <Grid item xs>
            <AddRelationModule
              searchResult={this.props.searchResult}
              searchUserSelectedName={this.props.searchUserSelectedName}
              searchUserSelectedCompany={this.props.searchUserSelectedCompany}
              searchUserSelectedJob={this.props.searchUserSelectedJob}
              searchUserSelectedAge={this.props.searchUserSelectedAge}
              handleSearchUserModalShow={this.props.handleSearchUserModalShow}
              handleSearchUserModalClose={this.props.handleSearchUserModalClose}
              searchUserModalVisible={this.props.searchUserModalVisible}
              searchUserSelectstate={this.props.searchUserSelectstate}
              handleSearchUserModalCloseValidated={this.props.handleSearchUserModalCloseValidated}
              handleSearchUserSelectedName={this.props.handleSearchUserSelectedName}
            />
           </Grid>
           <Grid item xs>
            <DisplayRelationsModule
              userRelations={this.props.userRelations}
              relationSelectedName={this.props.relationSelectedName}
              relationSelectedCompany={this.props.relationSelectedCompany}
              relationSelectedJob={this.props.relationSelectedJob}
              relationSelectedAge={this.props.relationSelectedAge}
              handleRelationModalShow={this.props.handleRelationModalShow}
              handleRelationModalClose={this.props.handleRelationModalClose}
              relationSelectedModalVisible={this.props.relationSelectedModalVisible}
              searchUserSelectstate={this.props.relationSelectstate}
              userRelationMails={this.props.userRelationMails}
              handleRemoveRelation={this.handleRemoveRelation}
              handleRelationEmailChange={this.props.handleRelationEmailChange}
              handleRelationModalCloseValidated={this.props.handleRelationModalCloseValidated}
              relationEmail={this.props.relationEmail}
            />
           </Grid>
           <Grid item xs>
            <RelationSuggestionsModule
              relationSuggestion={this.props.relationSuggestion}
              relationSuggestionSelectedName={this.props.relationSuggestionSelectedName}
              relationSuggestionSelectedCompany={this.props.relationSuggestionSelectedCompany}
              relationSuggestionSelectedJob={this.props.relationSuggestionSelectedJob}
              relationSuggestionSelectedAge={this.props.relationSuggestionSelectedAge}
              handleSelectedSuggestionModalShow={this.props.handleSelectedSuggestionModalShow}
              handleSelectedSuggestionModalClose={this.props.handleSelectedSuggestionModalClose}
              realtionSuggestionModalVisible={this.props.realtionSuggestionModalVisible}
              relationSuggestionSelectstate={this.props.relationSuggestionSelectstate}
              handleSelectedSuggestionModalCloseValidated={this.props.handleSelectedSuggestionModalCloseValidated}
            />
           </Grid>
         </Grid>
       </div>
    );
  }
}

export default withStyles(styles)(RelationInner);

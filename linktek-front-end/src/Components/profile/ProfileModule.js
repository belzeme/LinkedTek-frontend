import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilePicture from '../../Images/profilePicture.jpg';
import Paper from './profileCurrentDescription.js';

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

class ProfileModule extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={ ProfilePicture }
        />
        <CardContent>
          <Typography component="h4" variant="h6">
            {this.props.userName}
          </Typography>
        </CardContent>
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
            <Paper
              userName={this.props.userName}
              companies={this.props.companies}
              job={this.props.job}
              company={this.props.company}
              state={this.props.country}
              age={this.props.age}
              handleProfileModalClose={this.props.handleProfileModalClose}
              handleProfileModalShow={this.props.handleProfileModalShow}
              profileModalVisible={this.props.profileModalVisible}
              handleUserNameChange={this.props.handleUserNameChange}
              handleCountryChange={this.props.handleCountryChange}
              handleCompanyChange={this.props.handleCompanyChange}
              handleJobChange={this.props.handleJobChange}
              handleAgeChange={this.props.handleAgeChange}
              handleProfilePictureChange={this.props.handleProfilePictureChange}
              countries={this.props.countries}
              selectedCountry={this.props.selectedCountry}
              handleSelectedCountryChange={this.props.handleSelectedCountryChange}
              updateCountry={this.props.updateCountry}
              handleProfileModalCloseValidated={this.props.handleProfileModalCloseValidated}
              selectedComp={this.props.selectedComp}
              handleSelectedCompChange={this.props.handleSelectedCompChange}
              country={this.props.country}
            />
          </CardContent>
          <CardContent>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(ProfileModule);

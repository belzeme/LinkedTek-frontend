import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfilePicture from '../Images/profilePicture.jpg';
import SearchResult from './searchResultList.js';
import InputBase from '@material-ui/core/InputBase';

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
    this.setState(state => ({ expanded: true }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent style={{display: 'flex', justifyContent: 'center'}}>
          <CardHeader
            title="Search User"
          />
        </CardContent>
        <CardContent style={{marginTop: -30}}>
          <div className={classes.search} style={{backgroundColor: "#eeeeee", margin: 10, padding: 10}}>
            <InputBase
              placeholder="Enter user name ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button style={{backgroundColor: '#3f51b5', width: "100%", color: "white"}}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}>
            Search User
          </Button>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <SearchResult
              result={this.props.result}
              resultPicture={this.props.resultPicture}/>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(SearchModule);

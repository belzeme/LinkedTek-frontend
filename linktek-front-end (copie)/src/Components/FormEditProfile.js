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
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SelectCompany from './selectCompany.js';
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

class FormEditProfile extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: true }));
  };

  setThatCompany = (value) => {
    this.setState({company: this.props.companies[value]});
    console.log("VaLUE : " + this.props.company);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent style={{display: 'flex', justifyContent: 'center'}}>
          <CardHeader
            title="Edit Profile"
          />
        </CardContent>
        <CardContent>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Job</InputLabel>
              <Input id="job" name="job" autoFocus placeholder="Front-End Developer"/>
            </FormControl>

            <SelectCompany
              companies={this.props.companies}
              company={this.props.company}
              setThatCompany={this.setThatCompany}/>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Age</InputLabel>
              <Input name="Age" type="text" id="age" placeholder="22"/>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit Profile
            </Button>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(FormEditProfile);

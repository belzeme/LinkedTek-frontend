import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from './papers.js'

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

class TimelineModule extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleJobTitle(job, company) {
    return job + ' for ' + company + ' company';
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title="TimeLine"
        />

        <CardActions className={classes.actions}>
          <Paper
            title='Current Job'
            description={this.handleJobTitle(this.props.job, this.props.company)}/>
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
            <p>
              <Typography component="h4" variant="h7"> Job : {this.props.job} </Typography>
            </p>
            <p>
              <Typography component="h4" variant="h7"> Company : {this.props.company} </Typography>
            </p>
            <p>
              <Typography component="h4" variant="h7"> Country : {this.props.country} </Typography>
            </p>
            <p>
              <Typography component="h4" variant="h7"> Age : {this.props.age}</Typography>
            </p>
          </CardContent>
          <CardContent>
            <Button>Edit TimeLine</Button>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(TimelineModule);

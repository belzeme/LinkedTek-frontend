import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkPicture from '../../Images/work.png';
import SchoolPicture from '../../Images/school.png';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class TimelineList extends React.Component {

  handleJobDate(index) {
    return this.props.jobList[index].start + ' - ' + this.props.jobList[index].stop;
  }

  render() {
    const { classes } = this.props;

    return (
      <List dense className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        {this.props.jobList.map((value, index) => (
          <ListItem key={index} button onClick={() => this.props.handleJobEditModalShow()}>
            <ListItemAvatar >
              <Avatar
                src={this.props.jobList[index].type === 'School' ? SchoolPicture : WorkPicture}
              />
            </ListItemAvatar>
            <ListItemText primary={this.props.jobList[index].name} secondary={this.handleJobDate(index)} />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(TimelineList);

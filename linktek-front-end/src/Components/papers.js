import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div style={{marginLeft: "auto", marginRight: "auto"}}>
      <Typography variant="h6" component="h6">
        {props.title}
      </Typography>
      <Typography component="p">
        {props.description}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(PaperSheet);

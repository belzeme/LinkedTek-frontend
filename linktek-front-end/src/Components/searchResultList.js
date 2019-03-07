import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import SearchProfileDetails from './searchProfileDetails.js'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SearchResultList extends React.Component {
  constructor() {
    super();

  }

  render() {
    const { classes } = this.props;

    function makeArray() {
      var N = 20;
       return Array.apply(null, {length: N}).map(Number.call, Number)
    }

    return (
      <List dense className={classes.root} style={{marginLeft: "auto", marginRight: "auto"}}>
        {makeArray().map(value => (
          <SearchProfileDetails
            value={value}
            result={this.props.result}
          />
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(SearchResultList);

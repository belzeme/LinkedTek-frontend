import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 120,
  },
}));

function SelectCompany(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setAge(event.target.value);
    props.setThatCompany(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function makeArray() {
    var N = 20;
     return Array.apply(null, {length: N}).map(Number.call, Number)
  }

  return (
    <form autoComplete="off">
    <FormControl className={classes.formControl}>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
          }}
        >
        {makeArray().map(value => (
            <MenuItem value={value} style={{display: props.companies[value] ? 'block ' : 'none' }} >
              {props.companies[value]}
            </MenuItem>
        ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default SelectCompany;

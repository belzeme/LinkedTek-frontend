import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import School from '@material-ui/icons/School';
import PeopleIcon from '@material-ui/icons/People';
import UserIcon from '@material-ui/icons/Face';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Message from '@material-ui/icons/Chat';

import ReactDOM from 'react-dom';
import Actualities from '../Activities/actualities.js'
import Schools from '../Activities/schools.js'
import Profile from '../Activities/profile.js'
import Posts from '../Activities/posts.js'
import Relations from '../Activities/relations.js'
import Messages from '../Activities/messages.js'

export const mainListItems = (
  <div>
    <ListItem button onClick={() => {ReactDOM.render(<Actualities />, document.getElementById('root')); }}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Actuality feed" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Schools />, document.getElementById('root')); }}>
      <ListItemIcon>
        <School />
      </ListItemIcon>
      <ListItemText primary="Schools & Companies" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Profile />, document.getElementById('root')); }}>
      <ListItemIcon>
        <UserIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Posts />, document.getElementById('root')); }}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Posts management" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Relations />, document.getElementById('root')); }}>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Relations" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Messages />, document.getElementById('root')); }}>
      <ListItemIcon>
      <Message />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
  </div>
);

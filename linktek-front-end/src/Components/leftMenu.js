import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import School from '@material-ui/icons/School';
import PeopleIcon from '@material-ui/icons/People';
import UserIcon from '@material-ui/icons/Face';
import BarChartIcon from '@material-ui/icons/BarChart';
import Message from '@material-ui/icons/Chat';

import ReactDOM from 'react-dom';
import Actualities from '../Activities/Actualities/Actualities.js';
import SchoolAndCompanies from '../Activities/School/School.js';
import Profile from '../Activities/Profile/Profile.js';
import Post from '../Activities/Post/PostsManagement.js';
import Relations from '../Activities/Relations/Relations.js';
import Messages from '../Activities/Messages/Messages.js';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => {ReactDOM.render(<Actualities userEmail={localStorage.getItem('userEmail')}/>, document.getElementById('root')); }}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Actuality feed" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<SchoolAndCompanies userEmail={localStorage.getItem('userEmail')}/>, document.getElementById('root')); }}>
      <ListItemIcon>
        <School />
      </ListItemIcon>
      <ListItemText primary="Schools & Companies" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Profile userEmail={localStorage.getItem('userEmail')}/>, document.getElementById('root')); }}>
      <ListItemIcon>
        <UserIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Post userEmail={localStorage.getItem('userEmail')}/>, document.getElementById('root')); }}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Posts management" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Relations userEmail={localStorage.getItem('userEmail')}/>, document.getElementById('root')); }}>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Relations" />
    </ListItem>
    <ListItem button onClick={() => {ReactDOM.render(<Messages userEmail={localStorage.getItem('userEmail')}/>, document.getElementById('root')); }}>
      <ListItemIcon>
      <Message />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
  </div>
);

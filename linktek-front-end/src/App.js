import React, { Component } from 'react';
import './App.css';
import Login from './Activities/login.js';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      ReactDOM.render(<Login />, document.getElementById('root'))
    );
  }
}

export default App;

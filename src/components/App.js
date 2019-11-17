import React, { Component } from 'react';
import './App.css';
import Routes from '../routes';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;

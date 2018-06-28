import React, { Component } from 'react';
import {BrowserRouter as Router , Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './components/googlelogin';
import Home from './components/home';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">LetterSack</h1>
            </header>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
          </div>
        </Router>
    );
  }
}

export default App;

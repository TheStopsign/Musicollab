//client/components/App.js

import React, { Component } from 'react';
import '../css/App.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Profile from './Profile';
import Accounts from './Accounts';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/log-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/accounts" component={Accounts} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

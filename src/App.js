import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Profile from './components/Profile';
import Accounts from './components/Accounts';
import EditAccount from './components/EditAccount';
import EditDocument from './components/EditDocument';
import { ProtectedRoute } from './protectedRoute.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="row AppView">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <ProtectedRoute path="/home" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/accounts" component={Accounts} />
              <Route path='/accounts/:id' component={EditAccount} />
              <Route path='/documents/:id' component={EditDocument} />
            </Switch>
          </div>
          <footer className="row myfooter">
            Musicollab is a 2020 SD&D project
	        </footer>
        </div>
      </Router>
    );
  }
}

export default App;

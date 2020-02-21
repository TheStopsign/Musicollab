//client/components/App.js

import React, {Component} from 'react';
import '../css/App.css';
//import Login from "./login.js";
//import Signup from "./signup.js";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/submit" component={Submit} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

class Login extends Component {
  render() {
    return (
      <div>
        <div className="Name">
          <h1>Musicollab</h1>
        </div>
        <div className="form">
          <form>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <div className="form-inline">
              <div className="form-group">
                <div className="box">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <Link to="/sign-up" className="btn">Sign up</Link>
              </div>
            </div>
            <div className="SubmitButton">
              <Link to="/submit" className="btn btn-primary btn-block">Submit</Link>
            </div>
            <p className="forgot-password">
                Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

class SignUp extends Component {
  render() {
    return (
      <div>
        <div className="Name">
          <h1>Musicollab</h1>
        </div>
        <div className="form">
          <form>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First name</label>
              <input type="text" className="form-control" placeholder="First name" />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
              Already registered <a href="/">Login?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

class Submit extends Component {
  render() {
    return(
      <div>
        <div className="container">
          <div className="Name">
            <h1>Musicollab</h1>
          </div>
          <div className="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

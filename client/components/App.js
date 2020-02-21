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
                <Route path="/home" component={Home} />
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
              <Link to="/home" className="btn btn-primary btn-block">Submit</Link>
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

class Home extends Component {
  render() {
    return(
      <div class="App">

        <div class="container-fluid">

          <div class="row align-items-center head">
            <div class="col-3 title">
              <p>Musicollab</p>
            </div>

            <div class="col-6">
              <input type="text" id="search" name="search" placeholder="Search"/>
            </div>

            <div class="col-1">
              <img class="float-right pic" src="profile.jpg" alt="prfile picture"/>
            </div>

            <div class = "col-2 user">
              <ul>
                <li>Username</li>
                <li class="userID">User ID</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row">
            <div class="col-2 filters">
              <div class="row">
                <div class="col">
                  <h1> sort by: </h1>
                  <ul>
                    <li> Name </li>
                    <li> Owner </li>
                    <li> Last Modified </li>
                    <li> Size </li>
                    <li> Share Date </li>
                    <li> sort 6 </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h1> filters: </h1>
                  <ul>
                    <li> Owned by me </li>
                    <li> Shared with me </li>
                    <li> Starred </li>
                    <li> Archived </li>
                    <li> filter 5 </li>
                    <li> filter 6 </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-10 projects">
              <div class="create">

              </div>

            </div>
          </div>
        </div>


        <div class="container-fluid">

          <div class="row footer">
            <div class="col">
              Musicollab is a 2020 SD&D project
            </div>
          </div>
        </div>



      </div>


    );
  }
}
export default App;

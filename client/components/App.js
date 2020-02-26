//client/components/App.js

import React, {Component} from 'react';
import '../css/App.css';
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
                <Route path="/profile" component={Profile} />
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
      <div className="Login">

        <div class="container-fluid">

          <div className="row align-items-center head">
            <div className="col-3 title">
              <p>Musicollab</p>
            </div>
          </div>

          <div className="d-flex justify-content-center LoginBox">
            <div className="row rowLoginBox">
              <div className="col align-items-center colLoginBox">

                <div className="row justify-content-center">
                  <div className="col-xlg SignInTitle">
                    <h3>Sign In</h3>
                  </div>
                </div>

                <div className="row Email">
                  <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="row Password">
                  <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="row">
                  <div className="col-xlg checkbox">

                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                    </div>

                  </div>

                  <div className="col flex-grow"></div>

                  <div className="col-xlg SignupButton">
                    <Link to="/sign-up" className="btn btn-link btn-sm">Sign up</Link>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="SubmitButton">
                    <Link to="/home" className="btn btn-primary btn-block">Submit</Link>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row justify-content-center GoogleLogin">
                  <h3> Google </h3>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">

        <div class="container-fluid">

          <div className="row align-items-center head">
            <div className="col-3 title">
              <p>Musicollab</p>
            </div>
          </div>
          <div className="d-flex justify-content-center SignUpBox">
            <div className="row rowSignUpBox">
              <div className="col align-items-center colSignUpBox">

                <div className="row justify-content-center">
                  <div className="col-xlg SignUpTitle">
                    <h3>Sign Up</h3>
                  </div>
                </div>

                <div className="row FirstName">
                  <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="row LastName">
                  <input type="text" className="form-control" placeholder="Last name" />
                </div>
                
                <div className="row Email">
                  <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="row Password">
                  <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="row justify-content-center">
                  <div className="SubmitButton">
                    <Link to="/home" className="btn btn-primary btn-block">Submit</Link>
                  </div>
                </div>

                <p className="text-right toLogin">
                  Already registered <a href="/">Login?</a>
                </p>

              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

class Home extends Component {
  render() {
    return(
      <div className="Home">

        <div className="container-fluid">

          <div className="row align-items-center head">
            <div className="col-3 title">
              <p>Musicollab</p>
            </div>

            <div className="col-6 searchBar">
              <input type="text" id="search" name="search" placeholder="Search"/>
            </div>

            <div className="col-1">
              <img className="float-right pic" src="profile.jpg" alt="prfile picture"/>
            </div>

            <div className = "col-2 user">
              <ul>
                <li><a href = "/profile"> Username</a></li>
                <li className="userID">User ID</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-2 filters">
              <div className="row">
                <div className="col">
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
              <div className="row">
                <div className="col">
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

            <div className="col-10 projects">
              <div className="create">

              </div>

            </div>
          </div>
        </div>


        <div className="container-fluid">

          <div className="row footer">
            <div className="col">
              Musicollab is a 2020 SD&D project
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Profile extends Component{
 render() {
    return(
      <div className="Profile">
        <div className="container-fluid">

          <div className="row align-items-center head">
            <div className="col-3 title">
              <p>Musicollab</p>
            </div>

            <div className="col-6 searchBar">
              <input type="text" id="search" name="search" placeholder="Search"/>
            </div>

            <div className="col-1">
              <img className="float-right pic" src="profile.jpg" alt="prfile picture"/>
            </div>

            <div className = "col-2 user">
              <ul>
                <li><a href = "profile"> Username</a></li>
                <li className="userID">User ID</li>
              </ul>
            </div>
          </div>

        </div>

        <div className="container-fluid">
          <div className="row footer">
            <div className="col">
              Musicollab is a 2020 SD&D project
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

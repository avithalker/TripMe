import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AuthenticationManager,
  currentAuthenticatedUser
} from "../../../Utils/AuthenticationManager.js";
import "./Navbar.css";
import TripMeLogo from "../../../sources/images/TripmeLogo.png";

const authenticationManager = new AuthenticationManager();

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    currentAuthenticatedUser.subscribe(x => this.setState({}));
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/HomePage"} className="navbar-brand">
          <img className="brand-img" src={TripMeLogo} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/SearchPage"} className="nav-link">
                Search<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/CreateDiary"} className="nav-link">
                Add New Diary<span className="sr-only">(current)</span>
              </Link>
            </li>
            {this.getLinksForAuthenticatedUser()}
            {this.getAuthenticationLinks()}
          </ul>
        </div>
      </nav>
    );
  }

  getLinksForAuthenticatedUser() {
    if (authenticationManager.isUserAuthenticated()) {
      return (
        <li className="nav-item">
          <Link to={"/MyDiaries"} className="nav-link">
            My Diaries<span className="sr-only">(current)</span>
          </Link>
        </li>
      );
    }
  }

  getAuthenticationLinks() {
    if (authenticationManager.isUserAuthenticated()) {
      return (
        <li className="nav-item">
          <Link to={"/LogoutPage"} className="nav-link">
            Log out<span className="sr-only">(current)</span>
          </Link>
        </li>
      );
    } else {
      return [
        <li className="nav-item">
          <Link to={"/LoginPage"} className="nav-link">
            Sign in<span className="sr-only">(current)</span>
          </Link>
        </li>,
        <li className="nav-item">
          <Link to={"/RegistrationPage"} className="nav-link">
            Register<span className="sr-only">(current)</span>
          </Link>
        </li>
      ];
    }
  }
}

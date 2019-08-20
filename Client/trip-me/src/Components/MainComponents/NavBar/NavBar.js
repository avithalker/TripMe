import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          TripMe Diaries
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/CreateDiary"} className="nav-link">
                Add New Diary<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/MyDiaries"} className="nav-link">
                My Diaries<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/SearchPage"} className="nav-link">
                Search<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/HomePage"} className="nav-link">
                Home<span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className = "nav-item">
                <Link to = {"/LoginPage"} className = "nav-link">
                Sign in<span className = "sr-only">(current)</span>
                </Link>  
            </li>
            <li className = "nav-item">
                <Link to = {"/RegistrationPage"} className ="nav-link">
                Register<span className = "sr-only">(current)</span>
                </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

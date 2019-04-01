import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">TripMe Diaries</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to={'/ShowDiary'} className="nav-link">Show Diary<span className="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
             <Link to={'/CreateDiary'} className='nav-link'>Add New Diary<span className="sr-only">(current)</span></Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
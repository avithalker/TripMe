
import React, { Component } from 'react';
import './App.css';
import Diary from './Components/DiaryForm';
import NavBar from './Components/MainComponents/NavBar';
import AppRouter from './Components/MainComponents/AppRouter';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
        <div className={"container"}>
          <NavBar/>
          <AppRouter/>
        </div>
    );
  }
}
export default App;
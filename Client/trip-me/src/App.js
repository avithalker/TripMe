
import React, { Component } from 'react';
import './App.css';
import Diary from './Components/Diary';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
        <div className={"container"}>
            <Diary/>
        </div>
    );
  }
}
export default App;
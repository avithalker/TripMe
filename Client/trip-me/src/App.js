import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/MainComponents/NavBar/NavBar.js";
import AppRouter from "./Components/MainComponents/AppRouter";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="container-fluid">
          <AppRouter />
        </main>
      </div>
    );
  }
}
export default App;

import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/MainComponents/NavBar/NavBar.js";
import AppRouter from "./Components/MainComponents/AppRouter";
import PageForm from "./Components/PageForm/PageForm.js"
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
      let reviews = [{ReviewId:"1234",ReviewType:1, Caption:"test caption", PhotoUrl:null ,Answers:{2:"test", 3:"another test", 4: "8", 6:"3", 7:"5"}} ,{ReviewId:"1238",ReviewType:1, Caption:"test caption", PhotoUrl:null ,Answers:{2:"test", 3:"another test", 4: "8", 6:"3", 7:"4"}}]
    return (
      <div>
        <NavBar />
        <main className="container-fluid main">
            <AppRouter></AppRouter>
        </main>
      </div>
    );
  }
}
export default App;

import React, { Component } from "react";
import "./App.css";
import Diary from "./Components/DiaryForm";
import NavBar from "./Components/MainComponents/NavBar/NavBar.js";
import AppRouter from "./Components/MainComponents/AppRouter";
import ReviewSelector from "./Components/ReviewSelector/ReviewSelector.js";
import ReviewQuestionnaire from "./Components/ReviewQuestionnaire/ReviewQuestionnaire.js";
import CreatePage from "./Components/CreatePage/CreatePage.js";
import DiaryEntry from "./Components/DiaryEntry/DiaryEntry.js";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    return (
      // <div className="container">
      //   <NavBar />
      //   <AppRouter />
      // </div>
      <CreatePage />
    );
  }
}
export default App;

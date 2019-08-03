import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import DiaryForm from "../DiaryForm";
import DiaryByIdPage from "../ShowDiaryPage/DiaryByIdPage";
import DiariesContainer from "./DiariesContainer/DiariesContainer";

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/CreateDiary" component={DiaryForm} />
        <Route exact path="/ShowDiary" component={DiaryByIdPage} />
        <Route exact path="/MyDiaries" component={DiariesContainer} />
      </Switch>
    );
  }
}

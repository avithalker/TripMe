import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import DiaryForm from "../DiaryForm/DiaryForm.js";
import DiariesContainer from "./DiariesContainer/DiariesContainer";
import DiaryFullView from "../DiaryFullView/DiaryFullView";

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/CreateDiary" component={DiaryForm} />
        <Route exact path="/ShowDiary" component={DiaryFullView} />
        <Route exact path="/MyDiaries" component={DiariesContainer} />
      </Switch>
    );
  }
}

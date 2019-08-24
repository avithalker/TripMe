import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import DiaryForm from "../DiaryForm/DiaryForm.js";
import DiariesContainer from "./DiariesContainer/DiariesContainer";
import DiaryFullView from "../DiaryFullView/DiaryFullView";
import DiaryPage from "../ShowDiaryPage/DiaryPage";
import SearchPage from "../SearchPage/SearchPage";
import HomePage from "../HomePage/HomePage";
import RegistrationPage from "../RegistrationPage/RegistrationPage.js"
import LoginPage from "../LoginPage/LoginPage.js";
import LogoutPage from "../LogoutPage/LogoutPage.js";

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/CreateDiary" component={DiaryForm} />
        <Route exact path="/ShowDiary" component={DiaryFullView} />
        <Route
          exact
          path="/MyDiaries"
          component={DiariesContainer}
          render={props => <DiariesContainer {...props} />}
        />
        <Route
          exact
          path="/TestPage"
          render={() => <DiaryPage DiaryId="40" PageId="39" />}
        />
        <Route exact path= "/SearchPage" component={SearchPage} />
        <Route exact path= "/HomePage" component={HomePage} />
        <Route exact path= "/RegistrationPage" component = {RegistrationPage}/>
        <Route exact path= "/LoginPage" component = {LoginPage}/> 
        <Route exact path= "/LogoutPage" component = {LogoutPage}/> 
      </Switch>
    );
  }
}

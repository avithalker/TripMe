import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import DiaryForm from '../DiaryForm';
import DiaryByIdPage from '../ShowDiaryPage/DiaryByIdPage';


export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/CreateDiary" component={DiaryForm}/>
        <Route exact path="/ShowDiary" component={DiaryByIdPage}/>
      </Switch>
    );
  }
}
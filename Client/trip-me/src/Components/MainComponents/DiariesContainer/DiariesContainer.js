import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DiaryEntry from "../../DiaryEntry/DiaryEntry";
import TripMeHttpClient from "../../../Services/TripMeHttpClient.js";
import TripTypeEnum from "../../../Enums/TripTypeEnum.js";
import AppLoader from "../../Shared/AppLoader/AppLoader";
import "./DiariesContainer.css";

export default class DiariesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Diaries: []
    };
  }

  GetDiaries = () => {
    debugger;
    var caller = new TripMeHttpClient();
    return caller.getDiariesByUser();
  };

  componentDidMount() {
    debugger;
    if (this.state.Diaries.length == 0) {
      this.GetDiaries().then(response => {
        this.setState({ Diaries: response });
      });
    }
  }

  renderDiary = diary => {
    var tripType = diary.TripType + 1;
    debugger;
    return (
      <DiaryEntry
        Name={diary.Name}
        Destination={diary.Countries}
        Type={TripTypeEnum[tripType]}
      />
    );
  };

  renderDiaries = () => {
    return (
      <div className="row">
        {this.state.Diaries.map(diary => {
          return <div className="col-4 p-3">{this.renderDiary(diary)}</div>;
        })}
      </div>
    );
  };

  render() {
    if (this.state.Diaries.length == 0) {
      return <AppLoader />;
    }

    return (
      <div>
        <div>{this.renderDiaries()}</div>
      </div>
    );
  }
}

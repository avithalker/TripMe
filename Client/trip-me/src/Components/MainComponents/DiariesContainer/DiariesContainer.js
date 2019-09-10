import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DiaryEntry from "../../DiaryEntry/DiaryEntry";
import TripMeHttpClient from "../../../Services/TripMeHttpClient.js";
import TripTypeEnum from "../../../Enums/TripTypeEnum.js";
import AppLoader from "../../Shared/AppLoader/AppLoader";
import "./DiariesContainer.css";
import DiaryFullView from "../../DiaryFullView/DiaryFullView";
import { getKeyByValue } from "../../../Helpers/Helpers";

export default class DiariesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Diaries: []
    };
  }

  GetDiaries = () => {
    var caller = new TripMeHttpClient();
    return caller.getDiariesByUser();
  };

  componentDidMount() {
    if (this.state.Diaries.length == 0) {
      this.GetDiaries().then(response => {
        this.setState({ Diaries: response });
      });
    }
  }

  renderDiary = diary => {
    return (
      <DiaryEntry
        Name={diary.Name}
        Destination={diary.Countries}
        Type={getKeyByValue(TripTypeEnum, diary.TripType)}
        CoverPhoto={diary.CoverPhotoUrl}
        Id={diary.Id}
        Writer={diary.Writer.UserName}
        Views={diary.ViewCount}
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

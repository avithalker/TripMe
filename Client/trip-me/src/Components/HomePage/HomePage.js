import { Component } from "react";
import React from "react";
import DiaryCarousel from "./DiaryCrousel/DiaryCarousel";
import "../HomePage/HomePage.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import DiaryEntry from "../DiaryEntry/DiaryEntry.js";
import TripTypeEnum from "../../Enums/TripTypeEnum";
import { getKeyByValue } from "../../Helpers/Helpers";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Diaries: null,
      ShowLoader: true
    };
  }

  renderDiary = diary => {
    var tripType = diary.TripType + 1;
    return (
      <DiaryEntry
        Name={diary.Name}
        Destination={diary.Countries}
        Type={getKeyByValue(TripTypeEnum, tripType)}
        CoverPhoto={diary.CoverPhotoUrl}
        Id={diary.Id}
      />
    );
  };

  GetDiaries = () => {
    var caller = new TripMeHttpClient();
    return caller.getDiariesByUser();
  };

  componentDidMount() {
    this.GetDiaries().then(response => {
      this.setState({ Diaries: response, ShowLoader: false });
    });
  }

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
    if (this.state.ShowLoader) {
      return <AppLoader />;
    }
    return (
      <div>
        <div className="diaries-carousel">
          <h2>Top Rated</h2>
          <DiaryCarousel diaries={this.state.Diaries} />
        </div>
        <div className="home-body">
          <h2>Most Viewed</h2>
          {this.renderDiaries()}
        </div>
      </div>
    );
  }
}

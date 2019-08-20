import { Component } from "react";
import React from "react";
import DiaryCarousel from "./DiaryCrousel/DiaryCarousel";
import "../HomePage/HomePage.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import DiaryEntry from "../DiaryEntry/DiaryEntry.js";
import TripTypeEnum from "../../Enums/TripTypeEnum";
import { getKeyByValue } from "../../Helpers/Helpers";
import { OrderDiaries } from "../../Enums/OrderDiariesEnum";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DiariesMostRecent: null,
      DiariesMostViewed: null,
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

  GetDiariesByOrder = valueOrder => {
    var caller = new TripMeHttpClient();
    var request = {
      SearchParameters: {},
      OrderBy: valueOrder,
      ResultLimit: 3
    };
    return caller.getDiariesBySearch(request);
  };

  componentDidMount() {
    this.GetDiariesByOrder(OrderDiaries.MOST_RECENT).then(
      MostRecentResponse => {
        this.GetDiariesByOrder(OrderDiaries.MOST_VIEWED).then(
          MostViewedResponse => {
            this.setState({
              DiariesMostViewed: MostViewedResponse,
              DiariesMostRecent: MostRecentResponse,
              ShowLoader: false
            });
          }
        );
      }
    );
  }

  renderDiaries = diaries => {
    return (
      <div className="row">
        {diaries.map(diary => {
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
          <DiaryCarousel diaries={this.state.DiariesMostRecent} />
        </div>
        <hr />
        <div className="home-body">
          <div className="most-viewed">
            <h2>Most Viewed</h2>
            {this.renderDiaries(this.state.DiariesMostViewed)}
          </div>
          <hr />
          <div className="most-recent">
            <h2>Most Recent</h2>
            {this.renderDiaries(this.state.DiariesMostRecent)}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

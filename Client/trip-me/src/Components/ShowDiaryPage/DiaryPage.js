import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import Review from "../Review/Review";
import AppLoader from "../Shared/AppLoader/AppLoader";
import "../ShowDiaryPage/DiaryPage.css";

const tripMeHttpClient = new TripMeHttpClient();

export default class DiaryPage extends Component {
  constructor(props) {
    super(props);
  }

  renderReviews = () => {
    return Object.values(this.props.Page.Reviews).map(review => {
      return (
        <div className="row reviewContainer">
          <div className="col-12">
            <Review review={review} />
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="position-relative">
          <h4 className="PageTitle">{this.props.Page.Title}</h4>
        </div>
        <div className="reviews position-relative">{this.renderReviews()}</div>
      </div>
    );
  }
}

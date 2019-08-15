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
    this.state = { Page: null, showLoader: true };
  }

  fetchPage = () => {
    debugger;
    tripMeHttpClient
      .getPageById(this.props.DiaryId, this.props.PageId)
      .then(response => {
        this.setState({ Page: response, showLoader: false });
      });
  };

  componentDidMount() {
    if (this.state.showLoader) {
      this.fetchPage();
    }
  }

  renderReviews = () => {
    debugger;
    return Object.values(this.state.Page.Reviews).map(review => {
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
    debugger;
    if (this.state.showLoader) {
      return <AppLoader />;
    }
    return (
      <div className="diaryPage">
        <div className="position-relative">
          <h4 className="PageTitle">{this.state.Page.Title}</h4>
        </div>
        <div className="reviews position-relative">{this.renderReviews()}</div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import Review from "../Review/Review";
import AppLoader from "../Shared/AppLoader/AppLoader";

const tripMeHttpClient = new TripMeHttpClient();

export default class DiaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { Page: null, showLoader: true };
  }

  fetchDiary = () => {
    tripMeHttpClient.getDiaryById(this.state.id).then(response => {
      this.setState({ selectedDiary: response, isDiarySelected: true });
    });
  };

  componentDidMount() {
    this.fetchDiary(this.props.id).then(page => {
      this.setState({ Page: page });
    });
  }

  renderReview = review => {
    return <Review review={review} />;
  };

  renderReviews() {
    this.state.Page.Reviews.map(review => {
      return <div className="col-6">{this.renderReview(review)}</div>;
    });
  }

  render() {
    if (this.state.showLoader) {
      return <AppLoader />;
    }
    return <div className="row">{this.renderReviews()}</div>;
  }
}

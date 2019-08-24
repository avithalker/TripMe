import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ReviewSelector.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";

const tripMeHttpClient = new TripMeHttpClient();

class ReviewSelector extends Component {
  state = { reviewTypes: [] };

  componentDidMount() {
    this.fetchReviewTypes();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">{this.ReviewItems()}</div>
      </div>
    );
  }

  fetchReviewTypes = () => {
    tripMeHttpClient.getReviewTypes().then(reviewTypes => {
      this.setState({
        reviewTypes: reviewTypes
      });
    });
  };

  ReviewItems = () => {
    const items = this.state.reviewTypes.map((reviewType, index) => {
      return (
        <div key={reviewType.TypeId} className="col-sm-4">
          <button
            type="button"
            className="btn btn-primary reviewItemBtn"
            onClick={() => this.props.onReviewSelected(reviewType.TypeId)}
          >
            {reviewType.Description}
          </button>
        </div>
      );
    });
    return items;
  };
}

export default ReviewSelector;

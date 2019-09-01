import React, { Component } from "react";
import ReviewField from "../ReviewField/ReviewField";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import "./Review.css";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fields: [],
      ReviewLoaded: false
    };
  }

  componentDidMount() {
    this.getReviewQuestionnaireByTypeId(this.props.review.ReviewType);
  }
    
    render() {
    if (this.state.ReviewLoaded) {
      return <AppLoader />;
    }
    return (
      <div className="shadow p-2 mb-3 bg-white rounded">
        <div className="card position-relative">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                {this.ReviewFields(this.state.Fields)}
              </div>
              <div className="col-7">
                <span className = "review-caption">{this.props.review.Caption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getReviewQuestionnaireByTypeId = reviewTypeId => {
    var tripMeHttpClient = new TripMeHttpClient();
    tripMeHttpClient.getReviewQuestionnaireById(reviewTypeId).then(response => {
      this.setState({ Fields: response.Fields, isReviewLoaded: true });
    });
  };

  ReviewFields = fields => {
    var fields = fields.map((field, index) => {
      return (
        <div className="col-12">
          <ReviewField
            key={index}
            FieldTypeId={field.FieldTypeId}
            DisplayText={field.DisplayText}
            Answer={this.props.review.Answers[field.QuestionId]}
            EditMode={false}
          />
        </div>
      );
    });
    return fields;
  };
}
export default Review;

import React, { Component } from "react";
import ReviewField from "../ReviewField/ReviewField";
import TripMeHttpClient from "../../Services/TripMeHttpClient";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fields: []
    };
  }

  getReviewByTypeId = reviewId => {
    var tripMeHttpClient = new TripMeHttpClient();
    tripMeHttpClient.getReviewQuestionnaireById(reviewId).then(response => {
      return response.Fields;
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
            Answer={this.props.review.Answers[field.FieldTypeId]}
            EditMode={false}
          />
        </div>
      );
    });
    return fields;
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-7 p-0">
          <div className="card review">
            <div className="card-body">
              <div className="row">{this.QuestionnaireFields()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;

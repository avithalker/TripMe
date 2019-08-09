import React, { Component } from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import ReviewField from "../ReviewField/ReviewField.js";
import "./ReviewQuestionnaire.css";

const tripMeHttpClient = new TripMeHttpClient();

class ReviewQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaire: [],
      answers: {}
    };
  }

  componentDidMount() {
    this.fetchQuestionnaire(this.props.ReviewTypeId);
  }

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
        <div className="col-sm-5 p-0">
          <textarea
            className="TextReview w-100 h-100"
            placeholder="Write your caption here..."
          />
        </div>
      </div>
    );
  }

  fetchQuestionnaire = reviewTypeId => {
    tripMeHttpClient
      .getReviewQuestionnaireById(reviewTypeId)
      .then(reviewQuestionnaire => {
        this.setState({ questionnaire: reviewQuestionnaire.Fields });
      });
  };

  QuestionnaireFields = () => {
    var fields = this.state.questionnaire.map((field, index) => {
      return (
        <div className="col-12">
          <ReviewField
            key={index}
            FieldTypeId={field.FieldTypeId}
            DisplayText={field.DisplayText}
            onFieldValueChanged={answer =>
              this.onAnswerChanged(field.QuestionId, answer)
            }
            EditMode={true}
          />
        </div>
      );
    });
    return fields;
  };

  onAnswerChanged = (fieldId, answer) => {
    let answers = Object.assign({}, this.state.answers);
    answers[fieldId] = answer;

    this.setState({ answers: answers }, () => {
      this.props.onQuestionnaireAnswersChanged(this.state.answers);
    });
  };
}

export default ReviewQuestionnaire;

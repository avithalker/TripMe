import React, { Component } from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import ReviewField from "../ReviewField/ReviewField.js";
import "./ReviewQuestionnaire.css";

const tripMeHttpClient = new TripMeHttpClient();

class ReviewQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReviewTypeId: props.ReviewTypeId,
      questionnaire: [],
      answers: {},
      onQuestionnaireAnswersChanged: props.onQuestionnaireAnswersChanged
    };

    this.onAnswerChanged = this.onAnswerChanged.bind(this);
    this.fetchQuestionnaire(props.ReviewTypeId);
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="row">{this.QuestionnaireFields()}</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <textarea className="reviewTextArea w-100 h-100" />
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
      this.state.onQuestionnaireAnswersChanged(this.state.answers);
    });
  };
}

export default ReviewQuestionnaire;

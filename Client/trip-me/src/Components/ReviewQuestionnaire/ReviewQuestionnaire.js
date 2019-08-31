import React, { Component } from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import ReviewField from "../ReviewField/ReviewField.js";
import "./ReviewQuestionnaire.css";
import {ReviewStructureType} from "../../Enums/ReviewStructureTypeEnum.js";

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
    if(this.props.ReviewType.StructureTypeId === ReviewStructureType.QUESTIONNAIRE){
        this.fetchQuestionnaire(this.props.ReviewType.TypeId);
    }
  }

  render() {
    return (
      <div className="shadow p-3 mb-5 bg-white rounded">
        <div className="card position-relative">
          <div className="card-header">
              {this.buildReview()}
          </div>
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

  buildReview = ()=>{
      switch(this.props.ReviewType.StructureTypeId){
          case ReviewStructureType.QUESTIONNAIRE:{
              return this.buildQuestionnaireReview();
          }
          case ReviewStructureType.FREE_TEXT:{
              return this.buildFreeTextReview();
          }
          case  ReviewStructureType.IMAGE:{
              break;
          }
      }
  }
  
  buildFreeTextReview = ()=>{
    return(
        <div className="row">
            <textarea
              className="TextReview w-100"
              placeholder="Write your text here..."
              onChange = {this.onCaptionChanged}
            />
        </div>
      );
  }
  
  buildQuestionnaireReview = ()=>{
      return(
        <div className="row">
          <div className="col-5">{this.QuestionnaireFields()}</div>
          <div className="col-7">
            <textarea
              className="Caption w-100 h-100"
              placeholder="Write your caption here..."
              onChange = {this.onCaptionChanged}
            />
          </div>
        </div>
      );
  }

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

    onCaptionChanged = event =>{
        this.props.onCaptionChanged(event.target.value);
    }

}

export default ReviewQuestionnaire;

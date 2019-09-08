import React, { Component } from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import ReviewField from "../ReviewField/ReviewField.js";
import ImageUploader from "react-images-upload";
import {ReviewStructureType} from "../../Enums/ReviewStructureTypeEnum.js";
import CloudinaryHttpClient from "../../Services/CloudinaryHttpClient.js";
import "./ReviewQuestionnaire.css";

const tripMeHttpClient = new TripMeHttpClient();

class ReviewQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaire: [],
      answers: this.props.reviewAnswers
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
              return this.buildImageReview();
          }
      }
  }
  
  buildImageReview(){
      return(
          <div>
              <div className = "row">
                  <div className = "col-sm-1"></div>
                  <div className = "col-sm-10">
                    <ImageUploader
                      withIcon={true}
                      buttonText="Upload your photo"
                      onChange={this.onPhotoSelected}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                      withPreview={true}
                      singleImage={true}
                    />
                 </div>
                  <div className = "col-sm-1"></div>
              </div>
              <div className = "row">
                  <div className = "col-sm-1"></div>
                  <div className = "col-sm-10">
                      <textarea className = "w-100" placeholder = "Write your caption here..."
                        onChange = {this.onCaptionChanged}>
                      </textarea>
                  </div>
                  <div className = "col-sm-1"></div>
              </div>
          </div>
      )
  }
  
  buildFreeTextReview = ()=>{
    return(
        <div className="row">
            <textarea
              className="TextReview w-100"
              placeholder="Write your text here..."
              value = {this.props.caption}
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
              value = {this.props.caption}
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
            Answer = {this.props.reviewAnswers.hasOwnProperty(field.QuestionId) === true?this.props.reviewAnswers[field.QuestionId]: null }
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
    
  onPhotoSelected = photoArray => {
      if(photoArray.length === 0){
          return;
      }
      this.uploadDiaryCoverPhoto(photoArray[0]).then(photoUrl=>{
          this.props.onPhotoChanged(photoUrl);
      });
  };

  uploadDiaryCoverPhoto = (photo) => {
    let cloudinaryHttpClient= new CloudinaryHttpClient();
    return cloudinaryHttpClient.uploadPhoto(photo);
  };

}

export default ReviewQuestionnaire;

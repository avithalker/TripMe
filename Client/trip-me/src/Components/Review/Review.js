import React, { Component } from "react";
import ReviewField from "../ReviewField/ReviewField";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import {ReviewStructureType} from "../../Enums/ReviewStructureTypeEnum.js";
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
      if(this.props.structureTypeId === ReviewStructureType.QUESTIONNAIRE){
        this.getReviewQuestionnaireByTypeId(this.props.review.ReviewType);
      }
  }
    
    render() {
    if (this.state.ReviewLoaded) {
      return <AppLoader />;
    }
    return (
        this.RenderReview()
    );
  }
    
 RenderReview = ()=>{
     switch(this.props.structureTypeId){
         case ReviewStructureType.QUESTIONNAIRE:{return this.buildQuestionnaireReivew();}
         case ReviewStructureType.FREE_TEXT:{return this.buildFreeTextReview()}
         case ReviewStructureType.IMAGE:{return this.buildImageReview()}
     }
 }
 
 buildQuestionnaireReivew = ()=>{
     return(        
        <div className="shadow p-2 mb-3 bg-white rounded">
            <div className="card position-relative">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            {this.ReviewFields(this.props.Fields)}
                        </div>
                        <div className="col-7">
                            <span className = "review-caption">{this.props.review.Caption}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
 }
 
 buildFreeTextReview = ()=>{
     return(
        <div className="row p-4 mb-3">
            <span className = "review-caption">{this.props.review.Caption}</span>
        </div>
     )
 }
 
 buildImageReview = ()=>{
     return(
         <div className ="row p-4">
             <figure class="figure">
              <img src={this.props.review.PhotoUrl} class="figure-img img-fluid rounded review-image" alt=""></img>
              <figcaption class="figure-caption">{this.props.review.Caption}</figcaption>
            </figure>
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
    let reviewFields = fields.map((field, index) => {
      return (
        <div className="col-12" key={index}>
          <ReviewField
            FieldTypeId={field.FieldTypeId}
            DisplayText={field.DisplayText}
            Answer={this.props.review.Answers[field.QuestionId]}
            EditMode={false}
          />
        </div>
      );
    });
    return reviewFields;
  };
}
export default Review;

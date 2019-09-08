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
  }

  render() {
    return (
      <div>
        <div className="position-relative">
          <h4 className="PageTitle">{this.props.Page.Title}</h4>
        </div>
        <div className="reviews position-relative">{this.renderReviews()}</div>
      </div>
    );
  }
    
  renderReviews = () => {
      console.log(this.props.Page.Reviews);
    return Object.values(this.props.Page.Reviews).map((review,index) => {
      return (
        <div className="row reviewContainer" key= {index}>
          <div className="col-12">
            <Review review={review} structureTypeId = {this.getReviewStructureByType(review.ReviewType)}></Review>
          </div>
        </div>
      );
    });
  };

  getReviewStructureByType = reviewTypeId =>{
      let reviewType = this.props.ReviewTypes.find(x=> x.TypeId === reviewTypeId);
      console.log(reviewType);
      return reviewType.StructureTypeId;
  }
}

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import Review from "../Review/Review";
import AppLoader from "../Shared/AppLoader/AppLoader";
import {ReviewStructureType} from "../../Enums/ReviewStructureTypeEnum.js";
import "../ShowDiaryPage/DiaryPage.css";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

const tripMeHttpClient = new TripMeHttpClient();

export default class DiaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        reviewQuestionniares:[],
        isReviewQuestionnaireLoaded: false
    }
  }
    
    componentDidMount() {
        this.getReviewQuestionnaires();
    }

    goToEditPage = ()=> {
      this.props.GoToEditPage(this.props.Page.PageId);
    }

  render() {
    if(!this.state.isReviewQuestionnaireLoaded){
        return(<AppLoader></AppLoader>)
    }
    return (
      <div>
        <div className="position-relative">
          <h4 className="PageTitle">{this.props.Page.Title}</h4>
        </div>
        <div className="reviews position-relative">{this.renderReviews()}</div>
        <div className="edit-button">
          <Fab color="secondary" onClick={this.goToEditPage}>
            <EditIcon></EditIcon>
          </Fab>
        </div>
      </div>
    );
  }
    
  renderReviews = () => {
    let reviews = Object.values(this.props.Page.Reviews);
    reviews.sort((review1,review2) => review1.DisplayOrder - review2.DisplayOrder);
    return reviews.map((review,index) => {
        let structureTypeId = this.getReviewStructureByType(review.ReviewType);
        let reviewQuestions = null;
        if(structureTypeId === ReviewStructureType.QUESTIONNAIRE){
           reviewQuestions = (this.getReviewQuestionnaireByTypeId(review.ReviewType)).Fields;
        }
      return (
        <div className="row reviewContainer" key= {index}>
          <div className="col-12">
            <Review review={review} structureTypeId = {this.getReviewStructureByType(review.ReviewType)} Fields= {reviewQuestions}></Review>
          </div>
        </div>
      );
    });
  };

  getReviewStructureByType = reviewTypeId =>{
      let reviewType = this.props.ReviewTypes.find(x=> x.TypeId === reviewTypeId);
      return reviewType.StructureTypeId;
  }
  
    getReviewQuestionnaireByTypeId = reviewTypeId =>{
        return this.state.reviewQuestionniares.find(x=>x.ReviewTypeId === reviewTypeId)
    }
    getReviewQuestionnaires = () => {
    var tripMeHttpClient = new TripMeHttpClient();
    tripMeHttpClient.getReviewsQuestionnaire().then(response =>{
        this.setState({reviewQuestionniares:response, isReviewQuestionnaireLoaded:true});
    })
  };
}

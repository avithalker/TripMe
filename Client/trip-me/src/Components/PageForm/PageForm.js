import React, { Component } from "react";
import ReviewSelector from "../ReviewSelector/ReviewSelector.js";
import { Collapse } from "react-collapse";
import ReviewQuestionnaire from "../ReviewQuestionnaire/ReviewQuestionnaire.js";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import "./PageForm.css";

const tripMeHttpClient = new TripMeHttpClient();

class PageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReviewSelectorOpen: false,
      pageTitle: this.props.pageTitle != null? this.props.pageTitle: "",
      pageReviews: [],
      nextReviewObjectId: 1,
      pageCreated: false
    };
      
  }

  async componentDidMount() {
   await this.initializePageReviews(this.props.reviews);
  }
    
  initializePageReviews = async (reviews)=> {
      if(reviews == null)
          return;
      let objectId = this.state.nextReviewObjectId;
      let reviewTypes = await this.fetchReviewTypes();
      let sortedReviews = [...reviews]
      sortedReviews.sort((review1, review2) => review1.DisplayOrder > review2.DisplayOrder?1:-1) 
      let pageReviews = sortedReviews.map(review=>{
          let reviewType = reviewTypes.find(x=>x.TypeId === review.ReviewType);
          let pageReview = new PageReview(reviewType, objectId, review.ReviewId, review.Answers, review.Caption, review.PhotoUrl);
          objectId++;
          return pageReview;
      });
      this.setState({pageReviews:pageReviews, nextReviewObjectId:objectId});
  }

  getPageReviews = () => {
    const pageReviews = this.state.pageReviews.map((pageReview, index) => {
      return (
        <div key={pageReview.objectId} className="row">
          <div className="col-12 position-relative">
            <ReviewQuestionnaire
              ReviewType={pageReview.ReviewType} reviewAnswers = {pageReview.Answers} caption = {pageReview.Caption}
              photoUrl = {pageReview.PhotoUrl}
              onQuestionnaireAnswersChanged={answers =>
                this.onQuestionnaireAnswersChanged(pageReview.objectId, answers)
              }
              onCaptionChanged={caption =>
                this.onReviewCaptionChanged(pageReview.objectId, caption)
              }
              onPhotoChanged = {photoUrl => 
                this.onReviewPhotoChanged(pageReview.objectId, photoUrl)}
            />
            <button
              className="btn btn-danger deleteReview"
              onClick={() => this.onReviewDeleted(pageReview.objectId)}
            >
              X
            </button>
          </div>
        </div>
      );
    });

    return pageReviews;
  };

  changeReviewSelectorState = () => {
    this.setState({ isReviewSelectorOpen: !this.state.isReviewSelectorOpen });
  };

  onReviewSelected = reviewType => {
    this.setState((state, props) => {
      let pageReview = new PageReview(reviewType, state.nextReviewObjectId, null, {}, null, null);
      let pageReviews = [...state.pageReviews];
      pageReviews.push(pageReview);
      return {
        pageReviews: pageReviews,
        nextReviewObjectId: state.nextReviewObjectId + 1
      };
    });
  };

  onReviewDeleted = objectId => {
    this.setState((state, props) => {
      let filteredPageReviews = state.pageReviews.filter(
        review => review.objectId !== objectId
      );
      return { pageReviews: filteredPageReviews };
    });
  };

  onQuestionnaireAnswersChanged = (objectId, questionnaireAnswers) => {
    let pageReviews = JSON.parse(JSON.stringify(this.state.pageReviews));
    let pageReview = pageReviews.find(
      pageReview => pageReview.objectId === objectId
    );
    pageReview.Answers = questionnaireAnswers;
    this.setState({ pageReviews: pageReviews });
  };

  onReviewCaptionChanged = (objectId, caption) => {
    let pageReviews = JSON.parse(JSON.stringify(this.state.pageReviews));
    let pageReview = pageReviews.find(
      pageReview => pageReview.objectId === objectId
    );
    pageReview.Caption = caption;
    this.setState({ pageReviews: pageReviews });
  };

  onReviewPhotoChanged = (objectId, photoUrl)=>{
    let pageReviews = JSON.parse(JSON.stringify(this.state.pageReviews));
    let pageReview = pageReviews.find(
      pageReview => pageReview.objectId === objectId
    );
    pageReview.PhotoUrl = photoUrl;
    this.setState({pageReviews: pageReviews});
  }

  onPageTitleChange = event => {
    this.setState({ pageTitle: event.target.value });
  };

  savePage = event => {
    event.preventDefault();
      
      let pageFormData = {
          pageTitle: this.state.pageTitle,
          pageReviews: this.state.pageReviews
      }
      this.props.onSavePageClicked(pageFormData);
  };

  render() {
    return (
      <div className="container">
        <div>
          <form>
            <div className="form-group row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control pageTitle"
                  value = {this.state.pageTitle}
                  placeholder="Page title"
                  onChange={this.onPageTitleChange}
                />
              </div>
            </div>
            {this.getPageReviews()}
            <div className="row">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.savePage}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="div-review-expender">
          <div className="row">
            <Collapse isOpened={this.state.isReviewSelectorOpen}>
              <ReviewSelector onReviewSelected={this.onReviewSelected} />
            </Collapse>
          </div>
          <div className="row div-review-expender">
            <button
              type="button"
              className="btn btn-success btn-reviews-expender"
              onClick={this.changeReviewSelectorState}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }

  fetchReviewTypes = () => {
    return tripMeHttpClient.getReviewTypes()
    };
}

function PageReview(reviewType, objectId, reviewId, answers, caption, photoUrl) {
    
    this.objectId = objectId;
    this.ReviewId = reviewId;
    this.ReviewType = reviewType;
    this.Answers = answers;
    this.Caption = caption;
    this.PhotoUrl = photoUrl;
}

export default PageForm;
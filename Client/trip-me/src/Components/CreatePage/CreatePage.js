import React, { Component } from "react";
import ReviewSelector from "../ReviewSelector/ReviewSelector.js";
import { Collapse } from "react-collapse";
import ReviewQuestionnaire from "../ReviewQuestionnaire/ReviewQuestionnaire.js";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import DiaryPage from "../ShowDiaryPage/DiaryPage";
import PopUp from "../Shared/Popup";
import "./CreatePage.css";
import queryString from "query-string";
import AppLoader from "../Shared/AppLoader/AppLoader";

const tripMeHttpClient = new TripMeHttpClient();

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReviewSelectorOpen: false,
      pageTitle: "",
      pageReviews: [],
      nextReviewObjectId: 1,
      pageCreated: false,
      showPageClicked: false,
      Pageid: -1,
      diaryId: -1,
      isSaveButtonClicked: false
    };
  }

  componentDidMount() {
    var values = queryString.parse(this.props.location.search);
    this.setState({ diaryId: values.diaryId });
  }

  getPageReviews = () => {
    const pageReviews = this.state.pageReviews.map((pageReview, index) => {
      return (
        <div key={index} className="row">
          <div className="col-12 position-relative">
            <ReviewQuestionnaire
              ReviewType={pageReview.ReviewType}
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
      let pageReview = new PageReview(reviewType, state.nextReviewObjectId);
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
    let pageReviews = this.state.pageReviews.map((pageReview, index) => {
      return {
        ReviewType: pageReview.ReviewType.TypeId,
        Answers: pageReview.Answers,
        Caption: pageReview.Caption,
        PhotoUrl: pageReview.PhotoUrl,
        DisplayOrder: index
      };
    });
    let createPageRequest = new CreatePageRequest(
      this.state.diaryId,
      this.state.pageTitle,
      pageReviews
    );
    tripMeHttpClient.addNewPage(createPageRequest).then(response => {
      this.setState({
        pageCreated: true,
        Pageid: response,
        isSaveButtonClicked: false
      });
    });
    this.setState({ isSaveButtonClicked: true });
  };

  getPopUpMessage = () => {
    var message = this.state.pageTitle + " Created Successfully!!";
    return message;
  };

  goToDiary = () => {
    var url = "/ShowDiary?Id=" + this.state.diaryId;
    this.props.history.push(url);
  };

  render() {
    if (this.state.isSaveButtonClicked) {
      return <AppLoader></AppLoader>;
    }
    if (this.state.pageCreated) {
      return (
        <PopUp
          popupTitle = {this.getPopUpMessage()}
          popupText={"Now you can go to your diary and see the new page!"}
          handleClick={this.goToDiary}
          textButton="Return To Diary"
          enableCloseIcon = {false}
        />
      );
    }
    return (
      <div className="container">
        <div>
          <form>
            <div className="form-group row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control pageTitle"
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
}

function PageReview(reviewType, objectId) {
    
    this.objectId = objectId;
    this.ReviewType = reviewType;
    this.Answers = {};
    this.Caption = null;
    this.PhotoUrl = null;
}

function CreatePageRequest(diaryId, title, reviews) {
  this.DiaryId = diaryId;
  this.Title = title;
  this.Reviews = reviews;
}

export default CreatePage;

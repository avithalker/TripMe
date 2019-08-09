import React, { Component } from "react";
import ReviewSelector from "../ReviewSelector/ReviewSelector.js";
import { Collapse } from "react-collapse";
import ReviewQuestionnaire from "../ReviewQuestionnaire/ReviewQuestionnaire.js";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import DiaryPage from "../ShowDiaryPage/DiaryPage";
import PopUp from "../Shared/Popup";
import "./CreatePage.css";

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
      id: null
    };
  }

  getPageReviews = () => {
    const pageReviews = this.state.pageReviews.map((pageReview, index) => {
      return (
        <div key={index} className="row">
          <div className="col-11">
            <ReviewQuestionnaire
              ReviewTypeId={pageReview.ReviewType}
              onQuestionnaireAnswersChanged={answers =>
                this.onQuestionnaireAnswersChanged(pageReview.objectId, answers)
              }
            />
          </div>
          <div className="col-1">
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

  onReviewSelected = reviewTypeId => {
    this.setState((state, props) => {
      let pageReview = new PageReview(reviewTypeId, state.nextReviewObjectId);
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
    debugger;
    pageReview.Answers = questionnaireAnswers;
    this.setState({ pageReviews: pageReviews });
  };

  onPageTitleChange = event => {
    this.setState({ pageTitle: event.target.value });
  };

  savePage = event => {
    event.preventDefault();
    let pageReviews = this.state.pageReviews.map(pageReview => {
      return { ReviewType: pageReview.ReviewType, Answers: pageReview.Answers };
    });
    let createPageRequest = new CreatePageRequest(
      this.props.diaryId,
      this.state.pageTitle,
      pageReviews
    );
    tripMeHttpClient.addNewPage(createPageRequest).then(response => {
      this.setState({ pageCreated: true, id: response });
    });
    debugger;
  };

  getPopUpMessage = () => {
    var message = this.state.pageTitle + " Created Successfully!!";
    return message;
  };

  showPage = () => {
    this.setState({ showPageClicked: true });
  };

  render() {
    if (this.state.showPageClicked) {
      return <DiaryPage id={this.state.id} />;
    }
    if (this.state.pageCreated) {
      return (
        <PopUp
          popupText={this.getPopUpMessage()}
          show={true}
          handleClick={this.showPage}
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
            <div>{this.getPageReviews()}</div>
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

function PageReview(reviewTypeId, objectId) {
  this.objectId = objectId;
  this.ReviewType = reviewTypeId;
  this.Answers = {};
}

function CreatePageRequest(diaryId, title, reviews) {
  this.DiaryId = diaryId;
  this.Title = title;
  this.Reviews = reviews;
}

export default CreatePage;

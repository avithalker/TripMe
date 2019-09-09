import React, { Component } from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import PopUp from "../Shared/Popup";
import "./CreatePage.css";
import PageForm from "../PageForm/PageForm.js";
import queryString from "query-string";
import AppLoader from "../Shared/AppLoader/AppLoader";

const tripMeHttpClient = new TripMeHttpClient();

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageReviews: [],
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
            <PageForm reviews = {[]} onSavePageClicked = {this.createPage}></PageForm>);
  }

  createPage = pageFormData => {
    let pageReviews = pageFormData.pageReviews.map((pageReview, index) => {
      return {
        ReviewId: pageReview.ReviewId,
        ReviewType: pageReview.ReviewType.TypeId,
        Answers: pageReview.Answers,
        Caption: pageReview.Caption,
        PhotoUrl: pageReview.PhotoUrl,
        DisplayOrder: index
      };
    });
    let createPageRequest = new CreatePageRequest(
      this.state.diaryId,
      pageFormData.pageTitle,
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
}

function CreatePageRequest(diaryId, title, reviews) {
  this.DiaryId = diaryId;
  this.Title = title;
  this.Reviews = reviews;
}

export default CreatePage;

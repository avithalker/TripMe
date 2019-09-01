import React from "react";
import { Component } from "react";
import CreatePage from "../CreatePage/CreatePage";
import queryString from "query-string";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import { Button } from "react-bootstrap";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Collapse from "react-bootstrap/Collapse";
import IconButton from "@material-ui/core/IconButton";
import DiaryAdditionalData from "../DiaryAdditionalData/DiaryAdditionalData";
import { Card, CardBody } from "reactstrap";
import "../DiaryFullView/DiaryFullView.css";
import DiaryPage from "../ShowDiaryPage/DiaryPage";
import Paginator from "../Shared/Paginator/Paginator";
import { AuthenticationManager } from "../../Utils/AuthenticationManager.js";
import NoCoverImag from "../../sources/images/No_Cover.jpg";

class DiaryFullView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false,
      diary: null,
      isLoading: true,
      ShowDiaryData: false,
      pages: null,
      SelectedPage: null,
      ReviewTypes: []
    };
  }

  componentDidMount() {
    var values = queryString.parse(this.props.location.search);
    var caller = new TripMeHttpClient();
      
      caller.getReviewTypes().then(reviewTypes=> {
          this.setState({ReviewTypes: reviewTypes});
      });

    caller.getDiaryById(values.Id).then(diaryResponse => {
      caller.getPageList(values.Id).then(PageResponse => {
        if (PageResponse.length > 0) {
          caller
            .getPageById(values.Id, PageResponse[0].PageId)
            .then(SinglePageResponse => {
              this.setState({
                diary: diaryResponse,
                pages: PageResponse,
                SelectedPage: SinglePageResponse,
                isLoading: false
              });
            });
        } else {
          this.setState({
            diary: diaryResponse,
            pages: PageResponse,
            isLoading: false
          });
        }
      });
    });
  }

  fetchPageByIndex = index => {
    var caller = new TripMeHttpClient();
    caller
      .getPageById(this.state.diary.Id, this.state.pages[index].PageId)
      .then(response => {
        this.setState({ SelectedPage: response });
      });
  };

  ChangeSelectedPage = index => {
    this.fetchPageByIndex(index);
  };

  addPage = () => {
    this.setState({ addPage: true });
  };

  ShowSelectedPage = () => {
    if (this.state.SelectedPage == null) {
      return (
        <div className="emptyPage text-center text-secondary">
          <h2>There are no pages in this diary... </h2>
        </div>
      );
    }
    return <DiaryPage Page={this.state.SelectedPage} ReviewTypes = {this.state.ReviewTypes}/>;
  };

  RenderAddPageDiv = () => {
    let authenticatedUser = new AuthenticationManager().getAuthenticatedUser();
    if (
      this.state.diary &&
      authenticatedUser &&
      this.state.diary.Writer.Id === authenticatedUser.Id
    ) {
      return (
        <div className="addPageButton">
          <Button variant="success" onClick={this.addPage}>
            + Add New Page
          </Button>
        </div>
      );
    }
  };

  RedirectToCreatePage = () => {
    var url = "/CreatePage?diaryId=" + this.state.diary.Id;
    this.props.history.push(url);
  };

  getCoverImage = () => {
    if (
      this.state.diary.CoverPhotoUrl === null ||
      this.state.diary.CoverPhotoUrl === ""
    ) {
      return NoCoverImag;
    }
    return this.state.diary.CoverPhotoUrl;
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoader />;
    }
    if (this.state.addPage) {
      this.RedirectToCreatePage();
    }
    return (
      <div className="diary p-3">
        <div className="row">
          <div className="col-sm-4">
            <img
              src={this.getCoverImage()}
              alt=""
              className="img-thumbnail diary-cover-image"
            ></img>
          </div>
          <div className="col-sm-8">
            <h2>{this.state.diary.Name}</h2>
          </div>
        </div>
        <div className="row more-info-container">
          <div className="col-xs-1 p-0">
            <IconButton size="small">
              <ArrowDownwardIcon
                fontSize="inherit"
                aria-controls="additional-diary-data"
                aria-expanded={this.state.ShowDiaryData}
                onClick={() => {
                  this.setState({
                    ShowDiaryData: !this.state.ShowDiaryData
                  });
                }}
              />
            </IconButton>
          </div>
          <div className="col-xs-2 p-0">More info...</div>
        </div>
        <Collapse in={this.state.ShowDiaryData}>
          <div className="card-header diary-additional-container">
            <DiaryAdditionalData diaryData={this.state.diary} />
          </div>
        </Collapse>
        <div className="pages">
          <div className="row justify-content-between">
            <div className="col mr-auto p-2"></div>
            <div className="col-auto">{this.RenderAddPageDiv()}</div>
          </div>
          <hr />
          <div className="page shadow p-2 mb-3 bg-white rounded">
            {this.ShowSelectedPage()}
          </div>
          <hr />
          <div className="Paginator">
            <Paginator
              numOfItems={this.state.pages.length}
              OnSelect={this.ChangeSelectedPage}
            />
          </div>
        </div>
      </div>
    );
  }

  ShowDiaryData = () => {};
}
export default DiaryFullView;

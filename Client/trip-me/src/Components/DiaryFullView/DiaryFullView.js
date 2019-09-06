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
import "../DiaryFullView/DiaryFullView.css";
import DiaryPage from "../ShowDiaryPage/DiaryPage";
import Paginator from "../Shared/Paginator/Paginator";
import { AuthenticationManager } from "../../Utils/AuthenticationManager.js";
import NoCoverImag from "../../sources/images/No_Cover.jpg";
import CardMedia from "@material-ui/core/CardMedia";
import { Card, CardContent } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LikeIcon from "@material-ui/icons/ThumbUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import ListItemText from "@material-ui/core/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as LikeColored } from "@fortawesome/free-solid-svg-icons";

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
      ReviewTypes: [],
      ArrowClassButton: "up-arrow",
      LikeClicked: false
    };
  }

  componentDidMount() {
    var values = queryString.parse(this.props.location.search);
    var caller = new TripMeHttpClient();

    caller.getReviewTypes().then(reviewTypes => {
      this.setState({ ReviewTypes: reviewTypes });
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
    return (
      <DiaryPage
        Page={this.state.SelectedPage}
        ReviewTypes={this.state.ReviewTypes}
      />
    );
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

  OnLikeClicked = () => {
    this.setState({ LikeClicked: !this.state.LikeClicked });
  };

  GetLikeColor = () => {
    debugger;
    if (this.state.LikeClicked) {
      return "primary";
    }
    return "";
  };

  GetClassAdditionalInfo = () => {
    if (this.state.ShowDiaryData) {
      return "down-arrow";
    }

    return "up-arrow";
  };

  RedirectToCreatePage = () => {
    var url = "/CreatePage?diaryId=" + this.state.diary.Id;
    this.props.history.push(url);
  };

  GetLikeIcon = () => {
    if (this.state.LikeClicked) {
      return LikeColored;
    }

    return faThumbsUp;
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
            <Card>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={this.getCoverImage()}
                title="Contemplative Reptile"
                className="img-thumbnail diary-cover-image"
              />
            </Card>
          </div>
          <div className="col-sm-5">
            <h2>{this.state.diary.Name}</h2>
            <p className="text-secondary">By Sahar Haltzi</p>
            <div className="description-diary">
              <CardContent className="diary-content">
                bld bla bla this is a description of the diary bla bla bla bla
              </CardContent>
            </div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LikeIcon className="no-focus" />
                </ListItemIcon>
                <ListItemText className="text-secondary">
                  234 likes
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RemoveRedEyeIcon className="no-focus"></RemoveRedEyeIcon>
                </ListItemIcon>
                <ListItemText className="text-secondary">45 views</ListItemText>
              </ListItem>
            </List>
          </div>
          <div className="col-3">
            <span class="like-button">
              <Card>
                <IconButton
                  color={this.GetLikeColor()}
                  className="like-button"
                  aria-label="like"
                  onClick={this.OnLikeClicked}
                >
                  <FontAwesomeIcon
                    className="like-icon"
                    icon={this.GetLikeIcon()}
                    size="2x"
                    color="Dodgerblue"
                  ></FontAwesomeIcon>
                </IconButton>
              </Card>
            </span>
          </div>
        </div>
        <div className="row more-info-container">
          <div className="col-xs-1 p-0">
            <IconButton
              className={this.GetClassAdditionalInfo()}
              aria-expanded={this.state.ShowDiaryData}
              onClick={() => {
                this.setState({
                  ShowDiaryData: !this.state.ShowDiaryData
                });
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
            <h7 className="text-secondary">More Info...</h7>
          </div>
        </div>
        <Collapse in={this.state.ShowDiaryData}>
          <div className="diary-additional-container">
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

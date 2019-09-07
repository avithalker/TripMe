import { Component } from "react";
import React from "react";
import DiaryCarousel from "./DiaryCrousel/DiaryCarousel";
import CarouselNavigator from "./CarouselNavigator/CarouselNavigator";
import "../HomePage/HomePage.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import DiaryEntry from "../DiaryEntry/DiaryEntry.js";
import TripTypeEnum from "../../Enums/TripTypeEnum";
import { getKeyByValue } from "../../Helpers/Helpers";
import { OrderDiaries } from "../../Enums/OrderDiariesEnum";
import GlassesBooksImage from "../../../src/sources/images/image-glasses-booksjpg.jpg";
import PlanImage from "../../../src/sources/images/plan-image.jpg";
import TravelImg from "../../../src/sources/images/travel-image.jpg";
import { Button } from "react-bootstrap";
import PopUp from "../Shared/Popup";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DiariesMostRecent: null,
      DiariesMostViewed: null,
      ShowLoader: true
    };
  }

  SearchLink = "http://localhost:3000/#/SearchPage";
  AddNewDiaryLink = "http://localhost:3000/#/CreateDiary";
  LoginLink = "http://localhost:3000/#/LoginPage";

  renderDiary = diary => {
    var tripType = diary.TripType + 1;
    return (
      <DiaryEntry
        Name={diary.Name}
        Destination={diary.Countries}
        Type={getKeyByValue(TripTypeEnum, tripType)}
        CoverPhoto={diary.CoverPhotoUrl}
        Id={diary.Id}
        Writer={diary.Writer.UserName}
        Views={diary.ViewCount}
      />
    );
  };

  GetDiariesByOrder = valueOrder => {
    var caller = new TripMeHttpClient();
    var request = {
      SearchParameters: {},
      OrderBy: valueOrder,
      ResultLimit: 3
    };
    return caller.getDiariesBySearch(request);
  };

  componentDidMount() {
    this.GetDiariesByOrder(OrderDiaries.MOST_RECENT).then(
      MostRecentResponse => {
        this.GetDiariesByOrder(OrderDiaries.MOST_VIEWED).then(
          MostViewedResponse => {
            this.setState({
              DiariesMostViewed: MostViewedResponse,
              DiariesMostRecent: MostRecentResponse,
              ShowLoader: false
            });
          }
        );
      }
    );
  }

  renderDiaries = diaries => {
    return (
      <div className="row">
        {diaries.map(diary => {
          return <div className="col-4 p-3">{this.renderDiary(diary)}</div>;
        })}
      </div>
    );
  };

  render() {
    if (this.state.ShowLoader) {
      return <AppLoader />;
    }
    return (
      <div>
        <div className="diaries-carousel">
          <CarouselNavigator />
        </div>
        <hr />
        <div className="home-body container">
          <div className="row featurette dataView">
            <div className="col md-7">
              <h2>Build your own trip diary!</h2>
              <span className="text-muted">
                {" "}
                use our templates for reviews or create your own! manage your
                existing diaries, comment and answer the community!{" "}
              </span>
              <Button className="btn btn-info" href={this.AddNewDiaryLink}>
                Create Your Diary Now!
              </Button>
            </div>
            <div className="col md-5">
              <img
                className="info-image img-fluid mx-auto"
                src={GlassesBooksImage}
              />
            </div>
          </div>
          <hr></hr>
          <div className="most-viewed">
            <h2>Most Viewed</h2>
            {this.renderDiaries(this.state.DiariesMostViewed)}
            <hr />
          </div>
          <div className="row featurette dataView">
            <div className="col md-7">
              <div className="row">
                <div className="col-12">
                  <h2>Plan your own trip!</h2>
                  <span className="text-muted">
                    {" "}
                    having trouble with planning a trip? No More !! Now with
                    TripMe you can search your desired trip by Budget, Time,
                    Duration and even By trip type!{" "}
                  </span>
                </div>
                <div className="col-12">
                  <Button
                    href={this.SearchLink}
                    type="button"
                    className="btn btn-info"
                  >
                    Click here and search your desired trip!
                  </Button>
                </div>
              </div>
            </div>
            <div className="col md-5">
              <img className="info-image img-fluid mx-auto" src={PlanImage} />
            </div>
          </div>
          <hr />
          <div className="most-recent">
            <h2>Most Recent</h2>
            {this.renderDiaries(this.state.DiariesMostRecent)}
          </div>
          <hr />
          <div className="row featurette dataView">
            <div className="col md-7">
              <div className="row">
                <div className="col-12">
                  <h2>Travel around the world!</h2>
                  <span className="text-muted">
                    {" "}
                    Do whatever you like at your own pace, budget and company
                    and don't forget to document it! already have an account?
                    login here!{" "}
                  </span>
                </div>
                <div className="col-12">
                  <Button
                    href={this.LoginLink}
                    type="button"
                    className="btn btn-info"
                  >
                    Click here for login!
                  </Button>
                </div>
              </div>
            </div>
            <div className="col md-5">
              <img className="info-image img-fluid mx-auto" src={TravelImg} />
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    );
  }
}

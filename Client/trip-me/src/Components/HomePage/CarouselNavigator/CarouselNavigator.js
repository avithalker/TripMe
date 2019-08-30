import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExtreamRecommendationImg from "../../../sources/images/extream-recommendation.jpg";
import CouplesRecommnedation from "../../../sources/images/recommendation-couples.jpg";
import FamilyRecommnedation from "../../../sources/images/family-recommendation.jpg";
import RoadTripRecommnedation from "../../../sources/images/roadtrip-recommendation.jpg";
import TripMeLogo from "../../../sources/images/TripMeLogo.PNG";
import "../CarouselNavigator/CarouselNavigator.css";
import { Button } from "react-bootstrap";

export default class CarouselNavigator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel className="bg-light">
        <Carousel.Item>
          <Carousel.Caption>
            <img className="logo-image" src={TripMeLogo} />
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption className="text-left">
            <div className="row">
              <div className="col-7">
                <h4>Jonathan Metzger said:</h4>
                <p>
                  "Awsome Website! Me and my wife wanted to plan our honeymoon
                  and by exploring and searching thousends of honeymoon diaries
                  here in TripMe, we found the exact trip which match our
                  desired location, budget and facilities!"
                </p>
              </div>
              <div className="col-5">
                <img className="carousel-image" src={CouplesRecommnedation} />
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption className="text-left">
            <div className="row">
              <div className="col-7">
                <h4>Jessie Legend described:</h4>
                <p>
                  "I had a dream doing Road Trip in Island, but it was difficult
                  to me finding the locations i would find them attractive. so i
                  search road trips in island and i found lots of beautiful
                  locations in lots of diaries here! Thank you TripMe you are
                  the best!!"
                </p>
              </div>
              <div className="col-5">
                <img className="carousel-image" src={RoadTripRecommnedation} />
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption className="text-left">
            <div className="row">
              <div className="col-7">
                <h4>Joe Steward Said:</h4>
                <p>
                  "Thank you TripMe for giving me the best way for documenting
                  my family trip! all our memories together are saved here and
                  we can remember what we did in each day of the trip! "
                </p>
              </div>
              <div className="col-5">
                <img className="carousel-image" src={FamilyRecommnedation} />
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption className="text-left">
            <div className="row">
              <div className="col-7">
                <h4>Dolev Domot from Israel Said:</h4>
                <p>
                  "As a person who loves extream, i found lots of people here in
                  TripMe that Extream is their second name. together we
                  travelled in Alaska with the best view ever! Thanks to TripMe
                  we get to know each other while we rated each other's diary"
                </p>
              </div>
              <div className="col-5">
                <img
                  className="carousel-image"
                  src={ExtreamRecommendationImg}
                />
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

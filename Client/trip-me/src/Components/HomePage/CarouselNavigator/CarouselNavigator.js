import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import NoCoverImag from "../../../sources/images/image-placeholder.png";
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
            <h1>Hello There! Welcome to TripMe!</h1>
            <h3>Commercial Website for travelers</h3>
            <p>Not a Memeber yet? sign up for free!!</p>
            <Button href="" className="btn btn-secondary">
              SignUp
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

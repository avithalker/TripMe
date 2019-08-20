import { Component } from "react";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import NoCoverImag from "../../../sources/images/No_Cover.jpg";

export default class DiaryCarousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="diary-image d-block w-100"
            src={NoCoverImag}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="diary-image d-block w-100"
            src={NoCoverImag}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="diary-image d-block w-100"
            src={NoCoverImag}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

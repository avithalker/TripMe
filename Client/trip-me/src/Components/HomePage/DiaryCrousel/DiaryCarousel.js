import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import NoCoverImag from "../../../sources/images/image-placeholder.png";
import "./DiaryCarousel.css";
import { Button } from "react-bootstrap";

export default class DiaryCarousel extends Component {
  constructor(props) {
    super(props);
  }

  fullDiaryUrl = "http://localhost:3000/#/ShowDiary?Id=";

  renderDiariesInCarousel = () => {
    var diaries = this.props.diaries.map(diary => {
      var diaryUrl = this.fullDiaryUrl + diary.Id;
      return (
        <Carousel.Item>
          <img
            className="diary-image d-block w-100"
            src={this.getCoverImage(diary)}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{diary.Name}}</h3>
            <p>{diary.Description}</p>
            <Button href={diaryUrl} className="btn btn-primary">
              Show Diary
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    return diaries;
  };

  getCoverImage = diary => {
    if (diary.CoverPhotoUrl === null || diary.CoverPhotoUrl === "") {
      return NoCoverImag;
    }
    return diary.CoverPhotoUrl;
  };

  render() {
    return <Carousel>{this.renderDiariesInCarousel()}</Carousel>;
  }
}

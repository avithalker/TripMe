import { Component } from "react";
import React from "react";
import DiaryCarousel from "./DiaryCrousel/DiaryCarousel";
import "../HomePage/HomePage.css";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="diaries-carousel">
        <h1>Carousel</h1>
        <DiaryCarousel />
      </div>
    );
  }
}

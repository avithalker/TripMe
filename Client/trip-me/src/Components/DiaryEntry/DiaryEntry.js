import React, { Component } from "react";
import "./DiaryEntry.css";
import DiaryFullView from "../DiaryFullView/DiaryFullView";
import Button from "react-bootstrap/Button";
import NoCoverImag from "../../sources/images/No_Cover.jpg";
import "./DiaryEntry.css";

class DiaryEntry extends Component {
  constructor(props) {
    super(props);
  }

  fullDiaryUrl = "http://localhost:3000/#/ShowDiary?Id=" + this.props.Id;

  render() {
    return (
      <div className="card-header">
        <img src={this.getCoverImage()} alt="" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{this.props.Name}</h5>
          <p className="card-text">
            <li>
              <h7 className="property">Destination:</h7>{" "}
              {this.props.Destination}
            </li>
            <li>
              <h7 className="property">Type:</h7> {this.props.Type}{" "}
            </li>
            <li>
              <h7 className="property">Writer:</h7> {this.props.Writer}{" "}
            </li>
          </p>
          <Button href={this.fullDiaryUrl} className="btn btn-secondary">
            Watch Diary
          </Button>
        </div>
      </div>
    );
  }

  getCoverImage = () => {
    if (this.props.CoverPhoto === null || this.props.CoverPhoto === "") {
      return NoCoverImag;
    }
    return this.props.CoverPhoto;
  };
}

export default DiaryEntry;

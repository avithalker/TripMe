import React, { Component } from "react";
import "./DiaryEntry.css";

class DiaryEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "sahar's diary",
      Destination: "Italy",
      Type: "HoneyMoon",
      Writer: "Sahar",
      ImageURL: "/images/sahar.jpg"
    };
  }

  render() {
    return (
      <div className="card">
        <img src={this.props.ImageURL} className="card-img-top" />
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
          <a href="#" className="btn btn-primary">
            Show Diary
          </a>
        </div>
      </div>
    );
  }
}

export default DiaryEntry;
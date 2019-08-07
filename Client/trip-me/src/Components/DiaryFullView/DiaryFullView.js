import React from "react";
import { Component } from "react";

class DiaryFullView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Diary Name</h1>
            <p className="lead">
              this is the description of the diary its a very very very very
              very long descriptioon
            </p>
            <div className="row p-3">
              <div className="col sm-3">Countries: </div>
              <div className="col sm-3">Trip Type:</div>
              <div className="col sm-3">Start Date:</div>
              <div className="col sm-3">End Date:</div>
              <div className="col sm-3">Approximate Price:</div>
              <div className="col sm-3">Number of travelers:</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DiaryFullView;

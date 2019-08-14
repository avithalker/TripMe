import React from "react";
import { Component } from "react";
import { Card, CardBody } from "reactstrap";

export default class DiaryAdditionalData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Trip Type:</p>
                </div>
                <div className="col-6">
                  <p>HoneyMoon</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Start Date:</p>
                </div>
                <div className="col-6">
                  <p>12.08.2019</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">End Date:</p>
                </div>
                <div className="col-6">
                  <p>13.08.19</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Approximate Price:</p>
                </div>
                <div className="col-6">
                  <p>54540</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Travelers Count:</p>
                </div>
                <div className="col-6">
                  <p>5</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Description:</p>
                </div>
                <div className="col-6">
                  <p>sadasdlsdkslkdslkdlasd</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Countries:</p>
                </div>
                <div className="col-6">
                  <p>Australia, Belgium</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

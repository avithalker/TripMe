import React, { Component } from "react";

export default class MinMaxField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.FieldTitle}</label>
        <div className="row">
          <div className="col-4">
            <input
              className="form-control"
              type="number"
              onChange={this.props.OnChange}
              name={this.props.FieldNameMin}
            />
          </div>
          <div className="col-1 p-0">
            <label>To:</label>
          </div>
          <div className="col-4">
            <input
              className="form-control"
              type="number"
              onChange={this.props.OnChange}
              name={this.props.FieldNameMax}
            />
          </div>
        </div>
      </div>
    );
  }
}

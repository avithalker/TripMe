import React, { Component } from "react";

export default class SingleSelectorField extends Component {
  constructor(props) {
    super(props);
  }

  renderOptions = () => {
    var types = Object.entries(this.props.Options).map(([key, value]) => {
      return <option value={value}>{key.toString()}</option>;
    });
    return types;
  };
  render() {
    return (
      <div class="form-group">
        <label for="inputState">{this.props.FieldTitle}</label>
        <select
          id="inputState"
          class="form-control"
          onChange={this.props.OnChange}
          name={this.props.FieldName}
        >
          <option selected>{this.props.DefaultSelected}</option>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}

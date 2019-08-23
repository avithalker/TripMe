import React, { Component } from "react";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";
export default class MultiSelectorField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>{this.props.FieldTitle}</label>
        <Multiselect data={this.props.Options} onChange={this.props.OnChange} />
      </div>
    );
  }
}

import React, { Component } from "react";
import { ReviewFieldType } from "../../Enums/ReviewFieldTypeEnum.js";
import RatingField from "../RatingField/RatingField.js";
import "./ReviewField.css";
import { id } from "date-fns/esm/locale";

class ReviewField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DisplayText: this.adjustDisplayText(props.DisplayText),
      onFieldValueChanged: props.onFieldValueChanged
    };
  }

  render() {
    return (
      <div className="row reviewField">
        <div className="col-md-4">
          <div className="fieldText">{this.state.DisplayText}</div>
        </div>
        <div className="col-md-8 input-group-sm">{this.Field()}</div>
      </div>
    );
  }

  adjustDisplayText = displayText => {
    if (displayText && displayText !== "") {
      return displayText + ":";
    }

    return "";
  };

  Field = () => {
    debugger;
    switch (this.props.FieldTypeId) {
      case ReviewFieldType.INPUT_TEXT: {
        if (!this.props.EditMode) {
          return <label>{this.props.Answer}</label>;
        }
        return (
          <input
            type="text"
            className="form-control"
            onChange={this.onInputFieldChanged}
          />
        );
      }
      case ReviewFieldType.INPUT_RANK: {
        if (!this.props.EditMode) {
          return <RatingField EditMode={false} Answer={this.props.Answer} />;
        }
        return (
          <RatingField
            EditMode={true}
            onRatingValueChanged={this.onRatingValueChanged}
          />
        );
      }
      case ReviewFieldType.INPUT_MULTILINE_TEXT: {
        return (
          <input
            type="text"
            className="form-control"
            onChange={this.onInputFieldChanged}
          />
        );
      }
      case ReviewFieldType.NUMBER: {
        if (!this.props.EditMode) {
          return <label>{this.props.Answer}</label>;
        }
        return (
          <input
            type="number"
            className="form-control"
            onChange={this.onInputFieldChanged}
          />
        );
      }
    }
  };

  onInputFieldChanged = event => {
    this.state.onFieldValueChanged(event.target.value);
  };

  onRatingValueChanged = ratingValue => {
    this.state.onFieldValueChanged(ratingValue);
  };
}

export default ReviewField;

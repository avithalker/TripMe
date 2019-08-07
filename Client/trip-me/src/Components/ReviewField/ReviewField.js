import React, { Component } from "react";
import { ReviewFieldType } from "../../Enums/ReviewFieldTypeEnum.js";
import RatingField from "../RatingField/RatingField.js";
import "./ReviewField.css";

class ReviewField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      FieldTypeId: props.FieldTypeId,
      DisplayText: this.adjustDisplayText(props.DisplayText),
      onFieldValueChanged: props.onFieldValueChanged
    };

    this.onInputFieldChanged = this.onInputFieldChanged.bind(this);
    this.onRatingValueChanged = this.onRatingValueChanged.bind(this);
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
    switch (this.state.FieldTypeId) {
      case ReviewFieldType.INPUT_TEXT: {
        return (
          <input
            type="text"
            className="form-control"
            onChange={this.onInputFieldChanged}
          />
        );
      }
      case ReviewFieldType.INPUT_RANK: {
        return <RatingField onRatingValueChanged={this.onRatingValueChanged} />;
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

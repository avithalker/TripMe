import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import StarRatingComponent from "react-star-rating-component";
import "./RatingField.css";

class RatingField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      onRatingValueChanged: props.onRatingValueChanged
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating, name) {
    this.state.onRatingValueChanged(newRating);
    this.setState({
      rating: newRating
    });
  }

  render() {
    if (!this.props.EditMode) {
      return (
        <div className="rating-stars">
          <StarRatingComponent
            editing={false}
            startCount={5}
            value={this.props.Answer}
          />
        </div>
      );
    }
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="gold"
        starHoverColor="gold"
        starEmptyColor="gray"
        changeRating={this.changeRating}
        starDimension="20px"
        numberOfStars={5}
        name="rating"
        editing={this.props.EditMode}
      />
    );
  }
}

export default RatingField;

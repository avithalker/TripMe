import React from "react";
import { Component } from "react";
import CreatePage from "../CreatePage/CreatePage";
import queryString from "query-string";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import { Button } from "react-bootstrap";

class DiaryFullView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false,
      diary: null,
      isLoading: true
    };
  }

  componentDidMount() {
    var values = queryString.parse(this.props.location.search);
    var caller = new TripMeHttpClient();

    caller.getDiaryById(values.Id).then(response => {
      this.setState({ diary: response, isLoading: false });
    });
  }

  addPage = () => {
    this.setState({ addPage: true });
  };

  render() {
    debugger;
    if (this.state.isLoading) {
      return <AppLoader />;
    }
    if (this.state.addPage) {
      return <CreatePage diaryId={this.state.diary.Id} />;
    }
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">{this.state.diary.Name}</h1>
            <p className="lead">{this.state.diary.Description}</p>
            <div className="row p-3">
              <div className="col sm-3">
                Countries: {this.state.diary.Countries}
              </div>
              <div className="col sm-3">
                Trip Type: {this.state.diary.TripType}
              </div>
              <div className="col sm-3">
                Start Date: {this.state.diary.StartDate}
              </div>
              <div className="col sm-3">
                End Date: {this.state.diary.EndDate}
              </div>
              <div className="col sm-3">
                Approximate Price: {this.state.diary.ApproximatePrice}
              </div>
              <div className="col sm-3">
                Number of travelers: {this.state.diary.TravelersCount}
              </div>
            </div>
          </div>
        </div>
        <div className="addPageButton">
          <Button onClick={this.addPage}>Add New Page</Button>
        </div>
      </div>
    );
  }
}
export default DiaryFullView;

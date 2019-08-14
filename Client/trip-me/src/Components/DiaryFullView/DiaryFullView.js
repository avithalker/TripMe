import React from "react";
import { Component } from "react";
import CreatePage from "../CreatePage/CreatePage";
import queryString from "query-string";
import TripMeHttpClient from "../../Services/TripMeHttpClient";
import AppLoader from "../Shared/AppLoader/AppLoader";
import { Button } from "react-bootstrap";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Collapse from "react-bootstrap/Collapse";
import IconButton from "@material-ui/core/IconButton";
import DiaryAdditionalData from "../DiaryAdditionalData/DiaryAdditionalData";
import { Card, CardBody } from "reactstrap";
import "../DiaryFullView/DiaryFullView.css";

class DiaryFullView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false,
      diary: null,
      isLoading: true,
      ShowDiaryData: false
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
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-12">
                <h4>{this.state.diary.Name}</h4>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-2">
                    <IconButton size="small">
                      <ArrowDownwardIcon
                        fontSize="inherit"
                        aria-controls="additional-diary-data"
                        aria-expanded={this.state.ShowDiaryData}
                        onClick={() => {
                          this.setState({
                            ShowDiaryData: !this.state.ShowDiaryData
                          });
                        }}
                      />
                    </IconButton>
                  </div>
                  <div className="col-6">
                    <label>More info...</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Collapse in={this.state.ShowDiaryData}>
            <div className="card-header diary-additional-container">
              <DiaryAdditionalData />
            </div>
          </Collapse>
        </div>
        <div className="addPageButton">
          <Button onClick={this.addPage}>Add New Page</Button>
        </div>
      </div>
    );
  }

  ShowDiaryData = () => {};
}
export default DiaryFullView;

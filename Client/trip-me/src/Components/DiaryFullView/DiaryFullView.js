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
import DiaryPage from "../ShowDiaryPage/DiaryPage";
import Paginator from "../Shared/Paginator/Paginator";

class DiaryFullView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPage: false,
      diary: null,
      isLoading: true,
      ShowDiaryData: false
      //pages: null
    };
  }

  componentDidMount() {
    var values = queryString.parse(this.props.location.search);
    var caller = new TripMeHttpClient();

    caller.getDiaryById(values.Id).then(response => {
      this.setState({ diary: response, isLoading: false });
    });

    // if(pages == null)
    // {
    //   caller.getPages()
    // }
  }

  addPage = () => {
    this.setState({ addPage: true });
  };

  ShowSelectedPage = pageNumber => {};

  render() {
    debugger;
    if (this.state.isLoading) {
      return <AppLoader />;
    }
    if (this.state.addPage) {
      return <CreatePage diaryId={this.state.diary.Id} />;
    }
    return (
      <div className="diary">
        <div className="row">
          <div className="col-2 p-2">
            <h2>Diary Name</h2>
          </div>
          <div className="col-12">
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
            <div className="col-2">
              <label>More info...</label>
            </div>
            <Collapse in={this.state.ShowDiaryData}>
              <div className="card-header diary-additional-container">
                <DiaryAdditionalData />
              </div>
            </Collapse>
          </div>
        </div>
        <div className="pages">
          <div className="row justify-content-between">
            <div className="col mr-auto p-2">
              <h4>Diary Pages:</h4>
            </div>
            <div className="col-auto">
              <div className="addPageButton">
                <Button variant="success" onClick={this.addPage}>
                  + Add New Page
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <div className="page shadow p-2 mb-3 bg-white rounded">
            <DiaryPage PageId={40} DiaryId={40} />
          </div>
          <hr />
          <div className="Paginator">
            <Paginator numOfItems={5} OnSelect={this.ShowSelectedPage} />
          </div>
        </div>
      </div>
    );
  }

  ShowDiaryData = () => {};
}
export default DiaryFullView;

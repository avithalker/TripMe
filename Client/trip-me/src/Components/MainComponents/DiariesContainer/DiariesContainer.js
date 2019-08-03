import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DiaryEntry from "../../DiaryEntry/DiaryEntry";
import TripMeHttpClient from "../../../Services/TripMeHttpClient.js";
import TripTypeEnum from "../../../Enums/TripTypeEnum.js";

export default class DiariesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Diaries: []
    };
  }

  GetDiaries = () => {
    debugger;
    var caller = new TripMeHttpClient();
    return caller.getDiariesByUser();
  };

  componentDidMount() {
    debugger;
    if (this.state.Diaries.length == 0) {
      this.GetDiaries().then(response => {
        this.setState({ Diaries: response });
      });
    }
  }

  renderDiary = diary => {
    var tripType = diary.TripType + 1;
    debugger;
    return (
      <DiaryEntry
        Name={diary.Name}
        Destination={diary.Countries}
        Type={TripTypeEnum[tripType]}
      />
    );
  };

  renderDiaries = () => {
    debugger;
    if (this.state.Diaries.length == 0) {
      return <DiaryEntry />;
    }
    return this.state.Diaries.map(diary => {
      return this.renderDiary(diary);
    });
  };

  // renderDiaries = () => {
  //   var size = this.state.Diaries.length;
  //   var startIndex = 0;
  //   var endIndex = 3;
  //   var subArray = this.state.Diaries.slice(0, 3);
  //   var diariesView = [];
  //   var diaryRender;

  //   while (endIndex <= size) {
  //     subArray = this.state.Diaries.slice(startIndex, endIndex);
  //     diaryRender = subArray.map(diary => {
  //       return <col>{this.renderDiary(diary)}</col>;
  //     });
  //     diariesView.push(<row>{diaryRender}</row>);
  //     startIndex = startIndex + 3;
  //     endIndex = endIndex + 3;
  //   }
  //   debugger;
  //   return diariesView;
  // };

  render() {
    return <div>{this.renderDiaries()}</div>;
  }
}

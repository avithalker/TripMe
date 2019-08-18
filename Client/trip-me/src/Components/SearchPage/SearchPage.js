import React, { Component } from "react";
import SearchEngine from "./SearchEngine/SearchEngine";
import "./SearchPage.css";
import DiaryEntry from "../DiaryEntry/DiaryEntry";
import TripTypeEnum from "../../Enums/TripTypeEnum";
import { getKeyByValue } from "../../Helpers/Helpers";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaries: null
    };
  }

  SetDiaries = response => {
    this.setState({ diaries: response });
  };

  renderDiary = diary => {
    return (
      <DiaryEntry
        Name={diary.Name}
        Destination={diary.Countries}
        Type={getKeyByValue(TripTypeEnum, diary.TripType)}
        Id={diary.Id}
        CoverPhoto = {diary.CoverPhotoUrl}
      />
    );
  };

  RenderDiaries = () => {
    if (this.state.diaries == null) return;
    var diaries = (
      <div className="row">
        {this.state.diaries.map(diary => {
          return <div className="col-4 p-3">{this.renderDiary(diary)}</div>;
        })}
      </div>
    );
    return diaries;
  };

  render() {
    return (
      <div>
        <SearchEngine UpdateResultsOnScreen={this.SetDiaries} />
        {this.RenderDiaries()}
      </div>
    );
  }
}

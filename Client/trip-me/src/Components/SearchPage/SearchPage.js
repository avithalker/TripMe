import React, { Component } from "react";
import SearchEngine from "./SearchEngine/SearchEngine";
import "./SearchPage.css";
import DiaryEntry from "../DiaryEntry/DiaryEntry";
import TripTypeEnum from "../../Enums/TripTypeEnum";
import { getKeyByValue } from "../../Helpers/Helpers";
import AppLoader from "../Shared/AppLoader/AppLoader";
import PopUp from "../Shared/Popup";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaries: null,
      isLoading: false
    };
  }

  SetDiaries = response => {
    if(response == null)
    {
      this.setState({diaries: []});
    }
    else
    {
      this.setState({ diaries: response, isLoading: false });
    }
  };

  renderDiary = diary => {
    return (
      <DiaryEntry
        Name={diary.Name}
        Writer = {diary.Writer.UserName}
        Destination={diary.Countries}
        Type={getKeyByValue(TripTypeEnum, diary.TripType)}
        Id={diary.Id}
        CoverPhoto={diary.CoverPhotoUrl}
        Views={diary.ViewCount}
      />
    );
  };

  RenderDiaries = () => {
    if (this.state.isLoading) {
      return <AppLoader></AppLoader>;
    }
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

  SetOnFetchDiariesState = () => {
    this.setState({ isLoading: true });
  };

  ClosePopUp = () => {
    this.setState({diaries: null, isLoading: false});
  }

  ShowPopUpByState = () => {
    if(this.state.diaries != null && this.state.diaries.length==0)
    {
      return <PopUp popupTitle="Sorry..." popupText="We cannot find diaries that match to your search :/ "  enableCloseIcon={true} onClose={this.ClosePopUp}></PopUp>
    }
    return null;
  }
  render() {
    return (
      <div className="container">
        {this.ShowPopUpByState()}
        <SearchEngine
          UpdateResultsOnScreen={this.SetDiaries}
          OnFetchDiaries={this.SetOnFetchDiariesState}
        />
        {this.RenderDiaries()}
      </div>
    );
  }
}

import React, { Component } from "react";
import SearchEngine from "./SearchEngine/SearchEngine";
import "./SearchPage.css";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaries: null
    };
  }

  render() {
    return (
      <div>
        <SearchEngine />
      </div>
    );
  }
}

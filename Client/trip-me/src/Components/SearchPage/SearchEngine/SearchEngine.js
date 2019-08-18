import React, { Component } from "react";
import "../SearchEngine/SearchEngine.css";
import SingleSelectorField from "../SearchFields/SingleSelectorField/SingleSelectorField";
import MultiSelectorField from "../SearchFields/MultiSelectorField/MultiSelectorField";
import {
  TripTypesOptions,
  CountriesOptions,
  MonthOptions,
  ContinentOptions
} from "../../../Constants/Constants";
import MinMaxField from "../SearchFields/MinMaxField/MinMaxFIeld";
import { Button } from "@material-ui/core";
import TripMeHttpClient from "../../../Services/TripMeHttpClient";

export default class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: null
    };
  }

  OnCountriesChange = countries => {
    var countriesForState = [];
    for (var i = 0; i < countries.length; i++) {
      countriesForState.push(CountriesOptions[countries[i]]);
    }

    this.setState({ Countries: countriesForState });
  };

  OnChangeInput = event => {
    debugger;
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  SubmitSearch = () => {
    var request = this.CreateRequstForSearch();
    var caller = new TripMeHttpClient();

    caller.getDiariesBySearch(request).then(response => {
      debugger;
      this.props.UpdateResultsOnScreen(response);
    });
  };

  CreateRequstForSearch = () => {
    debugger;
    var request = { SearchParameters: {}, OrderBy: 1, ResultLimit: 5 };

    if (this.state.Countries != null && this.state.Countries.length > 0) {
      request.SearchParameters[2] = this.state.Countries;
    }
    if (this.state.TripType != null && this.state.TripType !== "") {
      request.SearchParameters[4] = this.state.TripType;
    }
    if (this.state.PriceMin != null && this.state.PriceMax != null) {
      request.SearchParameters[6] = [this.state.PriceMin, this.state.PriceMax];
    }
    if (
      this.state.NumOfTravelersMin != null &&
      this.state.NumOfTravelersMax != null
    ) {
      request.SearchParameters[5] = [
        this.state.NumOfTravelersMin,
        this.state.NumOfTravelersMax
      ];
    }
    if (this.state.DurationMin != null && this.state.DurationMax != null) {
      request.SearchParameters[8] = [
        this.state.DurationMin,
        this.state.DurationMax
      ];
    }
    if (this.state.Month != null && this.state.Month != "") {
      request.SearchParameters[7] = this.state.Month;
    }
    if (this.state.Continent != null && this.state.Continent != "") {
      request.SearchParameters[1] = this.state.Continent;
    }

    return request;
  };

  render() {
    debugger;
    return (
      <div className="card-header">
        <h4>Search Your desired journey...</h4>
        <div className="row">
          <div className="col-3">
            <MultiSelectorField
              Options={Object.keys(CountriesOptions)}
              OnChange={this.OnCountriesChange}
              FieldTitle="Countries"
            />
          </div>
          <div className="col-3">
            <SingleSelectorField
              Options={TripTypesOptions}
              FieldTitle="Trip Type"
              FieldName="TripType"
              OnChange={this.OnChangeInput}
            />
          </div>
          <div className="col-3">
            <MinMaxField
              FieldTitle="Price:"
              OnChange={this.OnChangeInput}
              FieldNameMin="PriceMin"
              FieldNameMax="PriceMax"
            />
          </div>
          <div className="col-3">
            <MinMaxField
              FieldTitle="Number Of Travelers:"
              OnChange={this.OnChangeInput}
              FieldNameMin="NumOfTravelersMin"
              FieldNameMax="NumOfTravelersMax"
            />
          </div>
          <div className="col-3">
            <MinMaxField
              FieldTitle="Duration:"
              OnChange={this.OnChangeInput}
              FieldNameMin="DurationMin"
              FieldNameMax="DurationMax"
            />
          </div>
          <div className="col-3">
            <SingleSelectorField
              Options={MonthOptions}
              FieldTitle="Month:"
              FieldName="Month"
              OnChange={this.OnChangeInput}
            />
          </div>
          <div className="col-3">
            <SingleSelectorField
              Options={ContinentOptions}
              FieldTitle="Continent:"
              FieldName="Continent"
              OnChange={this.OnChangeInput}
            />
          </div>
        </div>
        <div className="row  align-items-end">
          <div className="col align-self-end">
            <button className="btn btn-secondary" onClick={this.SubmitSearch}>
              Search!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

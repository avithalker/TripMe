import React, { Component } from "react";
import "../SearchEngine/SearchEngine.css";
import SingleSelectorField from "../../Shared/SingleSelectorField/SingleSelectorField";
import MultiSelectorField from "../../Shared/MultiSelectorField/MultiSelectorField";
import {
  TripTypesOptions,
  MonthOptions,
  ContinentOptions
} from "../../../Constants/Constants";
import { CountryCodeDictionary } from "../../../Enums/CountryEnum.js";
import MinMaxField from "../../Shared/MinMaxField/MinMaxFIeld";
import TripMeHttpClient from "../../../Services/TripMeHttpClient";

export default class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: null
    };
  }
    
  OnContinentChange = event=>{
      this.setState({ [event.target.name]: event.target.value});
  }

  OnCountriesChange = countries => {
    var countriesForState = [];
    let countryCodes = Object.keys(CountryCodeDictionary);
    for (var i = 0; i < countries.length; i++) {
      let requiredCountryCode = countryCodes.find(
        code => CountryCodeDictionary[code] === countries[i]
      );
      countriesForState.push(requiredCountryCode);
    }

    this.setState({ Countries: countriesForState });
  };

  OnChangeInput = event => {
      let value = parseInt(event.target.value);
      value = isNaN(value)? null: value
    this.setState({[event.target.name]: value});
  };

  SubmitSearch = () => {
    var request = this.CreateRequstForSearch();
    var caller = new TripMeHttpClient();

    caller.getDiariesBySearch(request).then(response => {
      this.props.UpdateResultsOnScreen(response);
    }).catch((err)=> {
      this.props.UpdateResultsOnScreen(null);
    }
    );
    this.props.OnFetchDiaries();
  };

  CreateRequstForSearch = () => {
    var request = { SearchParameters: {}, OrderBy: 1, ResultLimit: 5 };
      
    if (this.state.Countries != null && this.state.Countries.length > 0) {
      request.SearchParameters[2] = this.state.Countries;
    }
    if (this.state.TripType != null && this.state.TripType !== "") {
      request.SearchParameters[4] = this.state.TripType;
    }
    if (this.state.PriceMin != null && this.state.PriceMax != null) {
        console.log(this.state.PriceMin + " " + this.state.PriceMax)
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
    return (
      <div className="card-header">
        <h4>Search Your desired journey...</h4>
        <div className="row">
          <div className="col-3">
            <MultiSelectorField
              Options={Object.values(CountryCodeDictionary)}
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
              OnChange={this.OnContinentChange}
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

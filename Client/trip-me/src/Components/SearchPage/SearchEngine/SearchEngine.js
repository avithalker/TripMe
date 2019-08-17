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

export default class SearchEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Countries: null
    };
  }

  OnCountriesChange = countries => {
    debugger;
    var countriesForState = [];
    for (var i = 0; i < countries.length; i++) {
      countriesForState.push(CountriesOptions[countries[i]]);
    }

    this.setState({ Countries: countriesForState });
  };

  OnChangeInput = event => {
    debugger;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
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
            <button className="btn btn-primary">Search!</button>
          </div>
        </div>
      </div>
    );
  }
}

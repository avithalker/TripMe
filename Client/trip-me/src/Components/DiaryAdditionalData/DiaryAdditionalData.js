import React from "react";
import { Component } from "react";
import { Card } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CountryCodeDictionary } from "../../Enums/CountryEnum.js";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import CalenderIcon from "@material-ui/icons/Today";
import EndDateIcon from "@material-ui/icons/Update";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import PeopleIcon from "@material-ui/icons/People";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import { getKeyByValue } from "../../Helpers/Helpers";
import TripTypeEnum from "../../Enums/TripTypeEnum";
import "../DiaryAdditionalData/DiaryAdditionalData.css";

export default class DiaryAdditionalData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography color="textSecondary">
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-5">
                      <div className="row p-0">
                        <div className="col-2">
                          <CardTravelIcon></CardTravelIcon>
                        </div>
                        <div className="col-6">
                          <p className="field-text">TripType:</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 p-0">
                      <p className="field-text">
                        {getKeyByValue(
                          TripTypeEnum,
                          this.props.diaryData.TripType
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <CalenderIcon></CalenderIcon>
                        </div>
                        <div className="col-8">
                          <p className="field-text">Start Date:</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      <p className="field-text">
                        {this.getFormattedDate(this.props.diaryData.StartDate)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <EndDateIcon></EndDateIcon>
                        </div>
                        <div className="col-8">
                          <p className="field-text">End Date:</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      <p className="field-text">
                        {this.getFormattedDate(this.props.diaryData.EndDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row top-buffer">
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row p-0">
                        <div className="col-2">
                          <MoneyIcon></MoneyIcon>
                        </div>
                        <div className="col-9">
                          <p className="field-text">Approximate Price:</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      <p className="field-text">
                        {this.props.diaryData.ApproximatePrice}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-2">
                          <PeopleIcon></PeopleIcon>
                        </div>
                        <div className="col-10">
                          <p className="field-text">Number Of Travelers:</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 p-0">
                      <p className="field-text">
                        {this.props.diaryData.TravelersCount}
                      </p>
                    </div>
                  </div>
                </div>{" "}
                <div className="col">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <FlightLandIcon></FlightLandIcon>
                        </div>
                        <div className="col-8">
                          <p className="field-text">Countries:</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      <p className="field-text">
                        {this.getFormattedCountries(
                          this.props.diaryData.Countries
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  getFormattedDate = fullDateString => {
    let dateObj = new Date(fullDateString);
    let formattedDate =
      dateObj.getDate() +
      "/" +
      (dateObj.getMonth() + 1) +
      "/" +
      dateObj.getFullYear();
    return formattedDate;
  };

  getFormattedCountries = countriesCodes => {
    let countriesFullName = [];
    countriesCodes.forEach(code => {
      countriesFullName.push(CountryCodeDictionary[code]);
    });

    return countriesFullName.join();
  };
}

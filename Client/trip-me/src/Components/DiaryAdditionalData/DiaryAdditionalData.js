import React from "react";
import { Component } from "react";
import { Card } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { CountryCodeDictionary } from "../../Enums/CountryEnum.js";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import CalenderIcon from "@material-ui/icons/Today";
import EndDateIcon from "@material-ui/icons/Update";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import PeopleIcon from "@material-ui/icons/People";
import FlightLandIcon from "@material-ui/icons/FlightLand";

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
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <CardTravelIcon></CardTravelIcon>
                        </div>
                        <div className="col-6">TripType:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      {this.props.diaryData.TripType}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <CalenderIcon></CalenderIcon>
                        </div>
                        <div className="col-6">Start Date:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      {this.getFormattedDate(this.props.diaryData.StartDate)}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-7">
                      <div className="row">
                        <div className="col-3">
                          <EndDateIcon></EndDateIcon>
                        </div>
                        <div className="col-8">End Date:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      {this.getFormattedDate(this.props.diaryData.EndDate)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row top-buffer">
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <MoneyIcon></MoneyIcon>
                        </div>
                        <div className="col-6">Approximate Price:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      {this.props.diaryData.ApproximatePrice}
                    </div>
                  </div>
                </div>{" "}
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <PeopleIcon></PeopleIcon>
                        </div>
                        <div className="col-6">Number Of Travelers:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      {this.props.diaryData.TravelersCount}
                    </div>
                  </div>
                </div>{" "}
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <FlightLandIcon></FlightLandIcon>
                        </div>
                        <div className="col-6">Countries:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      {this.getFormattedCountries(
                        this.props.diaryData.Countries
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row top-buffer">
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <CardTravelIcon></CardTravelIcon>
                        </div>
                        <div className="col-6">Name:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">Sahar</div>
                  </div>
                </div>{" "}
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <CardTravelIcon></CardTravelIcon>
                        </div>
                        <div className="col-6">Name:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">Sahar</div>
                  </div>
                </div>{" "}
                <div className="col">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-3">
                          <CardTravelIcon></CardTravelIcon>
                        </div>
                        <div className="col-6">Name:</div>
                      </div>
                    </div>
                    <div className="col-4 p-0">Sahar</div>
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

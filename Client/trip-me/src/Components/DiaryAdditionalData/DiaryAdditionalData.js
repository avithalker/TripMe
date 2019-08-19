import React from "react";
import { Component } from "react";
import { Card, CardBody } from "reactstrap";
import {CountryCodeDictionary} from "../../Enums/CountryEnum.js"

export default class DiaryAdditionalData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <CardBody>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Trip Type:</p>
                </div>
                <div className="col-6">
                  <p>{this.props.diaryData.TripType}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Start Date:</p>
                </div>
                <div className="col-6">
                  <p>{this.getFormattedDate(this.props.diaryData.StartDate)}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">End Date:</p>
                </div>
                <div className="col-6">
                  <p>{this.getFormattedDate(this.props.diaryData.EndDate)}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Approximate Price:</p>
                </div>
                <div className="col-6">
                  <p>{this.props.diaryData.ApproximatePrice}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Travelers Count:</p>
                </div>
                <div className="col-6">
                  <p>{this.props.diaryData.TravelersCount}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Description:</p>
                </div>
                <div className="col-6">
                  <p>{this.props.diaryData.Description}</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <p className="font-weight-bold">Countries:</p>
                </div>
                <div className="col-6">
                  <p>{this.getFormattedCountries(this.props.diaryData.Countries)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
    
    getFormattedDate = fullDateString =>{
        let dateObj = new Date(fullDateString);
        let formattedDate = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
        return formattedDate;      
    }
    
    getFormattedCountries = countriesCodes =>{
        let countriesFullName = [];
        countriesCodes.forEach(code=>{
            countriesFullName.push(CountryCodeDictionary[code]); 
        });
        
       return countriesFullName.join();
    }
    

}

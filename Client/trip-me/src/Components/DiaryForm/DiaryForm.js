import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../DiaryForm/DiaryForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import CloudinaryHttpClient from "../../Services/CloudinaryHttpClient.js";
import ImageUploader from "react-images-upload";
import PopUp from "../Shared/Popup";
import { Redirect } from "react-router";
import DiaryFullView from "../DiaryFullView/DiaryFullView.js";
import AppLoader from "../Shared/AppLoader/AppLoader";
import MultiSelectorField from "../Shared/MultiSelectorField/MultiSelectorField";
import {AuthenticationManager} from "../../Utils/AuthenticationManager.js"
import {CountryCodeDictionary} from "../../Enums/CountryEnum.js";


const authenticationManager = new AuthenticationManager();
const tripMeHttpClient = new TripMeHttpClient();
const cloudinaryHttpClient = new CloudinaryHttpClient();

class DiaryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DiaryName: "",
      Description: "",
      NumberOfTravelers: "",
      StartDate: new Date(),
      EndDate: new Date(),
      ApproximatePrice: "",
      Countries: [],
      TripType: "",
      CoverPhoto: null,
      IsSubmitted: false,
      ShowDiary: false,
      isLoading: false,
      Id: -1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if(!authenticationManager.isUserAuthenticated()){
      return (
        <PopUp
          popupTitle="Hey, you forgot something..."
          textButton="Login"
          popupText="You must login to your account in order to create new diary"
          show={true}
          handleClick={this.RedirectToLogin}
          enableCloseIcon = {false}
        />
      );
    }
    if (this.state.isLoading) {
      return <AppLoader />;
    }
    if (this.state.ShowDiary) {
      this.RedirectToShowDiary();
    }
    if (this.state.IsSubmitted) {
      return (
        <PopUp
          popupTitle="The diary has been created successfully!!"
          textButton="Show Diary"
          popupText="press the button below and see your new diary!"
          handleClick={this.GoToDiary}
          enableCloseIcon = {false}
        />
      );
    }
    return (
      <div className="card diary-root">
        <div className="card-header diary-form">
          <h1>Create Your Diary</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <div className="col-12">
                <label>Diary Name</label>
                <input
                  name="DiaryName"
                  type="text"
                  className="form-control"
                  placeholder="Enter your diary name"
                  onChange={this.onChangeInput}
                  value={this.state.DiaryName}
                />
              </div>
              <div className="col-12">
                <label>Description</label>
                <textarea
                  name="Description"
                  type="text"
                  className="form-control"
                  placeholder="Describe your trip"
                  onChange={this.onChangeInput}
                  value={this.state.Description}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-6">
                <label>Number of travelers</label>
                <input
                  name="NumberOfTravelers"
                  type="text"
                  className="form-control"
                  placeholder="Enter a number"
                  onChange={this.onChangeInput}
                  value={this.state.NumberOfTravelers}
                />
              </div>
              <div className="col-6">
                <label>Approximate Price</label>
                <input
                  name="ApproximatePrice"
                  type="text"
                  className="form-control"
                  placeholder="Enter a price"
                  onChange={this.onChangeInput}
                  value={this.state.ApproximatePrice}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-6">
                <label>From:</label>
                <DatePicker
                  name="StartDate"
                  selected={this.state.StartDate}
                  onChange={this.onStartDateChangeInput}
                />
              </div>
              <div className="col-6">
                <label>To:</label>
                <DatePicker
                  name="EndDate"
                  selected={this.state.EndDate}
                  onChange={this.onEndDateChangeInput}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-6">
                <MultiSelectorField
                  Options={Object.values(CountryCodeDictionary)}
                  OnChange={this.OnCountriesChange}
                  FieldTitle="Countries"
                />
              </div>
              <div className="col-6">
                <label>Trip Type:</label>
                <select
                  className="form-control"
                  name="TripType"
                  value={this.state.TripType}
                  onChange={this.onChangeInput}
                >
                  <option value="-1">NONE</option>
                  <option value="0">SOLO</option>
                  <option value="1">Couples</option>
                  <option value="2">HoneyMoon</option>
                  <option value="3">Family</option>
                  <option value="4">Friends</option>
                  <option value="5">Road Trip</option>
                  <option value="6">Extream</option>
                  <option value="7">Camping</option>
                  <option value="8">Photoshooting</option>
                </select>
              </div>
              <div className="col-12">
                <ImageUploader
                  withIcon={true}
                  buttonText="upload cover photo"
                  onChange={this.onPhotoSelected}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  withPreview={true}
                  singleImage={true}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary create-diary-btn"
              onClick={this.handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }

  RedirectToShowDiary = () => {
    var url = "/ShowDiary?Id=" + this.state.Id;
    this.props.history.push(url);
  };

  RedirectToLogin = ()=>{
      let url = "/LoginPage";
      this.props.history.push(url);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    let coverPhotoUrl = await this.uploadDiaryCoverPhoto();
    var data = {
      NumberOfTravelers: this.state.NumberOfTravelers,
      DiaryName: this.state.DiaryName,
      Description: this.state.Description,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      ApproximatePrice: this.state.ApproximatePrice,
      Countries: this.state.Countries,
      TripType: this.state.TripType,
      CoverPhotoUrl: coverPhotoUrl
    };
    tripMeHttpClient.createNewDiary(data).then(response => {
      this.setState({ IsSubmitted: true, Id: response, isLoading: false });
    });
  }

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onStartDateChangeInput = date => {
    this.setState({ StartDate: date });
  };

  onEndDateChangeInput = date => {
    this.setState({ EndDate: date });
  };

  OnCountriesChange = countries => {
    var countriesForState = [];
    let countryCodes = Object.keys(CountryCodeDictionary);
    for (var i = 0; i < countries.length; i++) {
        let requiredCountryCode = countryCodes.find(code=> CountryCodeDictionary[code] === countries[i]);
        countriesForState.push(requiredCountryCode);
    }

    this.setState({ Countries: countriesForState });
  };

  onPhotoSelected = photoArray => {
    this.setState({
      CoverPhoto: photoArray.length === 0 ? null : photoArray[0]
    });
  };

  uploadDiaryCoverPhoto = () => {
    if (this.state.CoverPhoto === null) {
      return Promise.resolve(null);
    }

    return cloudinaryHttpClient.uploadPhoto(this.state.CoverPhoto);
  };

  GoToDiary = () => {
    this.setState({ ShowDiary: true });
  };
}
export default DiaryForm;

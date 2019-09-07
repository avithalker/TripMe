import React, { Component } from "react";
import "./DiaryEntry.css";
import DiaryFullView from "../DiaryFullView/DiaryFullView";
import Button from "react-bootstrap/Button";
import NoCoverImag from "../../sources/images/No_Cover.jpg";
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
import FlightLandIcon from "@material-ui/icons/FlightLand";
import PersonIcon from "@material-ui/icons/Person";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import CoupleImage from "../../sources/images/travel-image.jpg";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import LikeIcon from "@material-ui/icons/ThumbUp";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import { CountryCodeDictionary } from "../../Enums/CountryEnum.js";

class DiaryEntry extends Component {
  constructor(props) {
    super(props);
  }

  fullDiaryUrl = "http://localhost:3000/#/ShowDiary?Id=" + this.props.Id;

  render() {
    return (
      <Card className="card-diary">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={this.getCoverImage()}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.Name}
            </Typography>
            <Typography color="textSecondary">
              {"By " + this.props.Writer}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <List>
                <ListItem>
                  <ListItemIcon>
                    <FlightLandIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      "Destination:" +
                      this.getFormattedCountries(this.props.Destination)
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Approximate Price:" + this.props.ApproximatePrice}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CardTravelIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Type:" + this.props.Type} />
                </ListItem>
              </List>
            </Typography>
          </CardContent>
          <div className="row justify-content-start likes-and-views">
            <div className="col-sm-2 p-0 like-and-views">
              <LikeIcon></LikeIcon>
              <h7 className="likes-value">432</h7>
            </div>
            <div className="col-sm-2 p-0">
              <RemoveRedEyeIcon></RemoveRedEyeIcon>
              <h7 className="views-value">{this.props.Views}</h7>
            </div>
          </div>
          <hr></hr>
        </CardActionArea>
        <CardActions>
          <Button
            href={this.fullDiaryUrl}
            className="btn btn-info col align-self-end"
          >
            Watch Diary
          </Button>
        </CardActions>
      </Card>
    );
  }

  getFormattedCountries = countriesCodes => {
    let countriesFullName = [];
    countriesCodes.forEach(code => {
      countriesFullName.push(CountryCodeDictionary[code]);
    });

    return countriesFullName.join();
  };

  getCoverImage = () => {
    if (this.props.CoverPhoto === null || this.props.CoverPhoto === "") {
      return NoCoverImag;
    }
    return this.props.CoverPhoto;
  };
}

export default DiaryEntry;

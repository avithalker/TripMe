import React from "react";
import { Component } from "react";
import { Modal } from "react-bootstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TripMeLogo from "../../sources/images/TripMeLogo.png";

class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog open={this.props.show}>
        <DialogTitle id="alert-dialog-title">
          <img className="brand-img pr-4" src={TripMeLogo}></img>
          {this.props.popupTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {this.props.popupText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button color="primary"  onClick={this.props.handleClick}>
        {this.props.textButton}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default PopUp;

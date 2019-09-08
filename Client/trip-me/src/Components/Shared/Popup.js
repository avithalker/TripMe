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
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import "../Shared/PopUp.css";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({open: false});
  };

  SetCloseIcon = () => {
    debugger;
    if(this.props.enableCloseIcon)
    {
      return(      
      <IconButton className="close-button pl-10" aria-label="close" onClick={this.handleClose}>
      <CloseIcon />
    </IconButton>);
    }

    return;
  }

  render() {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle id="alert-dialog-title">
          <img  className="brand-img"src={TripMeLogo}></img>
          {this.props.popupTitle}
          {this.SetCloseIcon()}
        </DialogTitle>
        <DialogContent dividers>
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

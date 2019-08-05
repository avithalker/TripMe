import React from "react";
import { Component } from "react";
import { Modal } from "react-bootstrap";

class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.popupText}</Modal.Body>
        <Modal.Footer>
          <button variant="primary" onClick={this.props.handleClick}>
            {this.props.textButton}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default PopUp;

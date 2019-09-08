import {Component} from 'react';
import React from 'react';
import PopUp from "../Popup";



export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
    }

    DirectToHomePage = () => {
        let url = "/HomePage";
        this.props.history.push(url);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <PopUp enableCloseIcon={false} popupTitle="Something went wrong... :/" popupText="please try again later" 
        handleClick={this.DirectToHomePage} />
      }
      return this.props.children;
    }
  }
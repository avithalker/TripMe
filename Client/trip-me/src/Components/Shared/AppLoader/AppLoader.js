import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./AppLoader.css";

const AppLoader = () => (
  <div className="AppLoader">
    <Loader className="loader" type="ThreeDots" color="#00BFFF" />
  </div>
);

export default AppLoader;

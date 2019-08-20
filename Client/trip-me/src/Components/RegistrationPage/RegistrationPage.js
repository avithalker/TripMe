import React, {Component} from "react";
import "./RegistrationPage.css";

class RegistrationPage extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className = "registration-form-container">
                <h1 className = "display-4">Sign up</h1>
                <p className = "lead">Sign up for free and enjoy all of TripMe features!</p>
                <form>
                    <div className= "form-group row mr-0 ml-0">
                        <input name = "FirstName" placeHolder = "First name" type = "text" className = "form-control col-sm-5"></input>
                        <div className = "col-2"></div>
                        <input name = "LastName" placeHolder = "Last name" type = "text" className = "form-control col-sm-5"></input>
                    </div>
                    <div className = "form-group">
                        <input name = "EmailAddress" placeHolder = "Email address" type = "email" className = "form-control"></input>
                    </div>
                    <div className = "form-group">
                        <input name = "UserName" placeHolder = "User name" type = "text" className = "form-control"></input>
                    </div>
                    <div className = "form-group">
                        <input name = "Password" placeHolder = "Password" type = "password" className = "form-control"></input>
                    </div>
                    <div className = "row mr-0 ml-0">
                        <button type = "submit" className = "btn btn-primary register-btn">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegistrationPage
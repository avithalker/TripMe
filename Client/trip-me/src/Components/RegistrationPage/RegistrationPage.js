import React, {Component} from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import {RegistrationStatus} from "../../Enums/RegistrationStatusEnum.js";
import "./RegistrationPage.css";

class RegistrationPage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            userName: '',
            password: '',
            fieldValidationContext: new FieldValidaitionContext()
        };
    }
    
    render(){
        return(
            <div className = "registration-form-container">
                <h1 className = "display-4">Sign up</h1>
                <p className = "lead">Sign up for free and enjoy all of TripMe features!</p>
                <form>
                    <div className= "form-group row mr-0 ml-0">
                        <input name = "firstName" placeHolder = "First name" type = "text" className = "form-control col-sm-5" onChange = {this.onInputChange}></input>
                        <div className = "col-2"></div>
                        <input name = "lastName" placeHolder = "Last name" type = "text" className = "form-control col-sm-5" onChange = {this.onInputChange}></input>
                    </div>
                    <div className = "form-group">
                        <input name = "emailAddress" placeHolder = "Email address" type = "email" className = "form-control" onChange = {this.onInputChange}></input>
                    </div>
                    <div className = "form-group">
                        <input name = "userName" placeHolder = "User name" type = "text" className = {"form-control" + this.ValidationClass(this.state.fieldValidationContext.UserNameField.isValid)} onChange = {this.onInputChange}></input>
                        <div className = "invalid-feedback">
                            {this.state.fieldValidationContext.UserNameField.errorMessage}
                        </div>
                    </div>
                    <div className = "form-group">
                        <input name = "password" placeHolder = "Password" type = "password" className = {"form-control" + this.ValidationClass(this.state.fieldValidationContext.PasswordField.isValid)} onChange = {this.onInputChange}></input>
                        <div className = "invalid-feedback">
                            {this.state.fieldValidationContext.PasswordField.errorMessage}
                        </div>
                    </div>
                    <div className = "row mr-0 ml-0">
                        <button type = "submit" className = "btn btn-primary register-btn" onClick = {this.TryRegister}>Register</button>
                    </div>
                </form>
            </div>
        );
    }
    
    onInputChange = event =>{
        this.setState({[event.target.name]: event.target.value});
    }
    
    TryRegister = event=>{
        event.preventDefault();
        let registrationRequest = new RegistrationRequest(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.userName, this.state.password);
        let tripMeHttpClient = new TripMeHttpClient();
        
        tripMeHttpClient.register(registrationRequest).then(response=>{
        }).catch(error=>{
            this.HandleRegistrationError(error);
        })
    }
    
    HandleRegistrationError= error => {
        let fieldValidationContext = new FieldValidaitionContext();
        switch(error){
            case RegistrationStatus.TAKEN_USERNAME:{
                fieldValidationContext.UserNameField.isValid = false;
                fieldValidationContext.UserNameField.errorMessage = 'User name is taken';
                break;
            }
            case RegistrationStatus.INVALID_USERNAME:{
                fieldValidationContext.UserNameField.isValid = false;
                fieldValidationContext.UserNameField.errorMessage = 'User name is invalid';
                break;
            }
            case RegistrationStatus.INVALID_PASSWORD:{
                fieldValidationContext.PasswordField.isValid = false;
                fieldValidationContext.PasswordField.errorMessage = 'Invalid password';
                break;
            }
        }
        this.setState({fieldValidationContext: fieldValidationContext})
    }
    
    ValidationClass = isValid =>{
        if(!isValid){
            return ' is-invalid';
        }
        return '';
    }
}

function FieldValidaitionContext(){
    this.UserNameField = {isValid: true, errorMessage:''};
    this.PasswordField = {isValid: true, errorMessage:''};
}


function RegistrationRequest(firstName, lastName, emailAddress, userName, password){ 
    this.FirstName = firstName;
    this.LastName = lastName;
    this.EmailAddress = emailAddress;
    this.UserName =userName;
    this.Password = password;
}

export default RegistrationPage
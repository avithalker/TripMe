import React, {Component} from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import {RegistrationStatus} from "../../Enums/RegistrationStatusEnum.js";
import AppLoader from "../Shared/AppLoader/AppLoader";
import PopUp from "../Shared/Popup";
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
            fieldValidationContext: new FieldValidaitionContext(),
            isWaitingResponse: false,
            isRegistrationDone : false
        };
    }
    
    render(){
        if(this.state.isRegistrationDone){
            return(
                <PopUp popupText={'Congratulation! You are part of the TripMe community! Login to your account and enjoy all of our features'} show={true} 
                    handleClick={this.DirectToLogin} textButton="Login"/>
            )
        }
        if(this.state.isWaitingResponse){
            return (<AppLoader></AppLoader>)
        }
        return(
            <div className = "registration-form-container">
                <h1 className = "display-4">Sign up</h1>
                <p className = "lead">Sign up for free and enjoy all of TripMe features!</p>
                <form>
                    <div className= "form-group row mr-0 ml-0">
                        <input name = "firstName" placeholder = "First name" type = "text" className = "form-control col-sm-5" onChange = {this.onInputChange} value = {this.state.firstName}></input>
                        <div className = "col-2"></div>
                        <input name = "lastName" placeholder = "Last name" type = "text" className = "form-control col-sm-5" onChange = {this.onInputChange} value = {this.state.lastName}></input>
                    </div>
                    <div className = "form-group">
                        <input name = "emailAddress" placeholder = "Email address" type = "email" className = "form-control" onChange = {this.onInputChange} value = {this.state.emailAddress}></input>
                    </div>
                    <div className = "form-group">
                        <input name = "userName" placeholder = "User name" type = "text" className = {"form-control" + this.ValidationClass(this.state.fieldValidationContext.UserNameField.isValid)} onChange = {this.onInputChange} value = {this.state.userName}></input>
                        <div className = "invalid-feedback">
                            {this.state.fieldValidationContext.UserNameField.errorMessage}
                        </div>
                    </div>
                    <div className = "form-group">
                        <input name = "password" placeholder = "Password" type = "password" className = {"form-control" + this.ValidationClass(this.state.fieldValidationContext.PasswordField.isValid)} onChange = {this.onInputChange} value = {this.state.password}></input>
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
        this.setState({isWaitingResponse: true}, ()=>{
        let registrationRequest = new RegistrationRequest(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.userName, this.state.password);
        let tripMeHttpClient = new TripMeHttpClient();
        
        tripMeHttpClient.register(registrationRequest).then(response=>{
            this.setState({isWaitingResponse:false, isRegistrationDone:true})
        }).catch(error=>{
            this.setState({isWaitingResponse: false}, ()=>{
            this.HandleRegistrationError(error);
            });
        })
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
    
    DirectToLogin = ()=>{
        let url='/LoginPage';
        this.props.history.push(url);
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
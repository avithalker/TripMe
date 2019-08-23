import React, {Component} from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import AuthenticationManager from "../../Utils/AuthenticationManager.js"
import "./LoginPage.css";

const authenticationManager = new AuthenticationManager();

class LoginPage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            isCredentialValid: true
        }
    }
    
    render(){
        return(
            <div className = "login-form-container">
                <h1 className = "display-4">Sign in</h1>
                <p className = "lead">Sign in to your TripMe account</p>
                <form>
                    <div className = "form-group">
                        <input name = "userName" placeholder = "User name" type = "text" className = "form-control" onChange ={this.OnInputChanged}></input>
                    </div>
                    <div className = "form-group">
                        <input name = "password" placeholder = "Password" type = "password" className = {"form-control" + this.ValidationClass(this.state.isCredentialValid)} onChange ={this.OnInputChanged}></input>
                        <div className = "invalid-feedback">
                            Wrong User name/Password
                        </div>
                    </div>
                    <div className = "row mr-0 ml-0">
                        <button type = "submit" className = "btn btn-primary login-btn" onClick = {this.TryLogin}>Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
    
    TryLogin = event =>{
        event.preventDefault();
        let loginRequest = new LoginRequest(this.state.userName, this.state.password);
        let tripMeClient = new TripMeHttpClient();
        
        tripMeClient.login(loginRequest).then(userData=>{
            authenticationManager.setAuthenticatedUser(userData);
        }).catch(error =>{
            this.setState({isCredentialValid: false})
        });
    }
    
    ValidationClass = isValid =>{
        if(!isValid){
            return ' is-invalid';
        }
        return '';
    }
    
    OnInputChanged = event=>{
        this.setState({[event.target.name]: event.target.value});
    }
}

function LoginRequest(userName, password){
    this.UserName = userName;
    this.password = password;
}

export default LoginPage;
import React, {Component} from "react";
import "./LoginPage.css";

class LoginPage extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className = "login-form-container">
                <h1 className = "display-4">Sign in</h1>
                <p className = "lead">Sign in to your TripMe account</p>
                <form>
                    <div className = "form-group">
                        <input name = "UserName" placeHolder = "User name" type = "text" className = "form-control"></input>
                    </div>
                    <div className = "form-group">
                        <input name = "Password" placeHolder = "Password" type = "password" className = "form-control"></input>
                    </div>
                    <div className = "row mr-0 ml-0">
                        <button type = "submit" className = "btn btn-primary login-btn">Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;
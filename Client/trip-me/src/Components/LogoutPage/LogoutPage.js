import React, {Component} from "react";
import AppLoader from "../Shared/AppLoader/AppLoader";
import {AuthenticationManager} from "../../Utils/AuthenticationManager.js";

const authenticationManager = new AuthenticationManager();
class LogoutPage extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            isLoggedOut: false
        }    
    }
    
    componentDidMount() {
        this.logoutUser();
    }
    
    render(){
        if(this.state.isLoggedOut)
            {
                this.redirectToHomePage();
                return (null);
            }
        return (<AppLoader></AppLoader>)
    }
    
    logoutUser = ()=>{
        if(authenticationManager.isUserAuthenticated()){
            authenticationManager.resetAuthenticatedUser();
        }
        this.setState({isLoggedOut: true});
    }
    
    redirectToHomePage = ()=>{
        let url = "/HomePage";
        this.props.history.push(url);
    }
}

export default LogoutPage;
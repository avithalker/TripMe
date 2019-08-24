class AuthenticationManager{
    
    setAuthenticatedUser = userData =>{
        localStorage.setItem('AuthenticatedUser',JSON.stringify(userData));
    }
    
    resetAuthenticatedUser = ()=>{
        localStorage.removeItem('AuthenticatedUser');
    }
    
    getAuthenticatedUser = ()=>{
        return JSON.parse(localStorage.getItem('AuthenticatedUser'));
    }
    
    isUserAuthenticated= ()=>{
        let authenticatedUser = this.getAuthenticatedUser();

        if(authenticatedUser){
            return true;
        }
        
        return false;
    }
    
    getAuthenticationHeader= () =>{
        let authenticatedUser = this.getAuthenticatedUser();
        
        if(authenticatedUser && authenticatedUser.Token){
            return {"Authorization": `Bearer ${authenticatedUser.Token}`};
        } else{
            return {};
        }
    }
}

export default AuthenticationManager;
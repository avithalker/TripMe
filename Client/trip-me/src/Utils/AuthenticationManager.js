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
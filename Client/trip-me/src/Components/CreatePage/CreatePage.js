import React, {Component} from 'react';
import './CreatePage.css';

class CreatePage extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <form>
                <div className = 'form-group row'>
                    <input type = 'text' className= 'form-control PageTitle' placeholder = 'Page title'></input>
                </div>
                <div className = 'form-group row'>
                    <textarea className = 'form-control PageContent' placeholder = 'Write your content here...'></textarea>
                </div>
            </form>
        );
    }
}

export default CreatePage;
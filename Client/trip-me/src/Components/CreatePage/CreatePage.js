import React, {Component} from 'react';
import ReviewSelector from '../ReviewSelector/ReviewSelector.js';
import {Collapse} from 'react-collapse';
import './CreatePage.css';

class CreatePage extends Component{
    
    constructor(props){
        super(props);
        this.state = {isReviewSelectorOpen: false}
        this.changeReviewSelectorState = this.changeReviewSelectorState.bind(this);
    }
    
    changeReviewSelectorState = () =>{
        this.setState({isReviewSelectorOpen: !this.state.isReviewSelectorOpen});
    }
    
    render(){
        return(
            <div>
                <div>
                    <form>
                        <div className = 'form-group row'>
                            <input type = 'text' className= 'form-control PageTitle' placeholder = 'Page title'></input>
                        </div>
                        <div className = 'form-group row'>
                            <textarea className = 'form-control PageContent' placeholder = 'Write your content here...'></textarea>
                        </div>
                    </form>
                </div>
                <div className ='div-review-expender'>
                    <div className = 'row'>
                        <Collapse isOpened = {this.state.isReviewSelectorOpen}>
                            <ReviewSelector/>
                        </Collapse>
                    </div>
                    <div className = 'row div-review-expender'>
                        <button type = 'button' className = 'btn btn-success btn-reviews-expender' onClick = {this.changeReviewSelectorState}>+</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePage;
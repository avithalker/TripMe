import React, {Component} from 'react';
import ReviewSelector from '../ReviewSelector/ReviewSelector.js';
import {Collapse} from 'react-collapse';
import ReviewQuestionnaire from '../ReviewQuestionnaire/ReviewQuestionnaire.js';
import './CreatePage.css';

class CreatePage extends Component{
    
    constructor(props){
        super(props);
        this.state = {isReviewSelectorOpen: false,
                     diaryId: props.diaryId,
                     pageTitle: '',
                     pageReviews: []}
        
        this.changeReviewSelectorState = this.changeReviewSelectorState.bind(this);
        this.onReviewSelected = this.onReviewSelected.bind(this);
    }
    
    getPageReviews = () =>{
        const pageReviews = this.state.pageReviews.map((reviewTypeId, index) =>{
            return(
            <div key={index} className = 'row pageReview'>
                <ReviewQuestionnaire ReviewTypeId = {reviewTypeId}/>
            </div>
            );
        });
        
        return pageReviews;
    }
    
    changeReviewSelectorState = () =>{
        this.setState({isReviewSelectorOpen: !this.state.isReviewSelectorOpen});
    }
    
    onReviewSelected = (reviewTypeId) =>{
        this.state.pageReviews.push(reviewTypeId);
        this.setState({});
    }
    
    onPageTitleChange = (event) =>{
        this.setState({pageTitle: event.target.value});
    }
    
    createPageRequest = () =>{
        let request = {DiaryId: this.state.diaryId,
                      Title: this.state.pageTitle}
    }
    
    savePage = (event) =>{
        
    }
    
    render(){
        return(
            <div>
                <div>
                    <form>
                        <div className = 'form-group row'>
                            <input type = 'text' className= 'form-control PageTitle' placeholder = 'Page title' onChange = {this.onPageTitleChange}></input>
                        </div>
                        <div>
                            {this.getPageReviews()}
                        </div>
                        <div className = 'row'>
                            <button className='btn btn-primary' type = 'submit'>Save</button>
                        </div>
                    </form>
                </div>
                <div className ='div-review-expender'>
                    <div className = 'row'>
                        <Collapse isOpened = {this.state.isReviewSelectorOpen}>
                            <ReviewSelector onReviewSelected = {this.onReviewSelected}/>
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
import React, {Component} from 'react';
import ReviewSelector from '../ReviewSelector/ReviewSelector.js';
import {Collapse} from 'react-collapse';
import ReviewQuestionnaire from '../ReviewQuestionnaire/ReviewQuestionnaire.js';
import TripMeHttpClient from '../../Services/TripMeHttpClient.js'
import './CreatePage.css';

const tripMeHttpClient = new TripMeHttpClient();

class CreatePage extends Component{
    
    constructor(props){
        super(props);
        this.state = {isReviewSelectorOpen: false,
                     diaryId: props.diaryId,
                     pageTitle: '',
                     pageReviews: [],
                     nextReviewObjectId : 1}
        
        this.savePage = this.savePage.bind(this);
        this.changeReviewSelectorState = this.changeReviewSelectorState.bind(this);
        this.onReviewSelected = this.onReviewSelected.bind(this);
        this.onQuestionnaireAnswersChanged =this.onQuestionnaireAnswersChanged.bind(this);
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
                            <button className='btn btn-primary' type = 'submit' onClick = {this.savePage}>Save</button>
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
    
    getPageReviews = () =>{
        const pageReviews = this.state.pageReviews.map((pageReview, index) =>{
            return(
            <div key={index} className = 'row pageReview'>
                <ReviewQuestionnaire ReviewTypeId = {pageReview.ReviewType} onQuestionnaireAnswersChanged = {(answers)=> this.onQuestionnaireAnswersChanged(pageReview.objectId, answers)}/>
            </div>
            );
        });
        
        return pageReviews;
    }
    
    changeReviewSelectorState = () =>{
        this.setState({isReviewSelectorOpen: !this.state.isReviewSelectorOpen});
    }
    
    onReviewSelected = (reviewTypeId) =>{
        this.setState((state,props) =>{
            let pageReview = new PageReview(reviewTypeId, state.nextReviewObjectId);
            let pageReviews = [...state.pageReviews];
            pageReviews.push(pageReview);
            return {pageReviews: pageReviews,
                   nextReviewObjectId: state.nextReviewObjectId + 1}
        });
    }
    
    onQuestionnaireAnswersChanged = (objectId, questionnaireAnswers) =>{
        let pageReviews = JSON.parse(JSON.stringify(this.state.pageReviews));
        let pageReview = pageReviews.find(pageReview => pageReview.objectId === objectId);
        pageReview.Answers = questionnaireAnswers;
        this.setState({pageReviews: pageReviews});
    }
    
    onPageTitleChange = (event) =>{
        this.setState({pageTitle: event.target.value});
    }
    
    savePage = (event) =>{
        event.preventDefault();
        let pageReviews = this.state.pageReviews.map(pageReview => {return {ReviewType: pageReview.ReviewType,
                                                                            Answers: pageReview.Answers}});
                                                               
        let createPageRequest = new CreatePageRequest(this.state.diaryId, this.state.pageTitle, pageReviews);
        tripMeHttpClient.addNewPage(createPageRequest);
    }
}

function PageReview(reviewTypeId, objectId){
    this.objectId = objectId; 
    this.ReviewType = reviewTypeId;
    this.Answers = {};
}
    
function CreatePageRequest(diaryId, title, reviews){
    this.DiaryId = diaryId;
    this.Title = title;
    this.Reviews = reviews;
}

export default CreatePage;
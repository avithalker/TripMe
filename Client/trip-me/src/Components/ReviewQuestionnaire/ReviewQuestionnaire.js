import React ,{Component} from 'react';
import TripMeHttpClient from '../../Services/TripMeHttpClient.js';
import ReviewField from '../ReviewField/ReviewField.js'
import './ReviewQuestionnaire.css';

const tripMeHttpClient = new TripMeHttpClient();

class ReviewQuestionnaire extends Component{
    
    constructor(props){
        super(props);     
        this.state = {ReviewTypeId: props.ReviewTypeId,
            questionnaire: []}
        this.fetchQuestionnaire(props.ReviewTypeId);
    }
    
    fetchQuestionnaire = (reviewTypeId) =>{
        tripMeHttpClient.getReviewQuestionnaireById(reviewTypeId).then((reviewQuestionnaire) =>{
           this.setState({questionnaire: reviewQuestionnaire.Fields}); 
        });
    }
    
    QuestionnaireFields = ()=>{
        var fields = this.state.questionnaire.map((field) => {
            return(
                <ReviewField FieldTypeId = {field.FieldTypeId} DisplayText = {field.DisplayText}/>
            );
        });
        return fields;
    }
    
    render(){
        return(
            <div className = "container-fluid">
                {this.QuestionnaireFields()}
            </div>   
        );
    }
}

export default ReviewQuestionnaire;
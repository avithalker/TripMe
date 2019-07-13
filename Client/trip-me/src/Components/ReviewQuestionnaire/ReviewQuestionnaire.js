import React ,{Component} from 'react';
import TripMeHttpClient from '../../Services/TripMeHttpClient.js';
import ReviewField from '../ReviewField/ReviewField.js'
import './ReviewQuestionnaire.css';

const tripMeHttpClient = new TripMeHttpClient();

class ReviewQuestionnaire extends Component{
    
    constructor(props){
        super(props);     
        this.state = {ReviewTypeId: props.ReviewTypeId,
                    questionnaire: [],
                     answers:{},
                     onQuestionnaireAnswersChanged: props.onQuestionnaireAnswersChanged}
        
        this.onAnswerChanged= this.onAnswerChanged.bind(this);
        this.fetchQuestionnaire(props.ReviewTypeId);
    }
    
    render(){
        return(
            <div className = "container-fluid">
                {this.QuestionnaireFields()}
            </div>   
        );
    }
    
    fetchQuestionnaire = (reviewTypeId) =>{
        tripMeHttpClient.getReviewQuestionnaireById(reviewTypeId).then((reviewQuestionnaire) =>{
           this.setState({questionnaire: reviewQuestionnaire.Fields}); 
        });
    }
    
    QuestionnaireFields = ()=>{
        var fields = this.state.questionnaire.map((field,index) => {
            return(
                <ReviewField key={index} FieldTypeId = {field.FieldTypeId} DisplayText = {field.DisplayText} onFieldValueChanged = {answer => this.onAnswerChanged(field.QuestionId,answer)}/>
            );
        });
        return fields;
    }
    
    onAnswerChanged = (fieldId, answer) =>{
        let answers = Object.assign({},this.state.answers);
        answers[fieldId] = answer;
        
        this.setState({answers: answers},()=>{
            this.state.onQuestionnaireAnswersChanged(this.state.answers);
        });
        
    }
}

export default ReviewQuestionnaire;
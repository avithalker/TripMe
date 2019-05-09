import React, {Component} from 'react';
import {ReviewFieldType} from '../../Enums/ReviewFieldTypeEnum.js';
import RatingField from '../RatingField/RatingField.js';
import './ReviewField.css';

class ReviewField extends Component{
    
    constructor(props){
        super(props);
        this.state = {FieldTypeId: props.FieldTypeId,
                     DisplayText: props.DisplayText}
    }
    
    Field = () =>{
        switch(this.state.FieldTypeId)
        {
            case ReviewFieldType.INPUT_TEXT:
                {
                    return(
                        <input type = "text" className = "form-control"></input>
                    );
                }
            case ReviewFieldType.INPUT_RANK:
                {
                    return(
                        <RatingField/>
                    );
                }
            case ReviewFieldType.INPUT_MULTILINE_TEXT:
                {
                    return(
                    <textarea className = "from-control multilineTextReviewField"></textarea>
                    );
                }
        }
    }
    
    render(){
        return(
            <div className = "row reviewField">
                <div className ="col-sm-2">
                    {this.state.DisplayText}: 
                </div>
                <div className = "col-sm-10">
                    {this.Field()}
                </div>
            </div>
        );
    }
}

export default ReviewField;
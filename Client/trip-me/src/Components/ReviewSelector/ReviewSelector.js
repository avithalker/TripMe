import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './ReviewSelector.css'
import TripMeHttpClient from  '../../Services/TripMeHttpClient.js';

const tripMeHttpClient = new TripMeHttpClient();

class ReviewSelector extends Component{
    
    constructor(props){
        super(props);
        this.state = {reviewTypes:[]}
        this.fetchReviewTypes();
    }
    
    render(){
        return(
            <div className = "container-fluid">
                <div className = "row">
                    <ReviewItems reviewTypes ={this.state.reviewTypes}/>
                </div>
            </div>
        );
    }
    
    fetchReviewTypes = () =>{
        tripMeHttpClient.getReviewTypes().then((reviewTypes)=>{
           this.setState({
               reviewTypes: reviewTypes
           }); 
        });
    }
}

const ReviewItems = (props) =>{
    const items = props.reviewTypes.map((reviewType, index) =>{
        return(
            <div key = {reviewType.TypeId} className = "col-sm-4">
                <button type="button" className = "btn btn-primary reviewItemBtn">{reviewType.Description}</button>
            </div>
        );
    });
    return items;
}

export default ReviewSelector;
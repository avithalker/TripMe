import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {getTripType} from '../../Utils/Utils';
import { throws } from 'assert';



export default class DiaryByIdPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            id: '',
            selectedDiary: '',
            isDiarySelected: false
        }
    }

    fetchDiary = () =>
    {
        debugger
        axios.get('http://localhost:1802/DiaryById', {
            params: 
                {
                    id: this.state.id
                }
            }
        ).then(function(response){
            this.setState( {selectedDiary: response.data, isDiarySelected: true});
        }.bind(this));
    }

    onIdChange = (event) =>
    {
       this.setState(
           {id: event.target.value}
       )
    }

    renderDiary = () =>
    {   
        if(this.state.isDiarySelected == true)
        {
            return(
                <div className="card">
                  <div className="w-25 p-3">
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{this.state.selectedDiary.Name}</h5>
                    <p className="card-text">Countries: {this.state.selectedDiary.Countries}</p> 
                    <p className="card-text">Trip Type: {getTripType(this.state.selectedDiary.TripType)}</p>
                    <p className="card-text">Description: {this.state.selectedDiary.Description}</p>
                    <p className="card-text">Start Date: {this.state.selectedDiary.StartDate}</p>
                    <p className="card-text">End Date: {this.state.selectedDiary.EndDate}</p>
                    <p className="card-text">Approximate Price: {this.state.selectedDiary.ApproximateType}</p>
                    <p className="card-text">Number Of Travelers: {this.state.selectedDiary.TravelersCount}</p>
                  </div>
                </div>
                );
        }

        return;
    }

    render()
    {
        return(
            <div>
            <h1>Show A Diary</h1>
            <div className="form-group">
            <label htmlFor='diaryId'>Requested diary ID: </label>
            <input type="text" className="form-control" id="diaryId"  name='id' value={this.state.id} onChange={this.onIdChange} placeholder="insert here your desired diary's ID"/>
            </div>
            <button type="submit" className="btn btn-primary mb-2" onClick={this.fetchDiary}>Show My Diary!</button>
            <div>
                {this.renderDiary()}
            </div>
            </div>

        );
    }


}







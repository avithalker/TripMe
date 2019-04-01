import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';



export default class DiaryByIdPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            id: '',
            selectedDiary: '',
        }
    }

    fetchDiary = () =>
    {
        debugger
        axios.get('http://localhost:65273/DiaryById', {
            params: 
                {
                    id: this.state.id
                }
            }
        ).then(function(response){
            debugger;
            this.setState( {selectedDiary: response.data});
        }.bind(this));
    }

    onIdChange = (event) =>
    {
       this.setState(
           {id: event.target.value}
       )
    }

    render()
    {
        return(
            <div>
            <h1>Show A Diary</h1>
            <div class="form-group">
            <label htmlfor='diaryId'>Requested diary ID: </label>
            <input type="text" class="form-control" id="diaryId"  name='id' value={this.state.id} onChange={this.onIdChange} placeholder="insert here your desired diary's ID"/>
            </div>
            <button type="submit" class="btn btn-primary mb-2" onClick={this.fetchDiary}>Show My Diary!</button>
            </div>
        );
    }


}







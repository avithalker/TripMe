    
import React, { Component } from 'react';
import Countries from './Countries';
import 'bootstrap/dist/css/bootstrap.css';
import '../Diary.css';

class Diary extends Component {

    render(){
        return(
          <div className="container">
              <h1>Diary</h1>
              <form>
              <div class="form-group row">
                <label for="diaryName">Diary Name</label>
                <input class="form-control" id="diaryName" placeholder="Enter your diary name"/>
              </div>
              <div class="form-group row">
                <label for="description">Description</label>
                <input class="form-control" id="description" placeholder="Describe your trip"/>
              </div>
              <div class="form-group row">
                <label class="form-check-label" for="numOfTravelers">Number of travelers</label>
                <input class="form-control" id="numOfTravelers" placeholder="Enter a number"/>
              </div>
              <div class="form-group row">
                <label class="form-check-label" for="countries">Countries</label>
                <Countries />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
             </form>
          </div>
      );
    }
}
export default Diary
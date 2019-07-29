import React, {Component} from 'react';
import './DiaryEntry.css';

class DiaryEntry extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className = 'card DiaryCard'>
                <img src = 'http://www.exotiktours.com/wp-content/uploads/2016/07/de-latlantique-au-pacifique-1-1.jpg?x38764' className ='card-img-top'></img>
                <div className = 'card-body'>
                    <h5 className = 'card-title'>Diary name</h5>
                    <div className = 'row'>
                        <div className = 'col-sm'>
                            Destenation:
                        </div>
                        <div className = 'col-sm'>
                            Costa rica
                        </div>
                    </div>
                    <a href = '#' className = 'btn btn-primary'>View</a>
                </div>
            </div>
        
        );
    }
}

export default DiaryEntry;
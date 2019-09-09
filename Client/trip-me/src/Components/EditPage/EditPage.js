import React, { Component } from "react";
import TripMeHttpClient from "../../Services/TripMeHttpClient.js";
import PopUp from "../Shared/Popup";
import "./EditPage.css";
import PageForm from "../PageForm/PageForm.js";
import queryString from "query-string";
import AppLoader from "../Shared/AppLoader/AppLoader";

export default class EditPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            reviews: null,
            PageEdited: false
        }
    }

    caller = new TripMeHttpClient(); 
    values = queryString.parse(this.props.location.search);
    pageId = this.values.PageId
    diaryId = this.values.DiaryId
    newReviews = []
    updatedReviews = []
    deletedReviews = []
    title = ""
    componentDidMount(){
        debugger;
        this.caller.getPageById(this.diaryId,this.pageId).then((response) => {
            debugger;
            this.setState({reviews: response.Reviews, pageTitle: response.Title});
        });
    }

    CreateRequestForEditPage = ()=>{
        return {DiaryId: this.diaryId, PageId: this.pageId, Title: this.title, NewReviews: this.newReviews
                , UpdatedReviews:this.updatedReviews, DeletedReviews: this.deletedReviews}
    }

    ExistsInReviewsResponse = (review, PageReviews) =>{
        var reviewPageIds = []
        PageReviews.map((pageReview) => {
            reviewPageIds.push(pageReview.ReviewId);
        });

        return reviewPageIds.include(review.ReviewId);
    }

    onEditPageClicked = (response) => {
        this.title = response.title
        response.pageReviews.map((review,i)=>{
            if(review.ReviewId === null)
            {
                this.newReviews.push(review);
            }
            else
            {
                var matchReview = this.state.reviews[review.ReviewId];
                if(this.IsEqual(matchReview.Answers,review.Answers))
                {
                    this.updatedReviews.push(review)
                }
            }
        });

        Object.values(this.state.reviews).map((review,i) => {
            if(this.ExistsInReviewsResponse(review))
            {
                this.deletedReviews.push(review);
            }
        });

        var request = this.CreateRequestForEditPage();
        this.caller.EditPage(request).then((response) =>{
            this.setState({PageEdited: true});
        });
    }

    IsEqual = (a,b) => {
        debugger;
        return JSON.stringify(a) === JSON.stringify(b);
    }

    getPopUpMessage = () => {
        var message = this.state.pageTitle + " Edited Successfully!!";
        return message;
    };

    goToDiary = () => {
        var url = "/ShowDiary?Id=" + this.state.diaryId;
        this.props.history.push(url);
    };

    render(){
        if(this.state.reviews === null)
        {
            return (<AppLoader></AppLoader>);
        }
        if(this.state.PageEdited)
        { 
            return(            <PopUp
                popupTitle = {this.getPopUpMessage()}
                popupText={"Now you can go to your diary and see the edited page!"}
                handleClick={this.goToDiary}
                textButton="Return To Diary"
                enableCloseIcon = {false}
            ></PopUp>);
        }
        return(
        <div><PageForm reviews = {Object.values(this.state.reviews)}
             onSavePageClicked = {this.onEditPageClicked}></PageForm></div>
             );
    }
} 
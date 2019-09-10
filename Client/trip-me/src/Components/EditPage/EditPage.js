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
            PageEdited: false,
            isLoading: false
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
        this.caller.getPageById(this.diaryId,this.pageId).then((response) => {
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

        return reviewPageIds.includes(review.ReviewId);
    }

    GetMatchPageReviewById = (PageReviews, originalReview) => {
        var match;
        PageReviews.map((pageReview, i)=> {
            if(pageReview.ReviewId == originalReview.ReviewId)
            {
                match = pageReview;
            }
        });
        return this.CreateReviewForRequest(match, originalReview.DisplayOrder);
    }

    CreateReviewForRequest = (pageReview, displayOrder) => {
        return {ReviewId: pageReview.ReviewId, ReviewType: pageReview.ReviewType.TypeId, Answers: pageReview.Answers, 
            Caption: pageReview.Caption, PhotoUrl: pageReview.PhotoUrl, DisplayOrder:displayOrder}
    }

    completeEditPage = (response) => {
        this.title = response.pageTitle
        let currentMaxDisplayOrder = 0
        let originalReviews = Object.values(this.state.reviews);
        if(originalReviews.length != 0 )
        {
            currentMaxDisplayOrder = (originalReviews.reduce((review1,review2) => 
                                                     review1.DisplayOrder> review2.DisplayOrder? review1: review2)).DisplayOrder;
        }
        response.pageReviews.map((review,i)=>{
            if(review.ReviewId === null)
            {
                currentMaxDisplayOrder++;
                this.newReviews.push(this.CreateReviewForRequest(review, currentMaxDisplayOrder));
            }
            else
            {
                var matchReview = this.state.reviews[review.ReviewId];
                if(!this.IsEqual(matchReview.Answers,review.Answers) || !this.IsEqual(matchReview.Caption, review.Caption) || !this.IsEqual(matchReview.PhotoUrl, review.PhotoUrl))
                {
                    this.updatedReviews.push(this.GetMatchPageReviewById(response.pageReviews, matchReview));
                }
            }
        });

        Object.values(this.state.reviews).map((review,i) => {
            if(!this.ExistsInReviewsResponse(review,response.pageReviews))
            {
                this.deletedReviews.push(review.ReviewId);
            }
        });

        var request = this.CreateRequestForEditPage();
        this.caller.editPage(request).then((response) =>{
            this.setState({PageEdited: true, isLoading: false});
        });
        this.setState({isLoading: true});
    }

    IsEqual = (a,b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    getPopUpMessage = () => {
        var message = this.state.pageTitle + " Edited Successfully!!";
        return message;
    };

    goToDiary = () => {
        var url = "/ShowDiary?Id=" + this.diaryId;
        this.props.history.push(url);
    };

    render(){
        if(this.state.reviews === null || this.state.isLoading)
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
        <div>
                <PageForm reviews = {Object.values(this.state.reviews)} pageTitle= {this.state.pageTitle}
             onSavePageClicked = {this.completeEditPage}></PageForm>
        </div>
             );
    }
} 
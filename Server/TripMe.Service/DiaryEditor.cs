using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;
using TripMe.Service.Authentication;
using TripMe.Service.Modifiers;

namespace TripMe.Service
{
    public class DiaryEditor
    {
        private readonly DiaryModifier _diaryModifier;
        private readonly UserPermissionManager _userPermissionManager;

        public DiaryEditor()
        {
            _diaryModifier = new DiaryModifier();
            _userPermissionManager = new UserPermissionManager(); 
        }

        public long CreateNewDiary(AddNewDiaryRequest newDiaryRequest, long userId)
        {
            Diary diary= Mapper.Map<AddNewDiaryRequest, Diary>(newDiaryRequest);

            diary.WriterId = userId;
            _diaryModifier.CreateNewDiary(diary);
            if (newDiaryRequest.Countries != null && newDiaryRequest.Countries.Count > 0)
            {
                _diaryModifier.AddDiaryCountries(newDiaryRequest.Countries.Select(
                    x => new DiaryCountry { DiaryId = diary.Id, Country = x }).ToList());
            }

            if (newDiaryRequest.Cities != null && newDiaryRequest.Cities.Count > 0)
            {
               _diaryModifier.AddDiaryCities(newDiaryRequest.Cities.Select(
                x => new DiaryCity { DiaryId = diary.Id, City = x }).ToList());
            }
            return diary.Id;
        }

        public long CreateNewDiaryPage(AddNewPageRequest newPageRequest)
        {
            DiaryPage newPage= Mapper.Map<DiaryPage>(newPageRequest);

            _diaryModifier.CreateNewPage(newPage);
            StorePageReviews(newPage.PageId, newPageRequest.Reviews);
            return newPage.PageId;
        }

        private void StorePageReviews(long pageId, List<ReviewQuestionnaireAnswerDto> completedReviews)
        {
            List<Review> reviews = new List<Review>(completedReviews.Count);
            List<ReviewAnswer> reviewAnswers = new List<ReviewAnswer>();

            foreach (var completedReview in completedReviews)
            {
                Guid reviewId = Guid.NewGuid();
                Review review = Mapper.Map<Review>(completedReview);

                review.Id = reviewId;
                review.PageId = pageId;
                review.IsActive = true;
                reviews.Add(review);

                reviewAnswers.AddRange(completedReview.Answers.Select(answer => new ReviewAnswer
                {
                    ReviewId = reviewId,
                    QuestionId = answer.Key,
                    Answer = answer.Value
                }).ToList());
            }

            _diaryModifier.CreateNewReviews(reviews);
            _diaryModifier.UpdateReviewAnswers(reviewAnswers);
        }
    }
}

using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Requestes;
using TripMe.Contracts.Dtos;
using TripMe.Model.EntitySets;
using TripMe.Repositories;
using TripMe.Service.Modifiers;

namespace TripMe.Service.Editors
{
    public class PageEditor
    {
        private readonly DiaryModifier _diaryModifier;
        private readonly PageRepository _pageRepository;
        private readonly ReviewRepository _reviewRepository;

        public PageEditor()
        {
            _diaryModifier = new DiaryModifier();
            _pageRepository = new PageRepository();
            _reviewRepository = new ReviewRepository();
        }

        public long CreateNewDiaryPage(AddNewPageRequest newPageRequest)
        {
            DiaryPage newPage = Mapper.Map<DiaryPage>(newPageRequest);

            _diaryModifier.CreateNewPage(newPage);
            StorePageReviews(newPage.PageId, newPageRequest.Reviews);
            return newPage.PageId;
        }

        public void EditDiaryPage(EditPageRequest editPageRequest)
        {
            UpdatePageEntity(editPageRequest);
            StorePageReviews(editPageRequest.PageId, editPageRequest.NewReviews);
            UpdatePageReviews(editPageRequest.PageId, editPageRequest.UpdatedReviews);
            DeactivatePageReviews(editPageRequest.PageId, editPageRequest.DeletedReviews);
        }

        private void UpdatePageEntity(EditPageRequest editPageRequest)
        {
            DiaryPage page = _pageRepository.GetPageById(editPageRequest.DiaryId, editPageRequest.PageId);

            page.Title = editPageRequest.Title;
            _diaryModifier.UpdatePage(page);
        }

        private void StorePageReviews(long pageId, List<ReviewQuestionnaireAnswerDto> completedReviews)
        {
            List<Review> reviews;
            List<ReviewAnswer> reviewAnswers;

            BuildPageReviews(pageId, completedReviews, out reviews, out reviewAnswers);
            _diaryModifier.CreateNewReviews(reviews);
            _diaryModifier.UpdateReviewAnswers(reviewAnswers);
        }

        private void UpdatePageReviews(long pageId, List<ReviewQuestionnaireAnswerDto> updatedReviews)
        {
            List<Review> reviews;
            List<ReviewAnswer> reviewAnswers;

            BuildPageReviews(pageId, updatedReviews, out reviews, out reviewAnswers);
            _diaryModifier.UpdateReviews(reviews);
            _diaryModifier.UpdateReviewAnswers(reviewAnswers);
        }

        private void BuildPageReviews(long pageId, List<ReviewQuestionnaireAnswerDto> completedReviews, out List<Review> reviews, out List<ReviewAnswer> reviewAnswers)
        {
            reviews = new List<Review>(completedReviews.Count);
            reviewAnswers = new List<ReviewAnswer>();

            foreach (var completedReview in completedReviews)
            {
                Guid reviewId = completedReview.ReviewId?? Guid.NewGuid();
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
        }

        private void DeactivatePageReviews(long pageId, List<Guid> deletedReviews)
        {
            List<Review> reviews = _reviewRepository.GetReviewById(deletedReviews);

            foreach (var review in reviews)
            {
                review.IsActive = false;
            }

            _diaryModifier.UpdateReviews(reviews);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Repositories
{
    public class ReviewRepository
    {
        public List<ReviewType> GetReviewTypes()
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.ReviewTypes.ToList();
            }
        }

        public List<ReviewQuestion> GetReviewFields()
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.ReviewQuestions.ToList();
            }
        }

        public List<ReviewQuestion> GetReviewFieldsByReviewTypeId(int reviewTypeId)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.ReviewQuestions.Where(x => x.ReviewTypeId == reviewTypeId).ToList();
            }
        }

        public List<Review> GetReviewById(List<Guid> ids)
        {
            using(var dbContext = new TripMeContext())
            {
                return dbContext.Reviews.Where(x => ids.Contains(x.Id)).ToList();
            }
        }

        public Dictionary<Review,List<ReviewAnswer>> GetPageCompleteReviews(long pageId)
        {
            using (var dbContext = new TripMeContext())
            {
                var result = (from review in dbContext.Reviews
                              join questionAnswer in dbContext.ReviewAnswers on review.Id equals questionAnswer.ReviewId into answers
                              from questionAnswer in answers.DefaultIfEmpty()
                              where review.PageId == pageId && review.IsActive
                              select new { review, questionAnswer }).ToList();


                Dictionary<Review, List<ReviewAnswer>> groupResult = result.GroupBy(resultRow => resultRow.review.Id)
                    .ToDictionary(groupedAnswers => groupedAnswers.First().review,
                    groupedAnswers => groupedAnswers.Select(x => x.questionAnswer).ToList());

                Dictionary<Review, List<ReviewAnswer>> reviewsResult = new Dictionary<Review, List<ReviewAnswer>>();

                foreach (var fullReview in groupResult) // remove null values because of the left join
                {
                    if(fullReview.Value.All(answer=> answer == null))
                    {
                        reviewsResult.Add(fullReview.Key, new List<ReviewAnswer>());
                    }
                    else
                    {
                        reviewsResult.Add(fullReview.Key, fullReview.Value);
                    }
                }

                return reviewsResult;
            }
        }
    }
}

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

        public Dictionary<Review,List<ReviewAnswer>> GetPageCompleteReviews(long pageId)
        {
            using (var dbContext = new TripMeContext())
            {
                var result = (from review in dbContext.Reviews
                          join questionAnswer in dbContext.ReviewAnswers on review.Id equals questionAnswer.ReviewId
                          where review.PageId == pageId
                          select new
                          {
                              review,
                              questionAnswer
                          }).ToList();

                return result.GroupBy(resultRow => resultRow.review.Id)
                    .ToDictionary(groupedAnswers => groupedAnswers.First().review, groupedAnswers => groupedAnswers.Select(x => x.questionAnswer).ToList());
            }
        }
    }
}

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
    }
}

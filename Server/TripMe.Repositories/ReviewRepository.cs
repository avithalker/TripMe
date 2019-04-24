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

        public List<ReviewField> GetReviewFields()
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.ReviewFields.ToList();
            }
        }

        public List<ReviewField> GetReviewFieldsByReviewTypeId(int reviewTypeId)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.ReviewFields.Where(x => x.ReviewTypeId == reviewTypeId).ToList();
            }
        }
    }
}

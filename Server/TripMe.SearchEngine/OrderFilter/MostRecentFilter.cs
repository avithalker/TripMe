using System.Linq;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public class MostRecentFilter : IOrderFilter
    {
        public IQueryable<DiarySearchResult> AddOrder(IQueryable<DiarySearchResult> currentQuery)
        {
            return currentQuery.OrderByDescending(diary => diary.Diary.CreateDate);
        }
    }
}

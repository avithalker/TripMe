using System.Linq;
using TripMe.Contracts.Requestes;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public class MostRecentFilter : IPreOrderFilter
    {
        public IQueryable<DiarySearchResult> AddOrder(IQueryable<DiarySearchResult> currentQuery, SearchDiaryRequest searchRequest)
        {
            return currentQuery.OrderByDescending(diary => diary.Diary.CreateDate);
        }
    }
}

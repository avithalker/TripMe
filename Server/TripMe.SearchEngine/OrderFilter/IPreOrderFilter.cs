using System.Linq;
using TripMe.Contracts.Requestes;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public interface IPreOrderFilter
    {
        IQueryable<DiarySearchResult> AddOrder(IQueryable<DiarySearchResult> currentQuery, SearchDiaryRequest searchRequest);
    }
}

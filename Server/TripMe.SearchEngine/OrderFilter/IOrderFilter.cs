using System.Linq;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public interface IOrderFilter
    {
        IQueryable<DiarySearchResult> AddOrder(IQueryable<DiarySearchResult> currentQuery);
    }
}

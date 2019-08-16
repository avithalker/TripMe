using System.Linq;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public interface ISearchFilter
    {
        IQueryable<DiarySearchResult> AddFilterToSearchQuery(object filterData, IQueryable<DiarySearchResult> currentQuery);
    }
}

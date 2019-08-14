using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class CityFilter : SearchFilter<string[]>
    {
        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(string[] filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            List<string> requestedCities = filterData.ToList();

            return currentQuery.Where(diary => diary.Cities.Any(city => requestedCities.Contains(city.City)));
        }
    }
}

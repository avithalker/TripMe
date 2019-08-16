using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class ContinentFilter : SearchFilter<string>
    {
        protected override string ParseFilterData(object filterData)
        {
            return filterData.ToString();
        }

        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(string filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            return currentQuery.Where(diary => diary.Diary.Continent == filterData);
        }
    }
}

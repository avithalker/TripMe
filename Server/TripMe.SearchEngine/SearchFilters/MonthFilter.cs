using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class MonthFilter : SearchFilter<int>
    {
        protected override int ParseFilterData(object filterData)
        {
            return Convert.ToInt32(filterData);
        }

        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(int filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            return currentQuery.Where(diary => diary.Diary.StartDate.Month <= filterData && 
            diary.Diary.EndDate.Month >= filterData);
        }
    }
}

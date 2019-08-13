using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Enums;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class TripTypeFilter : SearchFilter<TripType>
    {
        protected override TripType ParseFilterData(object filterData)
        {
            return (TripType)Convert.ToInt16(filterData);
        }

        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(TripType filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            return currentQuery.Where(diary => diary.Diary.TripType == (short)filterData);
        }
    }
}

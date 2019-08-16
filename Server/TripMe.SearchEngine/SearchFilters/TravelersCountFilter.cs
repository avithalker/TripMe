using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class TravelersCountFilter : SearchFilter<int[]>
    {
        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(int[] filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            int minCount = filterData.First();
            int maxCount = filterData.Last();

            return currentQuery.Where(diary => diary.Diary.TravelersCount >= minCount
            && diary.Diary.TravelersCount <= maxCount);
        }
    }
}

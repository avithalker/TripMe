using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class DurationDaysFilter : SearchFilter<int[]>
    {
 
        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(int[] filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            int minDuration = filterData.First();
            int maxDuarion = filterData.Last();

            return currentQuery.Where(diary => DbFunctions.DiffDays(diary.Diary.StartDate,diary.Diary.EndDate) >= minDuration
            && DbFunctions.DiffDays(diary.Diary.StartDate, diary.Diary.EndDate) <= maxDuarion);
        }
    }
}

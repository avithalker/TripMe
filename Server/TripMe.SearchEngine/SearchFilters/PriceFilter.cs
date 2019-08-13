using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class PriceFilter : SearchFilter<int[]>
    {
        public override IQueryable<DiarySearchResult> AddFilterToSearchQuery(int[] filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            int minPrice = filterData.First();
            int maxPrice = filterData.Last();

            return currentQuery.Where(diary => diary.Diary.ApproximatePrice >= minPrice 
            && diary.Diary.ApproximatePrice <= maxPrice);
        }
    }
}

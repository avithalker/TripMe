using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public class DiarySearcher
    {

        public List<DiarySearchResult> SearchDiaries()
        {
            using (var dbContext = new TripMeContext())
            {
                IQueryable<DiarySearchResult> searchQuery = BuildBasicSearchQuery(dbContext);
                //searchQuery = new TripTypeFilter().AddFilterToSearchQuery((object)2, searchQuery);
                //var a = searchQuery.ToList();
            }
            return null;
        }

        private IQueryable<DiarySearchResult> BuildBasicSearchQuery(TripMeContext dbContext)
        {
            return from diary in dbContext.Diaries
                   join diaryCountry in dbContext.DiaryCountries on diary.Id equals diaryCountry.DiaryId into countries
                   join diaryCity in dbContext.DiaryCities on diary.Id equals diaryCity.DiaryId into cities
                   select new DiarySearchResult { Diary = diary, Countries = countries, Cities = cities };
        }
    }
}

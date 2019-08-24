using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.Model;
using TripMe.SearchEngine.OrderFilter;
using TripMe.SearchEngine.SearchFilters;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine
{
    public class DiarySearcher
    {

        public List<DiarySearchResult> SearchDiaries(SearchDiaryRequest searchDiaryRequest)
        {
            List<DiarySearchResult> matchedDiaries;

            using (var dbContext = new TripMeContext())
            {
                IQueryable<DiarySearchResult> searchQuery = BuildSearchQuery(dbContext, searchDiaryRequest.SearchParameters);

                searchQuery = AddResultOrdering(searchQuery, searchDiaryRequest);
                matchedDiaries = ExecuteSearch(searchQuery, searchDiaryRequest.ResultLimit);
            }

            return matchedDiaries;
        }

        private IQueryable<DiarySearchResult> AddResultOrdering(IQueryable<DiarySearchResult> searchQuery, SearchDiaryRequest searchDiaryRequest)
        {
            IOrderFilter orderFilter = OrderFilterFactory.GetFilter(searchDiaryRequest.OrderBy);

            if(orderFilter == null)
            {
                return searchQuery;
            }

            return orderFilter.AddOrder(searchQuery);
        }

        private IQueryable<DiarySearchResult> BuildSearchQuery(TripMeContext dbContext,Dictionary<SearchParameter,object> searchParameters)
        {
            IQueryable<DiarySearchResult> searchQuery = BuildBasicSearchQuery(dbContext);
            ISearchFilter searchFilter;

            foreach (var searchParameter in searchParameters)
            {
                searchFilter = FilterFactory.GetFilter(searchParameter.Key);
                if (searchFilter == null)
                {
                    continue;
                }

                searchQuery = searchFilter.AddFilterToSearchQuery(searchParameter.Value, searchQuery);
            }

            return searchQuery;
        }

        private IQueryable<DiarySearchResult> BuildBasicSearchQuery(TripMeContext dbContext)
        {
            return from diary in dbContext.Diaries
                   join diaryCountry in dbContext.DiaryCountries on diary.Id equals diaryCountry.DiaryId into countries
                   join diaryCity in dbContext.DiaryCities on diary.Id equals diaryCity.DiaryId into cities
                   join user in dbContext.Users on diary.WriterId equals user.Id into writer
                   select new DiarySearchResult { Diary = diary, Countries = countries, Cities = cities, Writer = writer.FirstOrDefault() };
        }

        private List<DiarySearchResult> ExecuteSearch(IQueryable<DiarySearchResult> searchQuery, int resultLimit)
        {
            return searchQuery.Take(resultLimit).ToList();
        }
    }
}

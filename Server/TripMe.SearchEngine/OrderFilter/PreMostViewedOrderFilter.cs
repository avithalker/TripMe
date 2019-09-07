using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Requestes;
using TripMe.Repositories;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public class PreMostViewedOrderFilter : IPreOrderFilter
    {
        private DiaryStatisticRepository _diaryStatisticRepository;

        public PreMostViewedOrderFilter()
        {
            _diaryStatisticRepository = new DiaryStatisticRepository();
        }

        public IQueryable<DiarySearchResult> AddOrder(IQueryable<DiarySearchResult> currentQuery, SearchDiaryRequest searchRequest)
        {
            List<long> mostViewdDiaries = _diaryStatisticRepository.GetMostViewedDiariesId(searchRequest.ResultLimit);
            return currentQuery.Where(x => mostViewdDiaries.Contains(x.Diary.Id));
        }
    }
}

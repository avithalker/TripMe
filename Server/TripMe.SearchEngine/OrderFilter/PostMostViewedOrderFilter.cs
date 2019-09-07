using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Repositories;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public class PostMostViewedOrderFilter : IPostOrderFilter
    {
        private DiaryStatisticRepository _diaryStatisticRepository;

        public PostMostViewedOrderFilter()
        {
            _diaryStatisticRepository = new DiaryStatisticRepository();
        }

        public IEnumerable<DiarySearchResult> AddOrder(IEnumerable<DiarySearchResult> CurrentResult)
        {
            List<Tuple<long, long>> diariesScore = _diaryStatisticRepository.GetDiaryViewsCount(buildMatchPattern(CurrentResult));

            var resultWithScores = from diarySearchResult in CurrentResult
                                   join diaryScore in diariesScore on diarySearchResult.Diary.Id equals diaryScore.Item1
                                   select (new { diarySearchResult, diaryScore });

            return resultWithScores.OrderByDescending(x => x.diaryScore).Select(x => x.diarySearchResult);
        }

        private string buildMatchPattern(IEnumerable<DiarySearchResult> CurrentResult)
        {
            List<string> pattern = CurrentResult.Select(x => $"\\b{x.Diary.Id.ToString()}\\b").ToList();
            return string.Concat(pattern);
        }
    }
}

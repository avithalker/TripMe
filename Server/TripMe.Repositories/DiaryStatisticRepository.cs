using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using TripMe.Model;
using TripMe.Utils.Cache;

namespace TripMe.Repositories
{
    public class DiaryStatisticRepository
    {
        public long GetDiaryViewsCount(long diaryId)
        {
            DiaryViewKey key = CacheContextKeyBuilder.BuildDiaryViewKey(diaryId);
            double? viewsCount = TripMeCacheContext.Context().SortedSetScore(key.sortedSetKey,key.memberKey);

            if (!viewsCount.HasValue)
            {
                return 0;
            }

            return (long)viewsCount.Value;
        }

        public List<Tuple<long, long>> GetDiaryViewsCount(string diaryMatchPattern)
        {
            IEnumerable<SortedSetEntry> result = TripMeCacheContext.Context().SortedSetScan(CacheContextKeyBuilder.DiariesViewCountSortedSetKey, diaryMatchPattern, 20);

            return result.Select(x => new Tuple<long, long>(long.Parse(x.Element), (long)x.Score)).ToList();
        }

        public List<long> GetMostViewedDiariesId(long limitCount)
        {
            return TripMeCacheContext.Context().SortedSetRangeByRank(CacheContextKeyBuilder.DiariesViewCountSortedSetKey, limitCount * -1,-1,StackExchange.Redis.Order.Descending)
                .Select(x =>
            {
                string value = x.ToString();
                return long.Parse(value);
            }).ToList();
        }
    }
}

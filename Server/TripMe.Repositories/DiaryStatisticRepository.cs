using TripMe.Model;
using TripMe.Utils.Cache;

namespace TripMe.Repositories
{
    public class DiaryStatisticRepository
    {
        public long GetDiaryViewsCount(long diaryId)
        {
            string key = CacheContextKeyBuilder.BuildDiaryViewKey(diaryId);
            string viewsCount = TripMeCacheContext.Context().StringGet(key);

            if (string.IsNullOrEmpty(viewsCount))
            {
                return 0;
            }

            return long.Parse(viewsCount);
        }
    }
}

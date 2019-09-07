using TripMe.Model;
using TripMe.Utils.Cache;

namespace TripMe.Service.Modifiers
{
    public class DiaryStatisticModifier
    {
        public void IncrementDiaryViews(long diaryId)
        {
            DiaryViewKey key = CacheContextKeyBuilder.BuildDiaryViewKey(diaryId);
            TripMeCacheContext.Context().SortedSetIncrement(key.sortedSetKey, key.memberKey, 1);
        }
    }
}

using TripMe.Model;
using TripMe.Utils.Cache;

namespace TripMe.Service.Modifiers
{
    public class DiaryStatisticModifier
    {
        public void IncrementDiaryViews(long diaryId)
        {
            string key = CacheContextKeyBuilder.BuildDiaryViewKey(diaryId);
            TripMeCacheContext.Context().StringIncrement(key);
        }
    }
}

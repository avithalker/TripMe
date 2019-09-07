namespace TripMe.Utils.Cache
{
    public static class CacheContextKeyBuilder
    {
        public const string DiariesViewCountSortedSetKey = "DiariesViewCount";

        public static DiaryViewKey BuildDiaryViewKey(long diaryId)
        {
            return new DiaryViewKey { sortedSetKey = DiariesViewCountSortedSetKey, memberKey = diaryId.ToString() };
        }
    }

    public struct DiaryViewKey
    {
        public string sortedSetKey;
        public string memberKey;
    } 
}

namespace TripMe.Utils.Cache
{
    public static class CacheContextKeyBuilder
    {
        public static string BuildDiaryViewKey(long diaryId)
        {
            return $"Diary_{diaryId}_Views";
        }
    }
}

using TripMe.Service.Modifiers;

namespace TripMe.Service.Statistics
{
    public class StatisticObserver
    {
        private DiaryStatisticModifier _diaryStatisticModifier;

        public StatisticObserver()
        {
            _diaryStatisticModifier = new DiaryStatisticModifier();
        }
        public void OnDiaryViewd(long diaryId)
        {
            _diaryStatisticModifier.IncrementDiaryViews(diaryId);
        }
    }
}

using TripMe.Model.EntitySets;

namespace TripMe.InternalContracts
{
    public class DiaryMetaData
    {
        public Diary Diary { get; set; }
        public User Writer { get; set; }
    }
}

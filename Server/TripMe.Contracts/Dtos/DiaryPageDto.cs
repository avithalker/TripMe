namespace TripMe.Contracts.Dtos
{
    public class DiaryPageDto
    {
        public long PageId { get; set; }
        public long DiaryId { get; set; }
        public string Title { get; set; }
        public short PageNumber { get; set; }
    }
}

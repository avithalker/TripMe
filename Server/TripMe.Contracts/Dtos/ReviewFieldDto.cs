namespace TripMe.Contracts.Dtos
{
    public class ReviewFieldDto
    {
        public long QuestionId { get; set; }
        public int FieldTypeId { get; set; }
        public string DisplayText { get; set; }
        public int DisplayOrder { get; set; }
    }
}

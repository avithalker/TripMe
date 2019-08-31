using TripMe.Enums;

namespace TripMe.Contracts.Dtos
{
    public class ReviewTypeDto
    {
        public int TypeId { get; set; }
        public string Description { get; set; }
        public ReviewStructureType StructureTypeId { get; set; }
    }
}

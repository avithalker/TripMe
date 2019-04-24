using System.Collections.Generic;

namespace TripMe.Contracts.Dtos
{
    public class ReviewQuestionnaireDto
    {
        public int ReviewTypeId { get; set; }
        public List<ReviewFieldDto> Fields { get; set; }
    }
}

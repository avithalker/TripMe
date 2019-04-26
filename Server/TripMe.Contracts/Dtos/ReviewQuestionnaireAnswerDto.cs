using System;
using System.Collections.Generic;

namespace TripMe.Contracts.Dtos
{
    public class ReviewQuestionnaireAnswerDto
    {
        public Guid ReviewId { get; set; }
        public int ReviewType { get; set; }
        Dictionary<int, string> FieldAnswers { get; set; }
    }
}

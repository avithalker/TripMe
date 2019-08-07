using System;
using System.Collections.Generic;

namespace TripMe.Contracts.Dtos
{
    public class ReviewQuestionnaireAnswerDto
    {
        public int ReviewType { get; set; }
        public Dictionary<int, string> Answers { get; set; }
        public string Caption { get; set; }
        public short DisplayOrder { get; set; }

        public ReviewQuestionnaireAnswerDto()
        {
            Answers = new Dictionary<int, string>();
        }
    }
}

using System;
using System.Collections.Generic;
using TripMe.Contracts.Dtos;

namespace TripMe.Contracts.Requestes
{
    public class EditPageRequest
    {
        public long DiaryId { get; set; }
        public long PageId { get; set; }
        public string Title { get; set; }

        public List<ReviewQuestionnaireAnswerDto> NewReviews { get; set; }
        public List<ReviewQuestionnaireAnswerDto> UpdatedReviews { get; set; }
        public List<Guid> DeletedReviews { get; set; }
    }
}

using System.Collections.Generic;
using TripMe.Contracts.Dtos;

namespace TripMe.Contracts.Requestes
{
    public class AddNewPageRequest
    {
        public long DiaryId { get; set; }
        public string Title { get; set; }
        public List<ReviewQuestionnaireAnswerDto> Reviews { get; set; }
    }
}

using System.Collections.Generic;
using TripMe.Contracts.Dtos;

namespace TripMe.Contracts.Requestes
{
    public class AddNewPageRequest
    {
        public long DiaryId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        List<ReviewQuestionnaireAnswerDto> Reviews { get; set; }
    }
}

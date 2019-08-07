using System;
using System.Collections.Generic;
namespace TripMe.Contracts.Dtos
{
    public class DiaryPageDto
    {
        public long PageId { get; set; }
        public long DiaryId { get; set; }
        public string Title { get; set; }
        public Dictionary<Guid, ReviewQuestionnaireAnswerDto> Reviews { get; set; }
        public short PageNumber { get; set; }
    }
}

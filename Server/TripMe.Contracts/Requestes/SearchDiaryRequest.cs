using System.Collections.Generic;
using TripMe.Enums;

namespace TripMe.Contracts.Requestes
{
    public class SearchDiaryRequest
    {
        public Dictionary<SearchParameter, object> SearchParameters { get; set; }
        public OrderParameter OrderBy { get; set; }
        public int ResultLimit { get; set; }

        public SearchDiaryRequest()
        {
        }
    }
}

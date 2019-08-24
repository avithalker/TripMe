using System.Collections.Generic;
using TripMe.Model.EntitySets;

namespace TripMe.SearchEngine.SearchObjects
{
    public class DiarySearchResult
    {
        public Diary Diary { get; set; }

        public IEnumerable<DiaryCountry> Countries { get; set; }

        public IEnumerable<DiaryCity> Cities { get; set; }

        public User Writer { get; set; }
    }
}

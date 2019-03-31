using System;
using System.Collections.Generic;
using TripMe.Enums;

namespace TripMe.Contracts.Requestes
{
    public class AddNewDiaryRequest
    {
        public string DiaryName { get; set; }
        public List<string> Countries { get; set; }
        public List<string> Cities { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TripType TripType { get; set; }
        public int NumberOfTravelers { get; set; }
        public int ApproximatePrice { get; set; }
        public string Description { get; set; }
    }
}

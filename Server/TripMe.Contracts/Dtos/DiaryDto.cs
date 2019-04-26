﻿using System;
using System.Collections.Generic;

namespace TripMe.Contracts.Dtos
{
    public class DiaryDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short TripType { get; set; }
        public int ApproximatePrice { get; set; }
        public short TravelersCount { get; set; }
        public string Description { get; set; }
        public byte[] CoverPhoto { get; set; }
        public List<string> Countries { get; set; }
        public List<string> Cities { get; set; }

        public DiaryDto()
        {
            Countries = new List<string>();
            Cities = new List<string>();
        }
    }
}
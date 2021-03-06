﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("Diary")]
    public class Diary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public short TripType { get; set; }
        public int ApproximatePrice { get; set; }
        public short TravelersCount { get; set; }
        public string Description { get; set; }
        public string CoverPhotoUrl { get; set; }
        public string Continent { get; set; }
        public long WriterId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; }
    }
}

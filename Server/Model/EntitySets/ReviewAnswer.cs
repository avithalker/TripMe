using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("ReviewAnswer")]
    public class ReviewAnswer
    {
        [Key, Column(Order =0)]
        public Guid ReviewId { get; set; }
        [Key, Column(Order = 2)]
        public int QuestionId { get; set; }
        public string Answer { get; set; }
    }
}

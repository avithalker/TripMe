using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("Review")]
    public class Review
    {
        [Key]
        public Guid Id { get; set; }
        public long PageId { get; set; }
        public int ReviewTypeId { get; set; }
        public bool IsActive { get; set; }
        public short DisplayOrder { get; set; }
        public string Caption { get; set; }
        public string PhotoUrl { get; set; }
    }
}

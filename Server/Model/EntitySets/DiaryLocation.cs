
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("DiaryLocation")]
    public class DiaryLocation
    {
        [Key]
        [Column(Order =1)]
        public long DiaryId { get; set; }
        [Key]
        [Column(Order = 2)]
        public string Country { get; set; }
        [Key]
        [Column(Order = 3)]
        public string City { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("ReviewQuestion")]
    public class ReviewQuestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public int ReviewTypeId { get; set; }
        public int FieldTypeId { get; set; }

        [Column(TypeName ="VARCHAR")]
        public string DisplayText { get; set; }
        public int DisplayOrder { get; set; }
    }
}

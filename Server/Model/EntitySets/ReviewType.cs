using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("ReviewType")]
    public class ReviewType
    {
        [Key]
        public int TypeId { get; set; }

        [Column(TypeName = "VARCHAR")]
        public string Description { get; set; }

        public short StructureTypeId { get; set; }
    }
}

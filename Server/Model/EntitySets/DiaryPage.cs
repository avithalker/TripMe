using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripMe.Model.EntitySets
{
    [Table("DiaryPage")]
    public class DiaryPage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long PageId { get; set; }
        public long DiaryId { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
        public short DisplayOrder { get; set; }
    }
}

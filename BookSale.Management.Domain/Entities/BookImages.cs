using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSale.Management.Domain.Entities
{
    public class BookImages : BaseEntity
    {
        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }
        public Book Book { get; set; }

        [NotMapped]
        public bool IsActive { get; set; }
    }
}

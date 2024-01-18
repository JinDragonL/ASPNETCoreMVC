using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Domain.Entities
{
    public class Catalogue : BaseEntity
    {
        [Required]
        [StringLength(500)]
        public string Title { get; set; }
        [StringLength(1000)]
        public string? Description { get; set; }
        [Required]
        public bool IsActive { get; set; }
    }
}

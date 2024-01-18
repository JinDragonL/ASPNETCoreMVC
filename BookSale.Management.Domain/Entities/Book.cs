using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSale.Management.Domain.Entities
{
    public class Book: BaseEntity
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [Required]
        [StringLength(500)]
        public string Title { get; set; }
        [Required]
        public int Available { get; set; }
        [Required]
        public double Cost { get; set; }
        [StringLength(500)]
        public string? Publisher { get; set; }
        [Required]
        [StringLength(250)]
        public string Author { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        [Required]
        [StringLength(250)]
        public string Description { get; set; }

        [ForeignKey(nameof(Genre))]
        public int GenreId { get; set; }
        public Genre Genre { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSale.Management.Domain.Entities
{
    public class BookCatalogue: BaseEntity
    {
        public DateTime CreatedOn { get; set; }
        [Required]
        public int BookId { get; set; }
        [Required]
        public int CatalogueId { get; set; }

        [ForeignKey(nameof(BookId))]
        public Book Book { get; set; }
        [ForeignKey(nameof(CatalogueId))]
        public Catalogue Catalogue { get; set; }
    }
}

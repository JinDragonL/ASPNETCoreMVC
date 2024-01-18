using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSale.Management.Domain.Entities
{
    public class CartDetail : BaseEntity
    {
        [ForeignKey(nameof(Cart))]
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }
        public Book Book { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        public int Discount { get; set; }
        [StringLength(1000)]
        public string? Description { get; set; }
    }
}

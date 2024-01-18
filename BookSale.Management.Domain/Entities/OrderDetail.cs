using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSale.Management.Domain.Entities
{
    public class OrderDetail: BaseEntity
    {
        [Required]
        public string OrderId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public double UnitPrice { get; set; }
        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; }
    }
}

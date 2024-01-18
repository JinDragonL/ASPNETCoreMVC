using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Application.DTOs.Order
{
    public class OrderDTO
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public DateTime CreatedOn { get; set; }
        public double TotalAmount { get; set; }
        public string UserId { get; set; }
    }
}

using BookSale.Management.Domain.Enums;

namespace BookSale.Management.Application.DTOs.Order
{
    public class OrderResponseDTO
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public DateTime CreatedOn { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public StatusProcessing Status { get; set; }
        public string Fullname { get; set; }
        public double TotalPrice { get; set; }
    }
}

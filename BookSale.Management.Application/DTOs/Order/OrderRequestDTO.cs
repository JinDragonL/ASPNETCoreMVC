using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Domain.Enums;

namespace BookSale.Management.Application.DTOs.Order
{
    public class OrderRequestDto
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public DateTime CreatedOn { get; set; }
        public double TotalAmount { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string UserId { get; set; }
        public int AddressId { get; set; }
        public List<BookCartDto> Books { get; set; }
        public StatusProcessing Status { get; set; }

    }
}

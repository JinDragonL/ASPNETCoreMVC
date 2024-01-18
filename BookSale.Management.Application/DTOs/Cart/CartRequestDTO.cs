using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Domain.Enums;

namespace BookSale.Management.Application.DTOs.Cart
{
    public class CartRequestDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Note { get; set; }
        public DateTime CreatedOn { get; set; }
        public StatusProcessing Status { get; set; }

        public List<BookCartDTO> Books { get; set; }
    }
}

namespace BookSale.Management.Application.DTOs.Book
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public int Available { get; set; }
        public double Cost { get; set; }
        public string? Publisher { get; set; }
        public string Author { get; set; }
        public DateTime CreatedOn { get; set; }
        public string GenreName { get; set; }
    }
}

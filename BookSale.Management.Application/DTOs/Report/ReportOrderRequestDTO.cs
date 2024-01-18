using BookSale.Management.Domain.Enums;

namespace BookSale.Management.Application.DTOs.Report
{
    public class ReportOrderRequestDTO
    {
        public string From { get; set; }
        public string To { get; set; }
        public int GenreId { get; set; }
        public StatusProcessing Status { get; set; }
    }
}

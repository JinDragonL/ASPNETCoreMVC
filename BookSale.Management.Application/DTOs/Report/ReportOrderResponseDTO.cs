using BookSale.Management.Domain.Enums;

namespace BookSale.Management.Application.DTOs.Report
{
    public class ReportOrderResponseDto
    {
        public string Code { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CustomerName { get; set; }
        public int TotalQuantity { get; set; }
        public double TotalPrice { get; set; }
        public StatusProcessing Status { get; set; }
    }
}

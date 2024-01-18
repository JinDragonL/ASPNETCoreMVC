namespace BookSale.Management.Application.DTOs.Report
{
    public class ReportOrderDTO
    {
        public string Code { get; set; }
        public DateTime CreateOn { get; set; }
        public OrderAddressDTO Address { get; set; }

        public IEnumerable<OrderDetailDTO>  Details { get; set; }
    }

    public class OrderAddressDTO
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }

    public class OrderDetailDTO
    {
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }

}

namespace BookSale.Management.Application.DTOs.Report
{
    public class ReportOrderDto
    {
        public string Code { get; set; }
        public DateTime CreateOn { get; set; }
        public OrderAddressDto Address { get; set; }

        public IEnumerable<OrderDetailDto>  Details { get; set; }
    }

    public class OrderAddressDto
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }

    public class OrderDetailDto
    {
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }

}

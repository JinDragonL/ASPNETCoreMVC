namespace BookSale.Management.Application.Dtos
{
    public class ResponseDatatable<T>
    {
        public int RecordsFiltered { get; set; }
        public int RecordsTotal { get; set; }
        public int Draw { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}

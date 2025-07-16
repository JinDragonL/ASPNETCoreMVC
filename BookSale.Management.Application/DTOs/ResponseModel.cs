namespace BookSale.Management.Application.Dtos
{
    public class ResponseModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    public class ResponseModel<T> : ResponseModel
    {
        public T Data { get; set; }
    }
}

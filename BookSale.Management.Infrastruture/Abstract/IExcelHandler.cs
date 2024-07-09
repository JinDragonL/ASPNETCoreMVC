namespace BookSale.Management.Infrastruture.Abstract
{
    public interface IExcelHandler
    {
        Task<byte[]> Export<T>(List<T> dataItems) where T : class, new();
    }
}
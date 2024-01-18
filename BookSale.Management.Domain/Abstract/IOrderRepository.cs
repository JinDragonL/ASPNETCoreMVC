using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public interface IOrderRepository
    {
        Task<(IEnumerable<T>, int)> GetByPaginationAsync<T>(int pageIndex, int pageSize, string keyword);
        Task<IEnumerable<T>> GetChartDataByGenreAsync<T>(int genreId);
        Task<IEnumerable<T>> GetReportByExcelAsync<T>(string from, string to, int genreId, int status);
        Task SaveAsync(Order order);
    }
}
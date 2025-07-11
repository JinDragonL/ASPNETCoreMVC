using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public interface IOrderRepository
    {
        Task<(IEnumerable<T>, int)> GetByPagination<T>(int pageIndex, int pageSize, string keyword);
        Task<IEnumerable<T>> GetChartDataByGenreAsync<T>(int genreId);
        Task<IEnumerable<T>> GetReportByExcel<T>(string from, string to, int genreId, int status);
        Task SaveAsync(Order order);
    }
}
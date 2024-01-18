using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Chart;
using BookSale.Management.Application.DTOs.Order;
using BookSale.Management.Application.DTOs.Report;

namespace BookSale.Management.Application.Abstracts
{
    public interface IOrderService
    {
        Task<ResponseDatatable<object>> GetByPaginationAsync(RequestDatatable request);
        Task<IEnumerable<ChartOrderByGenreDTO>> GetChartDataByGenreAsync(int genreId);
        Task<ReportOrderDTO> GetReportByIdAsync(string id);
        Task<IEnumerable<ReportOrderResponseDTO>> GetReportOrderAsync(ReportOrderRequestDTO request);
        Task<bool> SaveAsync(OrderRequestDTO order);
    }
}
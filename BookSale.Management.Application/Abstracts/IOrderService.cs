using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Chart;
using BookSale.Management.Application.DTOs.Order;
using BookSale.Management.Application.DTOs.Report;

namespace BookSale.Management.Application.Abstracts
{
    public interface IOrderService
    {
        Task<ResponseDatatable<object>> GetByPagination(RequestDatatable request);
        Task<IEnumerable<ChartOrderByGenreDto>> GetChartDataByGenreAsync(int genreId);
        Task<ReportOrderDto> GetReportByIdAsync(string id);
        Task<IEnumerable<ReportOrderResponseDto>> GetReportOrderAsync(ReportOrderRequestDto request);
        Task<bool> SaveAsync(OrderRequestDto order);
    }
}
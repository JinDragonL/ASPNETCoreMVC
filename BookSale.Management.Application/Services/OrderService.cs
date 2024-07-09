using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Chart;
using BookSale.Management.Application.DTOs.Order;
using BookSale.Management.Application.DTOs.Report;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Entities;
using BookSale.Management.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BookSale.Management.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ResponseDatatable<object>> GetByPaginationAsync(RequestDatatable request)
        {
            var (orders, totalRecords) = await _unitOfWork.OrderRepository.GetByPaginationAsync<OrderResponseDTO>(request.SkipItems,
                                                                                                    request.PageSize,
                                                                                                    request.Keyword);

            return new ResponseDatatable<object>
            {
                Draw = request.Draw,
                RecordsTotal = totalRecords,
                RecordsFiltered = totalRecords,
                Data = orders.Select(x => new
                {
                    x.Id,
                    x.Code,
                    x.CreatedOn,
                    x.Fullname,
                    x.TotalPrice,
                    Status = Enum.GetName(typeof(StatusProcessing), x.Status),
                    PaymentMethod = Enum.GetName(typeof(PaymentMethod), x.PaymentMethod),
                }).ToList()
            };
        }

        public async Task<bool> SaveAsync(OrderRequestDTO orderDTO)
        {
            try
            {
                var order = _mapper.Map<Order>(orderDTO);

                await _unitOfWork.BeginTransaction();

                await _unitOfWork.OrderRepository.SaveAsync(order);

                await _unitOfWork.SaveChangeAsync();

                if (orderDTO.Books.Any())
                {
                    foreach (var book in orderDTO.Books)
                    {
                        var orderDetail = new OrderDetail
                        {
                            IsActive = true,
                            OrderId = order.Id,
                            ProductId = book.Id,
                            Quantity = book.Quantity,
                            UnitPrice = book.Price,
                        };

                        await _unitOfWork.Table<OrderDetail>().AddAsync(orderDetail);
                    }

                    await _unitOfWork.SaveChangeAsync();
                }

                await _unitOfWork.CommitTransactionAsync();

            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();

                return false;
            }

            return true;
        }

        public async Task<ReportOrderDTO> GetReportByIdAsync(string id)
        {
            var order = await _unitOfWork.Table<Order>()
                                         .Where(x => x.Id == id)
                                         .Include(x => x.UserAddress)
                                         .Include(x => x.Details)
                                         .AsNoTracking()
                                         .SingleAsync();

            var details = order.Details.Join(_unitOfWork.Table<Book>(), x => x.ProductId,
                                                                        y => y.Id,
                                                                        (detail, book) => new OrderDetailDTO
                                                                        {
                                                                            Price = detail.UnitPrice,
                                                                            Quantity = detail.Quantity,
                                                                            ProductName = book.Title
                                                                        }).ToList();

            var address = _mapper.Map<OrderAddressDTO>(order.UserAddress);

            return new ReportOrderDTO
            {
                Code = order.Code,
                CreateOn = order.CreatedOn,
                Address = address,
                Details = details
            };
        }

        public async Task<IEnumerable<ReportOrderResponseDTO>> GetReportOrderAsync(ReportOrderRequestDTO request)
        {
            DateTime start = DateTime.ParseExact(request.From, "dd/MM/yyyy", new CultureInfo("vi-VN"));
            DateTime end = DateTime.ParseExact(request.To, "dd/MM/yyyy", new CultureInfo("vi-VN")); //15/10/2023

            var result = await _unitOfWork.OrderRepository.GetReportByExcelAsync<ReportOrderResponseDTO>(start.ToString("yyyy/MM/dd"), 
                                                                                                    end.ToString("yyyy/MM/dd"), 
                                                                                                    request.GenreId, 
                                                                                                    (int)request.Status);
            return result;
        }

        public async Task<IEnumerable<ChartOrderByGenreDTO>> GetChartDataByGenreAsync(int genreId)
        {
            return await _unitOfWork.OrderRepository.GetChartDataByGenreAsync<ChartOrderByGenreDTO>(genreId);
        }
    }
}

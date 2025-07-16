using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.Dtos;
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

        public async Task<ResponseDatatable<object>> GetByPagination(RequestDatatable request)
        {

            var (orders, totalRecords) = await _unitOfWork.OrderRepository.GetByPagination<OrderResponseDto>(request.SkipItems,
                                                                                                    request.PageSize,
                                                                                                    request.Keyword);

            return new ResponseDatatable<object>
            {
                Draw = request.Draw,
                RecordsTotal = totalRecords,
                RecordsFiltered = totalRecords,
                Data = orders.Select(x => new
                {
                    Id = x.Id,
                    Code = x.Code,
                    CreatedOn = x.CreatedOn,
                    Fullname = x.Fullname,
                    TotalPrice = x.TotalPrice,
                    Status = Enum.GetName(typeof(StatusProcessing), x.Status),
                    PaymentMethod = Enum.GetName(typeof(PaymentMethod), x.PaymentMethod),
                }).ToList()
            };
        }

        public async Task<bool> SaveAsync(OrderRequestDto orderDTO)
        {
            try
            {
                var order = _mapper.Map<Order>(orderDTO);

                await _unitOfWork.BeginTransaction();

                await _unitOfWork.OrderRepository.SaveAsync(order);

                await _unitOfWork.CommitAsync();

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

                    await _unitOfWork.CommitAsync();
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

        public async Task<ReportOrderDto> GetReportByIdAsync(string id)
        {
            var order = await _unitOfWork.Table<Order>()
                                         .Where(x => x.Id == id)
                                         .Include(x => x.UserAddress)
                                         .Include(x => x.Details)
                                         .SingleAsync();

            var details = order.Details.Join(_unitOfWork.Table<Book>(), x => x.ProductId,
                                                                        y => y.Id,
                                                                        (detail, book) => new OrderDetailDto
                                                                        {
                                                                            Price = detail.UnitPrice,
                                                                            Quantity = detail.Quantity,
                                                                            ProductName = book.Title
                                                                        }).ToList();
            var address = _mapper.Map<OrderAddressDto>(order.UserAddress);

            return new ReportOrderDto
            {
                Code = order.Code,
                CreateOn = order.CreatedOn,
                Address = address,
                Details = details
            };
        }

        public async Task<IEnumerable<ReportOrderResponseDto>> GetReportOrderAsync(ReportOrderRequestDto request)
        {
            DateTime start = DateTime.ParseExact(request.From, "dd/MM/yyyy", new CultureInfo("vi-VN"));
            DateTime end = DateTime.ParseExact(request.To, "dd/MM/yyyy", new CultureInfo("vi-VN")); //15/10/2023

            var result = await _unitOfWork.OrderRepository.GetReportByExcel<ReportOrderResponseDto>(start.ToString("yyyy/MM/dd"), 
                                                                                                    end.ToString("yyyy/MM/dd"), 
                                                                                                    request.GenreId, 
                                                                                                    (int)request.Status);

            return result;
        }

        public async Task<IEnumerable<ChartOrderByGenreDto>> GetChartDataByGenreAsync(int genreId)
        {
            return await _unitOfWork.OrderRepository.GetChartDataByGenreAsync<ChartOrderByGenreDto>(genreId);
        }
    }
}

using AutoMapper;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Application.DTOs.Cart;
using BookSale.Management.Application.DTOs.Genre;
using BookSale.Management.Application.DTOs.Order;
using BookSale.Management.Application.DTOs.Report;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.Application.Configuration
{
    public class AutomapConfig : Profile
    {
        public AutomapConfig()
        {
            CreateMap<ApplicationUser, AccountDto>()
                .ForMember(dest => dest.Phone, source => source.MapFrom(src => src.PhoneNumber))
                .ReverseMap();

            CreateMap<Genre, GenreDto>().ReverseMap();
            CreateMap<Book, BookViewModel>().ReverseMap();
            CreateMap<Book, BookDto>().ReverseMap();
            CreateMap<Book, BookCartDto>()
                .ForMember(dest => dest.Price, s => s.MapFrom(src => src.Cost))
                .ReverseMap();

            CreateMap<UserAddress, UserAddressDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<CartRequestDto, Cart>()
                .ForMember(dest => dest.Status, source => source.MapFrom(src => Convert.ToInt16(src.Status)))
                .ReverseMap();
            CreateMap<Order, OrderRequestDto>().ReverseMap();

            CreateMap<UserAddress, OrderAddressDto>()
                .ForMember(dest => dest.Phone, source => source.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Name, source => source.MapFrom(src => src.Fullname))
                .ReverseMap();

        }
    }
}

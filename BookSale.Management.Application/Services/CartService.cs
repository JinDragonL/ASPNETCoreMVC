﻿using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs.Cart;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.Application.Services
{
    public class CartService : ICartService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CartService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> SaveAsync(CartRequestDto bookCartDTOs)
        {
            await _unitOfWork.BeginTransaction();

            try
            {
                var cart = _mapper.Map<Cart>(bookCartDTOs);

                await _unitOfWork.CartRepository.CreateAsync(cart);

                if (bookCartDTOs.Books.Any())
                {
                    foreach (var book in bookCartDTOs.Books)
                    {
                        var cartDetail = new CartDetail
                        {
                            CartId = cart.Id,
                            BookId = book.Id,
                            Quantity = book.Quantity,
                            Price = book.Price,
                            IsActive = true
                        };

                        await _unitOfWork.Table<CartDetail>().AddAsync(cartDetail);
                    }
                }

                await _unitOfWork.SaveChangeAsync();

                await _unitOfWork.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackTransactionAsync();
                return false;
            }

            return true;
        }
    }
}

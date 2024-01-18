﻿using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public interface IUserAddressRepository
    {
        Task<IEnumerable<UserAddress>> GetAllAddressByUserAsync(string id);
        Task SaveAsync(UserAddress userAddress);
    }
}
using BookSale.Management.DataAccess.Repository;
using BookSale.Management.Domain.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BookSale.Management.DataAccess.Abstract
{
    public interface IUnitOfWork
    {
        IBookRepository BookRepository { get; }
        IGenreRepository GenreRepository { get; }
        IUserAddressRepository UserAddressRepository { get; }
        IOrderRepository OrderRepository { get; }
        ICartRepository CartRepository { get; }

        Task BeginTransaction();
        Task Commit();
        Task CommitTransaction();
        void Dispose();
        Task RollbackTransaction();
        DbSet<T> Table<T>() where T : class;
    }
}
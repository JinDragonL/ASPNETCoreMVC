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
        Task SaveChangeAsync();
        Task CommitTransactionAsync();
        void Dispose();
        Task RollbackTransactionAsync();
        DbSet<T> Table<T>() where T : class;
    }
}
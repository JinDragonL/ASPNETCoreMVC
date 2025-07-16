using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BookSale.Management.DataAccess.Repository
{
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        ApplicationDbContext _applicationDbContext;
        private readonly ISQLQueryHandler _sqLQueryHandler;
        IBookRepository _bookRepository;
        IGenreRepository _genreRepository;
        IUserAddressRepository _addressRepository;
        IOrderRepository  _orderRepository;
        ICartRepository  _cartRepository;
        IDbContextTransaction _dbContextTransaction;
        private bool disposedValue;

        public UnitOfWork(ApplicationDbContext applicationDbContext, ISQLQueryHandler sQLQueryHandler)
        {
            _applicationDbContext = applicationDbContext;
            _sqLQueryHandler = sQLQueryHandler;
        }

        public DbSet<T> Table<T>() where T: class => _applicationDbContext.Set<T>();

        public IBookRepository BookRepository => _bookRepository ??= new BookRepository(_applicationDbContext, _sqLQueryHandler);
        public IGenreRepository GenreRepository => _genreRepository ??= new GenreRepository(_applicationDbContext);
        public IUserAddressRepository UserAddressRepository => _addressRepository ??= new UserAddressRepository(_applicationDbContext);
        public IOrderRepository OrderRepository => _orderRepository ??= new OrderRepository(_applicationDbContext, _sqLQueryHandler);
        public ICartRepository CartRepository => _cartRepository ??= new CartRepository(_applicationDbContext);

        public async Task BeginTransaction()
        {
            _dbContextTransaction = await _applicationDbContext.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            await _dbContextTransaction?.CommitAsync();
        }

        public async Task RollbackTransactionAsync()
        {
            await _dbContextTransaction?.RollbackAsync();
        }

        public async Task SaveChangeAsync()
        {
            await _applicationDbContext.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _applicationDbContext.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}

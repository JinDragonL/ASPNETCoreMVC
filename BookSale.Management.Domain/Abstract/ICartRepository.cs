using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public interface ICartRepository
    {
        Task CreateAsync(Cart order);
        void Update(Cart order);
    }
}
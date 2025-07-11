using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public interface ICartRepository
    {
        Task Save(Cart order);
    }
}
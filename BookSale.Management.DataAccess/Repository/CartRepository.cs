using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        public CartRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task SaveAsync(Cart order)
        {
            if (order.Id == 0)
            {
                await CreateAsync(order);
            }
            else
            {
                Update(order);
            }
        }
    }
}

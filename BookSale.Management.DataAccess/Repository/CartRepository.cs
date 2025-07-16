using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        public CartRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task CreateAsync(Cart order)
        {
            await base.CreateAsync(order);
        }

        public void Update(Cart order)
        {
            base.Update(order);
        }
    }
}

using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public class CartRepository : GenericRepository<Cart>, ICartRepository
    {
        public CartRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task Save(Cart order)
        {
            if (order.Id == 0)
            {
                await base.Create(order);
            }
            else
            {
                base.Update(order);
            }
        }
    }
}

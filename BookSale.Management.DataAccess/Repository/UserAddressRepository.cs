using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public class UserAddressRepository : GenericRepository<UserAddress>, IUserAddressRepository
    {
        public UserAddressRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task<IEnumerable<UserAddress>> GetAllAddressByUser(string id)
        {
            return await GetAllAsync(x => x.UserId == id && x.IsActive);
        }

        public async Task Save(UserAddress userAddress)
        {
            if(userAddress.Id == 0)
            {
                await base.CreateAsync(userAddress);
            }
            else
            {
                base.Update(userAddress);
            }
        }
    }
}

using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public interface IUserAddressRepository
    {
        Task<IEnumerable<UserAddress>> GetAllAddressByUser(string id);
        Task Save(UserAddress userAddress);
    }
}
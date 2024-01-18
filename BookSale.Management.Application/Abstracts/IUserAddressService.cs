using BookSale.Management.Application.DTOs.User;

namespace BookSale.Management.Application.Abstracts
{
    public interface IUserAddressService
    {
        Task<IEnumerable<UserAddressDTO>> GetUserAddressListForSiteAsync(string userId);
        Task<int> SaveAsync(UserAddressDTO userAddressDTO);
    }
}
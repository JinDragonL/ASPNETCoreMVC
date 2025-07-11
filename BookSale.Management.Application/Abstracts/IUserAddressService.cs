using BookSale.Management.Application.DTOs;

namespace BookSale.Management.Application.Abstracts
{
    public interface IUserAddressService
    {
        Task<IEnumerable<UserAddressDto>> GetUserAddressListForSite(string userId);
        Task<int> SaveAsync(UserAddressDto userAddressDTO);
    }
}
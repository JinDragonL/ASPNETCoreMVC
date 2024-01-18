using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.User;

namespace BookSale.Management.Application.Abstracts
{
    public interface IUserService
    {
        Task<bool> DeleteAsync(string id);
        Task<AccountDTO> GetUserByIdAsync(string id);
        Task<ResponseDatatable<UserModel>> GetUserByPaginationAsync(RequestDatatable request);
        Task<ResponseModel> SaveAsync(AccountDTO accountDTO);
    }
}
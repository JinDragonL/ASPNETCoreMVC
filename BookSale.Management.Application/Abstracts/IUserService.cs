using BookSale.Management.Application.Dtos;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.Application.Abstracts
{
    public interface IUserService
    {
        Task<ResponseModel<string>> CreateAsync(ApplicationUser user, string roleName);
        Task<ResponseModel> DeleteAsync(string id);
        Task<ResponseModel> EditAsync(ApplicationUser applicationUser);
        Task<ApplicationUser> GetByIdAsync(string id);
        Task<ResponseDatatable<UserModel>> GetUserByPagination(RequestDatatable request);
    }
}
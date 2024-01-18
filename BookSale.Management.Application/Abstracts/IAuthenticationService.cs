using BookSale.Management.Application.DTOs;

namespace BookSale.Management.Application.Abstracts
{
    public interface IAuthenticationService
    {
        Task<ResponseModel> CheckLogin(string username, string password, bool hasRemmeber);
    }
}
using BookSale.Management.Application.DTOs;

namespace BookSale.Management.Application.Abstracts
{
    public interface IAuthenticationService
    {
        Task<ResponseModel> LoginAsync(string username, string password, bool rememberMe);
    }
}
using BookSale.Management.Application.Dtos;

namespace BookSale.Management.Application.Abstracts
{
    public interface IAuthenticationService
    {
        Task<ResponseModel> LoginAsync(string username, string password, bool rememberMe);
    }
}
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Application.DTOs.Cart;
using System.Threading.Tasks;

namespace BookSale.Management.Application.Abstracts
{
    public interface ICartService
    {
        Task<bool> SaveAsync(CartRequestDTO bookCartDTOs);
    }
}
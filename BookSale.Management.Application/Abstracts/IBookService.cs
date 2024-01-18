using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.UI.Models;

namespace BookSale.Management.Application.Services
{
    public interface IBookService
    {
        Task DeleteAsync(string code);
        Task<string> GenerateCodeAsync(int number = 10);
        Task<BookViewModel> GetBooksByIdAsync(int id);
        Task<IEnumerable<BookCartDTO>> GetBooksByListCodeAsync(string[] codes);
        Task<ResponseDatatable<BookDTO>> GetBooksByPaginationAsync(RequestDatatable request);
        Task<BookForSiteDTO> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10);
        Task<ResponseModel> SaveAsync(BookViewModel bookVM);
    }
}
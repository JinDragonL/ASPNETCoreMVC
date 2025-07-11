using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.UI.Models;

namespace BookSale.Management.Application.Services
{
    public interface IBookService
    {
        Task<string> GenerateCodeAsync(int number = 10);
        Task<BookViewModel> GetBooksByIdAsync(int id);
        Task<IEnumerable<BookCartDto>> GetBooksByListCodeAsync(string[] codes);
        Task<ResponseDatatable<BookDto>> GetBooksByPaginationAsync(RequestDatatable request);
        Task<BookForSiteDto> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10);
        Task<ResponseModel> SaveAsync(BookViewModel bookVM);
    }
}
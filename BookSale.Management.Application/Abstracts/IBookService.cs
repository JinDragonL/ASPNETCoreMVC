using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Domain.Entities;
using BookSale.Management.UI.Models;

namespace BookSale.Management.Application.Abstracts
{
    public interface IBookService
    {
        Task<ResponseModel> CreateAsync(Book book);
        Task<ResponseModel> EditAsync(Book book);
        Task<string> GenerateCode(int length = 15);
        Task<Book> GetBooksByIdAsync(int id);
        Task<IEnumerable<BookCartDto>> GetBooksByListCodeAsync(string[] codes);
        Task<ResponseDatatable<BookDto>> GetBooksByPaginationAsync(RequestDatatable request);
        Task<BookForSiteDto> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10);
    }
}
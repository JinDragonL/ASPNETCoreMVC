using BookSale.Management.Domain.Entities;

namespace BookSale.Management.Domain.Abstract
{
    public interface IBookRepository
    {
        Task<Book?> GetBooksByIdAsync(int id);
        Task<Book?> GetBooksByCodeAsync(string code);
        Task<(IEnumerable<T>, int)> GetBooksByPagination<T>(int pageIndex, int pageSize, string keyword);
        Task<(IEnumerable<Book>, int)> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10);
        Task<IEnumerable<Book>> GetBooksByListCodeAsync(string[] codes);
        Task<Book> AddAsync(Book book);
        void Update(Book book);
    }
}

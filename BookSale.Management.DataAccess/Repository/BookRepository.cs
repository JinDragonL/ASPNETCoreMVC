using BookSale.Management.DataAccess.Dapper;
using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Abstract;
using BookSale.Management.Domain.Entities;
using Dapper;

namespace BookSale.Management.DataAccess.Repository
{
    public class BookRepository : GenericRepository<Book>, IBookRepository
    {
        private readonly ISQLQueryHandler _sqLQueryHandler;

        public BookRepository(ApplicationDbContext applicationDbContext, ISQLQueryHandler sqLQueryHandler) : base(applicationDbContext)
        {
            _sqLQueryHandler = sqLQueryHandler;
        }

        public async Task<(IEnumerable<T>, int)> GetBooksByPagination<T>(int pageIndex, int pageSize, string keyword)
        {
            DynamicParameters parammeters = new DynamicParameters();

            parammeters.Add("keyword", keyword, System.Data.DbType.String, System.Data.ParameterDirection.Input);
            parammeters.Add("pageIndex", pageIndex, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);
            parammeters.Add("pageSize", pageSize, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);
            parammeters.Add("totalRecords", 0, System.Data.DbType.Int32, System.Data.ParameterDirection.Output);

            var result = await _sqLQueryHandler.ExecuteStoreProdecureReturnListAsync<T>("spGetALLBookByPagination", parammeters);

            var totalRecords = parammeters.Get<int>("totalRecords");

            return (result, totalRecords);
        }

        public async Task<Book?> GetBooksByIdAsync(int id)
        {
            return await base.GetSingleAsync(x => x.Id == id);
        }

        public async Task<Book?> GetBooksByCodeAsync(string code)
        {
            return await base.GetSingleAsync(x => x.Code == code);
        }

        public async Task<IEnumerable<Book>> GetBooksByListCodeAsync(string[] codes)
        {
            return await base.GetAll(x => codes.Contains(x.Code));
        }

        public async Task<Book> AddAsync(Book book)
        {
            await base.Create(book);

            return book;
        }

        public void Update(Book book)
        {
            base.Update(book);
        }

        public async Task<(IEnumerable<Book>, int)> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10)
        {
            IEnumerable<Book> books;

            books = await base.GetAll(x => genreId == 0 || x.GenreId == genreId);

            var totalRecords = books.Count();

            books = books.Skip((pageIndex - 1) * pageSize)
                         .Take(pageIndex * pageSize)
                         .OrderByDescending(x => x.CreatedOn);


            return (books, totalRecords);
        }

    }
}

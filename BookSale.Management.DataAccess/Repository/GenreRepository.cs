using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Abstract;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.DataAccess.Repository
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        public GenreRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }

        public async Task<IEnumerable<Genre>> GetAllAsync()
        {
            return await GetAllAsync(x => x.IsActive);
        }

        public async Task<Genre> GetByIdAsync(int id)
        {
            return await GetSingleAsync(x => x.Id == id);
        }
    }
}

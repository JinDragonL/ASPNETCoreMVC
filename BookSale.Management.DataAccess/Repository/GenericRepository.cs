using BookSale.Management.DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BookSale.Management.DataAccess.Repository
{
    public class GenericRepository<T>  where T : class
    {
        ApplicationDbContext _applicationDbContext;

        public GenericRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>>? expression = null)
        {
            if(expression is null)
            {
                return await _applicationDbContext.Set<T>().ToListAsync();
            }

            return await _applicationDbContext.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<T?> GetSingleAsync(Expression<Func<T, bool>> expression)
        {
            return await _applicationDbContext.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task<T> Create(T entity)
        {
            await _applicationDbContext.Set<T>().AddAsync(entity);

            return entity;
        }

        public T Update(T entity)
        {
             //_applicationDbContext.Set<T>().Update(entity);

            _applicationDbContext.Set<T>().Attach(entity);
            _applicationDbContext.Entry(entity).State = EntityState.Modified; 
            
            return entity;
        }

        public void Delete(T entity)
        {
            _applicationDbContext.Set<T>().Remove(entity);
        }

        public async Task Commit()
        {
           await _applicationDbContext.SaveChangesAsync();
        }

    }
}

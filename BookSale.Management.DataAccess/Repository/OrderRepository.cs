using BookSale.Management.DataAccess.Data;
using BookSale.Management.Domain.Abstract;
using BookSale.Management.Domain.Entities;
using Dapper;

namespace BookSale.Management.DataAccess.Repository
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        private readonly ISQLQueryHandler _sqLQueryHandler;

        public OrderRepository(ApplicationDbContext applicationDbContext, ISQLQueryHandler sqLQueryHandler) : base(applicationDbContext)
        {
            _sqLQueryHandler = sqLQueryHandler;
        }
        public async Task<(IEnumerable<T>, int)> GetByPaginationAsync<T>(int pageIndex, int pageSize, string keyword)
        {
            DynamicParameters parammeters = new DynamicParameters();

            parammeters.Add("keyword", keyword, System.Data.DbType.String, System.Data.ParameterDirection.Input);
            parammeters.Add("pageIndex", pageIndex, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);
            parammeters.Add("pageSize", pageSize, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);
            parammeters.Add("totalRecords", 0, System.Data.DbType.Int32, System.Data.ParameterDirection.Output);

            var result = await _sqLQueryHandler.ExecuteStoreProdecureReturnListAsync<T>("spGetALLOrderByPagination", parammeters);

            var totalRecords = parammeters.Get<int>("totalRecords");

            return (result, totalRecords);
        }

        public async Task SaveAsync(Order order)
        {
            await base.CreateAsync(order);
        }

        public async Task<IEnumerable<T>> GetReportByExcelAsync<T>(string from, string to, int genreId, int status)
        {
            DynamicParameters parammeters = new DynamicParameters();

            parammeters.Add("from", from, System.Data.DbType.String, System.Data.ParameterDirection.Input);
            parammeters.Add("to", to, System.Data.DbType.String, System.Data.ParameterDirection.Input);
            parammeters.Add("genreId", genreId, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);
            parammeters.Add("status", status, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);

            var result = await _sqLQueryHandler.ExecuteStoreProdecureReturnListAsync<T>("spGetReportOrderByExcel", parammeters);

            return result;
        }

        public async Task<IEnumerable<T>> GetChartDataByGenreAsync<T>(int genreId)
        {
            DynamicParameters parammeters = new DynamicParameters();

            parammeters.Add("genreId", genreId, System.Data.DbType.Int32, System.Data.ParameterDirection.Input);

            var result = await _sqLQueryHandler.ExecuteStoreProdecureReturnListAsync<T>("spGetChartDataOrderByGenre", parammeters);

            return result;
        }
    }
}

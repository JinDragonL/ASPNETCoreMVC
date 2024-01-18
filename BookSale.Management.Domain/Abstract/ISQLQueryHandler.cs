using Dapper;
using System.Data;

namespace BookSale.Management.Domain.Abstract
{
    public interface ISQLQueryHandler
    {
        Task ExecuteNonReturnAsync(string query, DynamicParameters parammeters = null, IDbTransaction dbTransaction = null);
        Task<T> ExecuteReturnSingleRowAsync<T>(string query, DynamicParameters parammeters = null, IDbTransaction dbTransaction = null);
        Task<T?> ExecuteReturnSingleValueScalarAsync<T>(string query, DynamicParameters parammeters = null, IDbTransaction dbTransaction = null);
        Task<IEnumerable<T>> ExecuteStoreProdecureReturnListAsync<T>(string storeName, DynamicParameters parammeters = null, IDbTransaction dbTransaction = null);
    }
}
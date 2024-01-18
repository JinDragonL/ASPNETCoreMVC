using BookSale.Management.Domain.Abstract;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BookSale.Management.DataAccess.Dapper
{
    public class SQLQueryHandler : ISQLQueryHandler
    {
        private readonly string _connectionString = string.Empty;
        public SQLQueryHandler(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
        }

        public async Task ExecuteNonReturnAsync(string query, DynamicParameters parammeters = null,
                                                                            IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.ExecuteAsync(query, param: parammeters, dbTransaction);
            }
        }

        public async Task<T?> ExecuteReturnSingleValueScalarAsync<T>(string query, DynamicParameters parammeters = null,
                                                                                IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.ExecuteScalarAsync<T>(query, param: parammeters, dbTransaction);
            }
        }

        public async Task<T> ExecuteReturnSingleRowAsync<T>(string query, DynamicParameters parammeters = null,
                                                                            IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QuerySingleAsync<T>(query, param: parammeters, dbTransaction);
            }
        }

        public async Task<IEnumerable<T>> ExecuteStoreProdecureReturnListAsync<T>(string storeName, DynamicParameters parammeters = null,
                                                                                            IDbTransaction dbTransaction = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<T>(storeName, parammeters, dbTransaction, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace BookSale.Management.DataAccess.Migrations
{
    public partial class addstoreprocedure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			AddGetAllBooksStoreProcedure(migrationBuilder);
			AddGetAllOrderStoreProcedure(migrationBuilder);
			AddGetChartDataOrderByGenreProcedure(migrationBuilder);
			AddGetReportOrderByExcelProcedure(migrationBuilder);
        }

        private void AddGetAllBooksStoreProcedure(MigrationBuilder migrationBuilder)
        {
            string query = $@"
								IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'spGetALLBookByPagination')
								BEGIN
									EXEC('CREATE PROCEDURE spGetALLBookByPagination
												@keyword NVARCHAR(500),
												@pageIndex INT,
												@pageSize INT,
												@totalRecords INT OUT
											AS
											BEGIN
	
												SELECT g.Name as GenreName, b.Code, b.Title, b.Available, b.Cost, b.Publisher, b.Author, b.CreatedOn, b.Id,
														ROW_NUMBER() OVER(ORDER BY b.CreatedOn DESC) as RowNo INTO #tempBook
												FROM Book b JOIN Genre g ON b.GenreId = g.Id AND g.IsActive = 1 AND b.IsActive = 1 
												WHERE ISNULL(@keyword, '''') = '''' OR b.Code LIKE ''%''+@keyword+''%'' 
																				OR b.Title LIKE ''%''+@keyword+''%'' 
																				OR b.Cost LIKE ''%''+@keyword+''%'' 
																				OR b.Publisher LIKE ''%''+@keyword+''%''
																				OR b.Author LIKE ''%''+@keyword+''%''
																				OR g.Name LIKE ''%''+@keyword+''%''

												SELECT @totalRecords = COUNT(*) 
												FROM #tempBook
	
												IF @pageIndex = 0
													SET @pageIndex = 1

												SELECT *
												FROM #tempBook
												WHERE RowNo BETWEEN @pageIndex AND @pageSize * @pageIndex; 

											END')
								END
							";

            migrationBuilder.Sql(query, suppressTransaction: true);
        }

		private void AddGetAllOrderStoreProcedure(MigrationBuilder migrationBuilder)
		{
            string query = $@"
								IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'spGetALLOrderByPagination')
								BEGIN
									EXEC(' CREATE PROCEDURE spGetALLOrderByPagination
										@keyword NVARCHAR(500),
										@pageIndex INT,
										@pageSize INT,
										@totalRecords INT OUT
									AS
									BEGIN
										SELECT o.Id, o.Code, o.CreatedOn, o.PaymentMethod, o.Status, ua.Fullname, 
												SUM(od.Quantity * od.UnitPrice) as TotalPrice,
												ROW_NUMBER() OVER(ORDER BY o.CreatedOn DESC) as RowNo
										INTO #tempOrder
										FROM [Order] o LEFT JOIN UserAddress ua ON o.AddressId = ua.Id 
													   JOIN OrderDetail od ON o.Id = od.OrderId	
										WHERE ISNULL(@keyword, '''') = '''' OR o.Code LIKE ''%''+@keyword+''%'' 
																		OR ua.Fullname LIKE ''%''+@keyword+''%'' 
										GROUP BY o.Id, o.Code, o.CreatedOn, o.PaymentMethod, o.Status, ua.Fullname	

										SELECT @totalRecords = COUNT(*) 
										FROM #tempOrder
	
										IF @pageIndex = 0
											SET @pageIndex = 1

										SELECT *
										FROM #tempOrder
										WHERE RowNo BETWEEN @pageIndex AND @pageSize * @pageIndex; 

									END')
								END
							";

            migrationBuilder.Sql(query, suppressTransaction: true);
        }

        private void AddGetChartDataOrderByGenreProcedure(MigrationBuilder migrationBuilder)
        {
            string query = $@"
								IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'spGetChartDataOrderByGenre')
								BEGIN
									EXEC(' CREATE PROCEDURE spGetChartDataOrderByGenre
									@genreId INT
								AS
								BEGIN
									SELECT g.Name as [Name], COUNT(o.Id) as [Value]
									FROM [Order] o JOIN OrderDetail d ON o.Id = d.OrderId
													JOIN Book b ON b.Id = d.ProductId  
												 RIGHT JOIN Genre g ON b.GenreId = g.Id
									WHERE @genreId = 0 OR g.Id = @genreId
									GROUP BY g.Name
								END')
								END
							";

            migrationBuilder.Sql(query, suppressTransaction: true);
        }

        private void AddGetReportOrderByExcelProcedure(MigrationBuilder migrationBuilder)
        {
            string query = $@"
								IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'spGetReportOrderByExcel')
								BEGIN
									EXEC(' CREATE PROCEDURE spGetReportOrderByExcel
												@from VARCHAR(15),
												@to VARCHAR(15),
												@genreId INT,
												@status INT 
											AS
											BEGIN

												SELECT o.Code, o.CreatedOn, 
														addr.Fullname + '' [Phone number: '' + addr.PhoneNumber + '']'' as CustomerName,
														o.Status,
														SUM(d.Quantity) as TotalQuantity,
														SUM(d.Quantity * d.UnitPrice) as TotalPrice
												FROM [Order] o JOIN OrderDetail d ON o.Id = d.OrderId
																JOIN Book b ON b.Id = d.ProductId AND  (@genreId = 0 OR b.GenreId = @genreId)
																JOIN UserAddress addr ON o.AddressId = addr.Id
												WHERE o.CreatedOn  BETWEEN @from AND @to
													 AND (@status = 0 OR o.Status = @status)
												GROUP BY o.Code, o.CreatedOn, o.Status,
														addr.Fullname,
														addr.PhoneNumber
											END')
								END
							";

            migrationBuilder.Sql(query, suppressTransaction: true);
        }

    }
}

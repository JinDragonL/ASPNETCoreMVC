USE [BookSaleDbManagement]
GO
/****** Object:  StoredProcedure [dbo].[GetALLBookByPagination]    Script Date: 11/26/2023 11:58:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--- GetALLBookByPagination '', 0, 10, 0
CREATE PROCEDURE [dbo].[spGetALLBookByPagination]
	@keyword NVARCHAR(500),
	@pageIndex INT,
	@pageSize INT,
	@totalRecords INT OUT
AS
BEGIN
	
	SELECT a.Id, a.Code, a.Title, a.Author, a.Available, a.Cost, a.Publisher, a.CreatedOn, b.Name as GenreName,
			ROW_NUMBER() OVER(ORDER BY a.CreatedOn DESC) as RowNo INTO #TempTBL
	FROM Book a  JOIN Genre b ON a.GenreId = b.Id AND a.IsActive = 1 AND b.IsActive = 1

	SELECT @totalRecords = COUNT(*) 
	FROM #TempTBL
	
	IF(@pageIndex = 0)
		SET @pageIndex = 1;

	SELECT *
	FROM #TempTBL
	WHERE RowNo BETWEEN @pageIndex AND @pageIndex * @pageSize

END

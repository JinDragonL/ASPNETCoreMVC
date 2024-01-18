using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;

namespace BookSale.Management.Infrastruture.Services
{
    public class ExcelHandler : IExcelHandler
    {
        public ExcelHandler()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        public async Task<byte[]> Export<T>(List<T> dataItems) where T : class, new()
        {
            if (!dataItems.Any())
            {
                return default;
            }

            var stream = new MemoryStream();

            using (var package = new ExcelPackage(stream))
            {
                var workbook = package.Workbook.Worksheets.Add("ReportOrder");

                T obj = new T();

                var properties = obj.GetType().GetProperties();

                //create data
                for (int row = 0; row < dataItems.Count(); row++)
                {
                    var rowData = dataItems[row];

                    for (int col = 0; col < properties.Count(); col++)
                    {
                        workbook.Cells[row + 2, col + 1].Value = rowData.GetType().GetProperty(properties[col].Name).GetValue(rowData);
                    }
                }

                // create header
                for (int i = 0; i < properties.Count(); i++)
                {
                    workbook.Cells[1, i + 1].Value = properties[i].Name;
                    workbook.Column(i + 1).AutoFit();
                    workbook.Cells[1, i + 1].Style.Font.Bold = true;
                    workbook.Cells[1, i + 1].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    workbook.Cells[1, i + 1].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#DDD"));
                }

                await package.SaveAsync();
            }

            return stream.ToArray();
        }
    }
}

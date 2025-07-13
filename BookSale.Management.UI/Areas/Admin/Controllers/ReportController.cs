using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs.Report;
using BookSale.Management.Infrastruture.Services;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class ReportController : BaseController
    {
        private readonly IPDFService _pdfService;
        private readonly IOrderService _orderService;
        private readonly IGenreService _genreService;
        private readonly IExcelHandler _excelHandler;

        public ReportController(IPDFService pDFService,  IOrderService orderService,  IGenreService genreService,
                                    IExcelHandler excelHandler)
        {
            _pdfService = pDFService;
            _orderService = orderService;
            _genreService = genreService;
            _excelHandler = excelHandler;
        }

        [Breadcrumb("Report", "Order Report")]
        public async Task<IActionResult> Index(ReportOrderRequestDto reportRequest)
        {
            IEnumerable<ReportOrderResponseDto> responseDtos = new List<ReportOrderResponseDto>();

            var genres = await _genreService.GetForDropdownlistAsync();
            ViewBag.Genres = genres;

            if(!string.IsNullOrEmpty(reportRequest.From) && !string.IsNullOrEmpty(reportRequest.To))
            {
                responseDtos = await _orderService.GetReportOrderAsync(reportRequest);
            }

            ViewBag.FilterData = reportRequest;

            return View(responseDtos);
        }

        [HttpGet]
        public async Task<IActionResult> ExportPdfOrder(string id)
        {
            var order = await _orderService.GetReportByIdAsync(id);

            string html = await this.RenderViewAsync(RouteData, "_TemplateReportOrder", order, true);

            var result = _pdfService.GeneratePDF(html);

            return File(result, "application/pdf", $"{DateTime.Now.Ticks}.pdf");
        }

        [HttpGet]
        public async Task<IActionResult> ExportExcelOrder(ReportOrderRequestDto reportRequest)
        {
            var responseDTOs = await _orderService.GetReportOrderAsync(reportRequest);

            var stream = await _excelHandler.Export(responseDTOs.ToList());

            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"OrderReport{DateTime.Now.Ticks}.xlsx");
        }
    }
}

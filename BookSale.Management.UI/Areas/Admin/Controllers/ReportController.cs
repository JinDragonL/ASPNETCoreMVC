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

        [Breadscrumb("Order Report", "Report")]
        public async Task<IActionResult> Index(ReportOrderRequestDTO reportRequest)
        {
            IEnumerable<ReportOrderResponseDTO> responseDTOs = new List<ReportOrderResponseDTO>();

            var genres = await _genreService.GetGenresForDropdownlistAsync();
            ViewBag.Genres = genres;

            if(!string.IsNullOrEmpty(reportRequest.From) && !string.IsNullOrEmpty(reportRequest.To))
            {
                responseDTOs = await _orderService.GetReportOrderAsync(reportRequest);
            }

            ViewBag.FilterData = reportRequest;

            return View(responseDTOs);
        }

        [HttpGet]
        public async Task<IActionResult> ExportPdfOrder(string id)
        {
            var order = await _orderService.GetReportByIdAsync(id);

            string html = await this.RenderViewAsync<ReportOrderDTO>(RouteData, "_TemplateReportOrder", order, true);

            var result = _pdfService.GeneratePDF(html);

            return File(result, "application/pdf", $"{DateTime.Now.Ticks}.pdf");
        }

        [HttpGet]
        public async Task<IActionResult> ExportExcelOrder(ReportOrderRequestDTO reportRequest)
        {
            var responseDTOs = await _orderService.GetReportOrderAsync(reportRequest);

            var stream = await _excelHandler.Export<ReportOrderResponseDTO>(responseDTOs.ToList());

            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"OrderReport{DateTime.Now.Ticks}.xlsx");
        }
    }
}

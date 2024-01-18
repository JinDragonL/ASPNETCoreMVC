using BookSale.Management.Application.Abstracts;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class ChartController : BaseController
    {
        private readonly IOrderService _orderService;

        public ChartController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetDataOrderByGenre(int genreId)
        {
            return Json(await _orderService.GetChartDataByGenreAsync(genreId));
        }
    }
}

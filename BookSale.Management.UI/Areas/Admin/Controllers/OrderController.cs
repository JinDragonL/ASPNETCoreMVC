using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Breadscrumb("Order List", "System")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetByPagination(RequestDatatable requestDatatable)
        {
            var data = await _orderService.GetByPaginationAsync(requestDatatable);

            return Json(data);
        }
       
    }
}

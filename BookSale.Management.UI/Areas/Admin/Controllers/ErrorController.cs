using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class ErrorController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

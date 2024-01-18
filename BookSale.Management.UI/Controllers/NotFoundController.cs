using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Controllers
{
    public class NotFoundController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Test()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

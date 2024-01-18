using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Controllers
{
    public class BookController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

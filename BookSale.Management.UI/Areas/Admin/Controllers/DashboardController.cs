using BookSale.Management.Application.Abstracts;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class DashboardController : BaseController
    {
        private readonly IGenreService _genreService;

        public DashboardController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [Breadcrumb("", "Dashboard", false)]
        public async Task<IActionResult> IndexAsync()
        {
            var genres = await _genreService.GetForDropdownlistAsync();
            ViewBag.Genres = genres;

            return View();
        }
    }
}

using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class GenreController : BaseController
    {
        private readonly IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [Breadcrumb("Application", "Genre List")]
        public IActionResult Index()
        {
            var genreMd = new GenreViewModel();

            return View(genreMd);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            return Json(await _genreService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> GetGenrePagination(RequestDatatable requestDatatable)
        {
            var result = await _genreService.GetGenreByPagination(requestDatatable);
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveData(GenreViewModel genreViewModel)
        {
            if(ModelState.IsValid)
            {
                var data = genreViewModel;
            }

            return Json(1);
        }


    }
}

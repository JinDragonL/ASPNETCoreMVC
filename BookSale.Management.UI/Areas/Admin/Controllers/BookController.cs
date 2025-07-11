using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.Application.Services;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class BookController : BaseController
    {
        private readonly IBookService _bookService;
        private readonly IGenreService _genreService;

        public BookController(IBookService bookService, IGenreService genreService)
        {
            _bookService = bookService;
            _genreService = genreService;
        }

        [Breadcrumb("Application", "Book List")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Breadcrumb("Application", "Book Form")]
        public async Task<IActionResult> SaveData(int id)
        {
            var bookVM = new BookViewModel();

            //var genres = await _genreService.GetGenresForDropdownlistAsync();
            //ViewBag.Genres = genres;

            //string code = await _bookService.GenerateCodeAsync();
            //bookVM.Code = code;
            
            //if (id != 0)
            //{
            //    bookVM = await _bookService.GetBooksByIdAsync(id);
            //}

            return View(bookVM);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveData(BookViewModel bookViewModel)
        {
            if(ModelState.IsValid)
            {
                var result = await _bookService.SaveAsync(bookViewModel);

                if (result.Success)
                {
                    return RedirectToAction("", "book");
                }

                ModelState.AddModelError("error", result.Message);
            }
            else
            {
                ModelState.AddModelError("error", "Invalid model");
            }

            return View(bookViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> GetBooksPagination(RequestDatatable requestDatatable)
        {
            var result = await _bookService.GetBooksByPaginationAsync(requestDatatable);

            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> GenerateCodeBook()
        {
            var result = await _bookService.GenerateCodeAsync();

            return Json(result);
        }
    }
}

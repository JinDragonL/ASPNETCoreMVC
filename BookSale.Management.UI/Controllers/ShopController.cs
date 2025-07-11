using AutoMapper.Configuration.Conventions;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.Services;
using BookSale.Management.Domain.Setting;
using BookSale.Management.UI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;

namespace BookSale.Management.UI.Controllers
{
    public class ShopController : Controller
    {
        private readonly IGenreService _genreService;
        private readonly IBookService _bookService;

        public ShopController(IGenreService genreService, IBookService bookService )
        {
            _genreService = genreService;
            _bookService = bookService;
        }

        public async Task<IActionResult> Index(int g = 0, int idx = 1)
        {
            var genres =  _genreService.GetGenresListForSite();

            ViewBag.Genres = genres;
            ViewBag.CurrentGenre = g;
            ViewBag.CurrentPageIndex = idx;

            var result = await _bookService.GetBooksForSiteAsync(g, idx, CommonConstant.BookPageSize);

            return View(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetBooksByPagination(int genre, int pageIndex)
        {
            var result = await _bookService.GetBooksForSiteAsync(genre, pageIndex, CommonConstant.BookPageSize);

            return Json(result);
        }

        
    }
}

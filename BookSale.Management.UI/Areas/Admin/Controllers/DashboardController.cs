﻿using BookSale.Management.Application.Abstracts;
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

        [Breadscrumb("Dashboard")]
        public async Task<IActionResult> IndexAsync()
        {
            var genres = await _genreService.GetGenresForDropdownlistAsync();
            ViewBag.Genres = genres;

            return View();
        }
    }
}

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

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [Breadscrumb("Book List", "Application")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Breadscrumb("Book Form", "Application")]
        public async Task<IActionResult> SaveData(int id)
        {
            var bookVM = new BookViewModel();

            string code = await _bookService.GenerateCodeAsync();
            bookVM.Code = code;
            
            if (id != 0)
            {
                bookVM = await _bookService.GetBooksByIdAsync(id);
            }

            return View(bookVM);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveData(BookViewModel bookViewModel)
        {
            if(ModelState.IsValid)
            {
                var result = await _bookService.SaveAsync(bookViewModel);

                if (result.Status)
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

        [HttpPost]
        public async Task<IActionResult> Delete(string code)
        {
            await _bookService.DeleteAsync(code);

            return Json(true);
        }
    }
}

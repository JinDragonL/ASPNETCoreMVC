using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.Domain.Entities;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class BookController : BaseController
    {
        private readonly IBookService _bookService;
        private readonly IGenreService _genreService;
        private readonly IMapper _mapper;

        public BookController(IBookService bookService, IGenreService genreService, IMapper mapper)
        {
            _bookService = bookService;
            _genreService = genreService;
            _mapper = mapper;
        }

        [Breadcrumb("Application", "Book List")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetBooksPagination(RequestDatatable requestDatatable)
        {
            var result = await _bookService.GetBooksByPaginationAsync(requestDatatable);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var md = new AddBookViewModel();

            md.Genres = await _genreService.GetForDropdownlistAsync();
            md.Code = await _bookService.GenerateCode();

            return View(md);
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddBookViewModel addBook)
        {
            if (ModelState.IsValid)
            {
                var book = _mapper.Map<Book>(addBook);

                await _bookService.CreateAsync(book);

                TempData["SuccessUpdate"] = "Created the book successfully.";
            }
            else
            {
                ModelState.AddModelError("error", "Invalid Model");
            }

            addBook.Genres = await _genreService.GetForDropdownlistAsync();

            return View(addBook);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var book = await _bookService.GetBooksByIdAsync(id);

            var bookVm = _mapper.Map<Book, EditBookViewModel>(book);

            bookVm.Genres = await _genreService.GetForDropdownlistAsync();

            return View(bookVm);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(EditBookViewModel bookViewModel)
        {
            if (ModelState.IsValid)
            {
                var book = await _bookService.GetBooksByIdAsync(bookViewModel.Id);

                if (book is null)
                {
                    ModelState.AddModelError("error", "Book is not exist");
                    return View();
                }

                _mapper.Map(bookViewModel, book);

                await _bookService.EditAsync(book);

                TempData["SuccessUpdate"] = "Updated the book successfully.";
            }
            else
            {
                ModelState.AddModelError("error", "Invalid Model");
            }

            bookViewModel.Genres = await _genreService.GetForDropdownlistAsync();

            return View(bookViewModel);
        }
    }
}

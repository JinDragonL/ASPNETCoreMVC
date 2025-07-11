using AutoMapper;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Application.DTOs.ViewModels;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Abstracts;
using BookSale.Management.Domain.Entities;
using BookSale.Management.Domain.Enums;
using BookSale.Management.UI.Models;
using Microsoft.AspNetCore.Http;

namespace BookSale.Management.Application.Services
{
    public class BookService : IBookService
    {
        IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICommonService _commonService;
        private readonly IImageService _imageService;

        public BookService(IUnitOfWork unitOfWork, IMapper mapper, 
                            ICommonService commonService, IImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _commonService = commonService;
            _imageService = imageService;
        }

        public async Task<ResponseDatatable<BookDto>> GetBooksByPaginationAsync(RequestDatatable request)
        {
            int totalRecords = 0;
            IEnumerable<BookDto> books;

            (books, totalRecords) = await _unitOfWork.BookRepository.GetBooksByPagination<BookDto>(request.SkipItems,
                                                                                                    request.PageSize,
                                                                                                    request.Keyword);

            return new ResponseDatatable<BookDto>
            {
                Draw = request.Draw,
                RecordsTotal = totalRecords,
                RecordsFiltered = totalRecords,
                Data = books
            };
        }

        public async Task<BookViewModel> GetBooksByIdAsync(int id)
        {
            var book = await _unitOfWork.BookRepository.GetBooksByIdAsync(id);
            return  _mapper.Map<BookViewModel>(book);
        }

        public async Task<ResponseModel> SaveAsync(BookViewModel bookVM)
        {
            var book = new Book();

            if ((bookVM.Id ?? 0) == 0)
            {
                book = _mapper.Map<Book>(bookVM);
                book.CreatedOn = DateTime.Now;
                book.Code = bookVM.Code;
            }
            else
            {
                book = await _unitOfWork.BookRepository.GetBooksByIdAsync(bookVM.Id ?? 0);

                book.Title = bookVM.Title;
                book.Description = bookVM.Description;
                book.Author = bookVM.Author;
                book.Available = bookVM.Available;
                book.GenreId = bookVM.GenreId;
                book.Cost = bookVM.Cost;
                book.Publisher = bookVM.Publisher;
                book.IsActive = bookVM.IsActive;
            }

            var result = await _unitOfWork.BookRepository.Save(book);

            await _unitOfWork.Commit();

            if(result)
            {
                await _imageService.SaveImage(new List<IFormFile> { bookVM.Image }, "images/book", $"{book.Id}.png");
            }

            var actionType = bookVM.Id == 0 ? ActionType.Insert : ActionType.Update;
            var successMessage = $"{(bookVM.Id == 0 ? "Insert" : "Update")} successful.";
            var failureMessage = $"{(bookVM.Id == 0 ? "Insert" : "Update")} failed.";

            return new ResponseModel
            {
                Action = actionType,
                Message = result ? successMessage : failureMessage,
                Success = result,
            };
        }

        public async Task<string> GenerateCodeAsync(int number = 10)
        {
            string newCode = string.Empty;

            while (true)
            {
                newCode = _commonService.GenerateRandomCode(number);

                var bookCode = await _unitOfWork.BookRepository.GetBooksByCodeAsync(newCode);

                if (bookCode is null)
                {
                    break;
                }
            }

            return newCode;
        }

        public async Task<BookForSiteDto> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10)
        {
            var (books, totalRecords) = await _unitOfWork.BookRepository.GetBooksForSiteAsync(genreId, pageIndex, pageSize);    

            if (!books.Any())
            {
                return new BookForSiteDto();
            }

            var bookDTOs = _mapper.Map<IEnumerable<BookDto>>(books);

            int currentDisplayingItems = totalRecords - (pageIndex * pageSize) <= 0 ? totalRecords : pageIndex * pageSize;

            bool isDisableButton = totalRecords - (pageIndex * pageSize) <= 0 ? true : false;

            double progressingValue = (pageIndex * pageSize) * 100 / totalRecords;

            return new BookForSiteDto { 
                Books = bookDTOs,
                CurrentRecord = currentDisplayingItems,
                IsDisable = isDisableButton,
                ProgressingValue = progressingValue,
                TotalRecord = totalRecords
            };
        }

        public async Task<IEnumerable<BookCartDto>> GetBooksByListCodeAsync(string[] codes)
        {
            var books = await _unitOfWork.BookRepository.GetBooksByListCodeAsync(codes);

            var result = _mapper.Map<IEnumerable<BookCartDto>>(books);

            return result;
        }
    }
}

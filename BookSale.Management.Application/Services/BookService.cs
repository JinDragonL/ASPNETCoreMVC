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

        public async Task<ResponseDatatable<BookDTO>> GetBooksByPaginationAsync(RequestDatatable request)
        {
            int totalRecords = 0;
            IEnumerable<BookDTO> books;

            (books, totalRecords) = await _unitOfWork.BookRepository.GetBooksByPaginationAsync<BookDTO>(request.SkipItems,
                                                                                                    request.PageSize,
                                                                                                    request.Keyword);

            return new ResponseDatatable<BookDTO>
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

            var result = await _unitOfWork.BookRepository.SaveAsync(book);

            await _unitOfWork.SaveChangeAsync();

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
                Status = result,
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

        public async Task<BookForSiteDTO> GetBooksForSiteAsync(int genreId, int pageIndex, int pageSize = 10)
        {
            var (books, totalRecords) = await _unitOfWork.BookRepository.GetBooksForSiteAsync(genreId, pageIndex, pageSize);    

            var bookDTOs = _mapper.Map<IEnumerable<BookDTO>>(books);

            int currentDisplayingItems = totalRecords - (pageIndex * pageSize) <= 0 ? totalRecords : pageIndex * pageSize;

            bool isDisableButton = totalRecords - (pageIndex * pageSize) <= 0 ? true : false;

            double progressingValue = totalRecords == 0 ? 0 : (pageIndex * pageSize) * 100 / totalRecords;

            return new BookForSiteDTO { 
                Books = bookDTOs,
                CurrentRecord = currentDisplayingItems,
                IsDisable = isDisableButton,
                ProgressingValue = progressingValue,
                TotalRecord = totalRecords
            };
        }

        public async Task<IEnumerable<BookCartDTO>> GetBooksByListCodeAsync(string[] codes)
        {
            var books = await _unitOfWork.BookRepository.GetBooksByListCodeAsync(codes);

            var result = _mapper.Map<IEnumerable<BookCartDTO>>(books);

            return result;
        }

        public async Task DeleteAsync(string code)
        {
            var book = await _unitOfWork.BookRepository.GetBooksByCodeAsync(code);

            book.IsActive = false;

            await _unitOfWork.SaveChangeAsync();
        }
    }
}

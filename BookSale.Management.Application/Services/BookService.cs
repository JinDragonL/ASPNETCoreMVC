using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Abstracts;
using BookSale.Management.Domain.Entities;
using BookSale.Management.UI.Models;

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

        public async Task<Book> GetBooksByIdAsync(int id)
        {
            return await _unitOfWork.BookRepository.GetBooksByIdAsync(id);
        }

        public async Task<string> GenerateCode(int length = 15)
        {
            int maxChecking = 50;
            int attemps = 0;

            while (attemps < maxChecking)
            {
                string code = _commonService.GenerateRandomCode(length);

                var isExist = await _unitOfWork.BookRepository.GetBooksByCodeAsync(code);

                if (isExist is null)
                {
                    return code;
                }

                attemps++;
            }

            return string.Empty;
        }

        public async Task<ResponseModel> CreateAsync(Book book)
        {
            book.CreatedOn = DateTime.UtcNow;

            await _unitOfWork.BookRepository.AddAsync(book);

            await _unitOfWork.CommitAsync();

            return new ResponseModel
            {
                Success = true,
                Message = "Created book successful."
            };
        }

        public async Task<ResponseModel> EditAsync(Book book)
        {
            try
            {
                _unitOfWork.BookRepository.Update(book);

                await _unitOfWork.CommitAsync();

                return new ResponseModel
                {
                    Success = true,
                    Message = "Updated book successful."
                };
            }
            catch (Exception)
            {
                return new ResponseModel
                {
                    Success = false,
                    Message = "Updated book failed."
                };
            }
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

            return new BookForSiteDto
            {
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

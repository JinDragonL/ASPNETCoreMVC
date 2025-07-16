using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.Dtos;
using BookSale.Management.Application.DTOs.Genre;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookSale.Management.Application.Services
{
    public class GenreService : IGenreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GenreService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<GenreDto> GetById(int id)
        {
            var genre = await _unitOfWork.GenreRepository.GetByIdAsync(id);

            return _mapper.Map<GenreDto>(genre);
        }

        public async Task<ResponseDatatable<GenreDto>> GetGenreByPagination(RequestDatatable request)
        {
            var genres = await _unitOfWork.GenreRepository.GetAllAsync();

            var genresDTO = _mapper.Map<IEnumerable<GenreDto>>(genres);

            int totalRecords = genresDTO.Count();

            var result = genresDTO.Skip(request.SkipItems).Take(request.PageSize).ToList();

            return new ResponseDatatable<GenreDto>
            {
                Draw = request.Draw,
                RecordsTotal = totalRecords,
                RecordsFiltered = totalRecords,
                Data = result
            };
        }

        public async Task<List<SelectListItem>> GetForDropdownlistAsync()
        {
            var genres = await _unitOfWork.GenreRepository.GetAllAsync();

            var result = genres.Select(g => new SelectListItem
            {
                Value = g.Id.ToString(),
                Text = g.Name
            });

            return result.ToList();
        }

        public IEnumerable<GenreSiteDto> GetGenresListForSite()
        {
            var result = _unitOfWork.Table<Genre>().Select(x => new GenreSiteDto
            {
                Id = x.Id,
                Name = x.Name,
                TotalBooks = x.Books.Count
            });

            return result;
        }
    }
}

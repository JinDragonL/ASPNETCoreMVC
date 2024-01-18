using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Genre;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

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

        public async Task<GenreDTO> GetByIdAsync(int id)
        {
            var genre = await _unitOfWork.GenreRepository.GetByIdAsync(id);

            return _mapper.Map<GenreDTO>(genre);
        }

        public async Task<ResponseDatatable<GenreDTO>> GetGenreByPaginationAsync(RequestDatatable request)
        {
            var genres = await _unitOfWork.GenreRepository.GetAllAsync();

            var genresDTO = _mapper.Map<IEnumerable<GenreDTO>>(genres);

            int totalRecords = genresDTO.Count();

            var result = genresDTO.Skip(request.SkipItems).Take(request.PageSize).ToList();

            return new ResponseDatatable<GenreDTO>
            {
                Draw = request.Draw,
                RecordsTotal = totalRecords,
                RecordsFiltered = totalRecords,
                Data = result
            };
        }

        public async Task<IEnumerable<SelectListItem>> GetGenresForDropdownlistAsync()
        {
            var genres = await _unitOfWork.GenreRepository.GetAllAsync();

            var result = genres.Select(g => new SelectListItem
            {
                Value = g.Id.ToString(),
                Text = g.Name
            });

            return result;
        }

        public IEnumerable<GenreSiteDTO> GetGenresListForSite()
        {
            var result = _unitOfWork.Table<Genre>().Select(x => new GenreSiteDTO
            {
                Id = x.Id,
                Name = x.Name,
                TotalBooks = x.Books.Count
            }).AsNoTracking();

            return result;
        }
    }
}

using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Genre;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookSale.Management.Application.Abstracts
{
    public interface IGenreService
    {
        Task<GenreDto> GetById(int id);
        Task<ResponseDatatable<GenreDto>> GetGenreByPagination(RequestDatatable request);
        Task<IEnumerable<SelectListItem>> GetGenresForDropdownlistAsync();
        IEnumerable<GenreSiteDto> GetGenresListForSite();
    }
}
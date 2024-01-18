using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Genre;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookSale.Management.Application.Abstracts
{
    public interface IGenreService
    {
        Task<GenreDTO> GetByIdAsync(int id);
        Task<ResponseDatatable<GenreDTO>> GetGenreByPaginationAsync(RequestDatatable request);
        Task<IEnumerable<SelectListItem>> GetGenresForDropdownlistAsync();
        IEnumerable<GenreSiteDTO> GetGenresListForSite();
    }
}
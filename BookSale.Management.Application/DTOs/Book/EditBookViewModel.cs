using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Application.DTOs.ViewModels
{
    public class EditBookViewModel
    {
        public int Id { get; set; }
        [DisplayName("Genre Name")]
        [Required(ErrorMessage = "Genre must be not empty")]
        public int GenreId { get; set; }

        [Required(ErrorMessage = "Title must be not empty")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Code must be not empty")]
        public string Code { get; set; }
        [Required(ErrorMessage = "Available must be not empty")]
        public int Available { get; set; }
        [Required(ErrorMessage = "Cost must be not empty")]
        public double Cost { get; set; }
        public string? Publisher { get; set; }

        [Required(ErrorMessage = "Author must be not empty")]
        public string Author { get; set; }
        public bool IsActive { get; set; }
        public IFormFile? Image { get; set; }
        public List<SelectListItem>? Genres { get; set; }
    }
}

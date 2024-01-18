using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Application.DTOs.ViewModels
{
    public class GenreViewModel
    {
        public int? Id { get; set; } = 0;
        [Required(ErrorMessage = "Genre name must not be empty")]
        public string Name { get; set; }
    }
}

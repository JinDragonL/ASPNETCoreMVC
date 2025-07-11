using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Application.DTOs
{
    public class AccountDto
    {
        public string? Id { get; set; }
        [Required]
        public string RoleName { get; set; }
        [Required(ErrorMessage = "Username must be not empty.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Fullname must be not empty.")]
        public string Fullname { get; set; }
        [Required(ErrorMessage = "Password must be not empty.")]
        [MinLength(3, ErrorMessage = "Password must be greater than 3 characters")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Email must be not empty.")]
        [RegularExpression("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$", ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public string? Address { get; set; }
        public bool IsActive { get; set; }
        public IFormFile? Avatar { get; set; }
    }
}

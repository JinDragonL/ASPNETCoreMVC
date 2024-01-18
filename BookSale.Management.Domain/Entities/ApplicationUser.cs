using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(150)]
        public string? Fullname { get; set; }
        [StringLength(15)]
        public string? MobilePhone { get; set; }
        [StringLength(500)]
        public string? Address { get; set; }
        [Required]
        public bool IsActive { get; set; }
    }
}
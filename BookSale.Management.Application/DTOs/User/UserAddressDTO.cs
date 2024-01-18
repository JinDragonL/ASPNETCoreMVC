using BookSale.Management.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Application.DTOs.User
{
    public class UserAddressDTO
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Username must be not empty.")]
        public string Fullname { get; set; }
        [Required(ErrorMessage = "Phone number must be not empty.")]
        public string PhoneNumber { get; set; }
        [Required(ErrorMessage = "Email must be not empty.")]
        [RegularExpression("^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$", ErrorMessage = "Invalid Email")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Address must be not empty.")]
        public string Address { get; set; }
        public string? OrderId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string? UserId { get; set; }
    }
}

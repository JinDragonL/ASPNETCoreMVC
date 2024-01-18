namespace BookSale.Management.Application.DTOs.ViewModels
{
    public class ExternalLoginModel
    {
        public string? Provider { get; set; }
        public string? ReturnUrl { get; set; }
        public string Email { get; set; }
        public string? Fullname { get; set; }
    }
}

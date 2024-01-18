using Microsoft.AspNetCore.Http;

namespace BookSale.Management.Domain.Abstracts
{
    public interface IImageService
    {
        Task<bool> SaveImage(List<IFormFile> images, string path, string? defaultName);
    }
}
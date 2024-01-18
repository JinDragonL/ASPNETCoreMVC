using BookSale.Management.Domain.Abstracts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace BookSale.Management.Application.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImageService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<bool> SaveImage(List<IFormFile> images, string path, string? defaultName)
        {
            try
            {
                if (images?.Count == 0 || string.IsNullOrEmpty(path))
                {
                    return default;
                }

                string pathImage = Path.Combine(_webHostEnvironment.WebRootPath, path);       //image/user

                if (!Directory.Exists(pathImage))
                {
                    Directory.CreateDirectory(pathImage);
                }

                foreach (var image in images)
                {
                    if (image is not null)
                    {
                        string originalPath = Path.Combine(pathImage, !string.IsNullOrEmpty(defaultName) ? defaultName : image.Name);

                        using (var fileStream = new FileStream(originalPath, FileMode.Create))
                        {
                            await image.CopyToAsync(fileStream);
                        }
                    }
                }
            }
            catch (Exception)
            {
                return default;
            }

            return true;
        }
    }
}

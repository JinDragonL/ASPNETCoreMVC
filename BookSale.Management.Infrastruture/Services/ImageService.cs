using BookSale.Management.Application.Dtos;
using BookSale.Management.Domain.Abstracts;
using Microsoft.AspNetCore.Http;

namespace BookSale.Management.Infrastruture.Services
{
    public class ImageService : IImageService
    {
        public async Task<ResponseModel> SaveImageAsync(List<IFormFile> images, string path, string? defaultName)
        {
            try
            {
                string[] allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

                if (images is null || !images.Any() || string.IsNullOrEmpty(path))
                {
                    return new ResponseModel
                    {
                        Success = false,
                        Message = "No images were uploaded"
                    };
                }

                string pathImage = Path.Combine(Directory.GetCurrentDirectory(), path);       //image/user

                if (!Directory.Exists(pathImage))
                {
                    Directory.CreateDirectory(pathImage);
                }

                var invalidFiles = new List<string>();

                foreach (var image in images)
                {
                    if (image is not null)
                    {
                        var extensionFile = Path.GetExtension(image.FileName);

                        string originalPath = Path.Combine(pathImage, !string.IsNullOrEmpty(defaultName) ? defaultName : image.Name);

                        if (!allowedExtensions.Contains(extensionFile))
                        {
                            invalidFiles.Add(image.FileName);
                            continue;
                        }

                        using var fileStream = new FileStream(originalPath + extensionFile, FileMode.Create);
                        await image.CopyToAsync(fileStream);
                    }
                }

                if (invalidFiles.Any())
                {
                    return new ResponseModel
                    {
                        Success = false,
                        Message = $"Some invalid images {string.Join(";", invalidFiles)} were uploaded"
                    };
                }

                return new ResponseModel
                {
                    Success = true,
                    Message = "Uploaded the images successfully"
                };

            }
            catch (Exception)
            {
                return new ResponseModel
                {
                    Success = true,
                    Message = "An error occured!"
                };
            }
        }

    }
}

using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Domain.Abstracts;
using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookSale.Management.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, 
                            IImageService imageService,
                            IMapper mapper)
        {
            _userManager = userManager;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<ResponseDatatable<UserModel>> GetUserByPagination(RequestDatatable request)
        {
            var users = await _userManager.Users.Where(x => x.IsActive && (string.IsNullOrEmpty(request.Keyword)
                                                       || (x.UserName.Contains(request.Keyword)
                                                            || x.Fullname.Contains(request.Keyword)
                                                            || x.Email.Contains(request.Keyword)
                                                            || x.PhoneNumber.Contains(request.Keyword))))
                                                .Select(x => new UserModel
                                                {
                                                    Email = x.Email,
                                                    Fullname = x.Fullname,
                                                    Phone = x.PhoneNumber,
                                                    Username = x.UserName,
                                                    IsActive = x.IsActive ? "Yes" : "No",
                                                    Id = x.Id
                                                }).ToListAsync();
            int totalRecords = users.Count;

            var result = users.Skip(request.SkipItems).Take(request.PageSize).ToList();

            return new ResponseDatatable<UserModel> {
                Draw = request.Draw,
                RecordsTotal = totalRecords,
                RecordsFiltered = totalRecords,
                Data = result
            };
        }

        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<ResponseModel> CreateAsync(ApplicationUser user, string roleName)
        {
            var identityResult = await _userManager.CreateAsync(user, user.PasswordHash);

            if (!identityResult.Succeeded)
            {
                var errors = string.Join("<br/>", identityResult.Errors.Select(x => x.Description));

                return new ResponseModel
                {
                    Success = false,
                    Message = errors,
                };
            }

            if (identityResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, roleName);
            }

            return new ResponseModel
            {
                Success = true,
                Message = "Insert user successfully",
            };
        }

        public async Task<ResponseModel> EditAsync(ApplicationUser applicationUser)
        {
            var result = await _userManager.UpdateAsync(applicationUser);

            return new ResponseModel
            {
                Success = true,
                Message = "Update user successfully",
            };
        }


        public async Task<ResponseModel> DeleteAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user is null)
            {
                return new ResponseModel
                {
                    Success = false,
                    Message = "User is not exist.",
                };
            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                return new ResponseModel
                {
                    Success = true,
                    Message = "Delete user successfully.",
                };
            }

            return new ResponseModel
            {
                Success = false,
                Message = "Delete user failed.",
            };
        }
    }
}

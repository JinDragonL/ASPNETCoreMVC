using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.User;
using BookSale.Management.Domain.Abstracts;
using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Http;
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

        public async Task<ResponseDatatable<UserModel>> GetUserByPaginationAsync(RequestDatatable request)
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

        public async Task<AccountDTO> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            var role = (await _userManager.GetRolesAsync(user)).First();

            var userDto = _mapper.Map<AccountDTO>(user);

            userDto.RoleName = role;

            return userDto;
        }

        public async Task<ResponseModel> SaveAsync(AccountDTO accountDTO)
        {
            string errors = string.Empty;
            IdentityResult identityResult;

            if (string.IsNullOrEmpty(accountDTO.Id))
            {
                var applicationUser = new ApplicationUser
                {
                    Fullname = accountDTO.Fullname,
                    UserName = accountDTO.Username,
                    IsActive = accountDTO.IsActive,
                    Email = accountDTO.Email,
                    MobilePhone = accountDTO.MobilePhone,
                    PhoneNumber = accountDTO.Phone,
                    Address = accountDTO.Address
                };

                identityResult = await _userManager.CreateAsync(applicationUser, accountDTO.Password);

                if(identityResult.Succeeded)
                {
                    await _userManager.AddToRoleAsync(applicationUser, accountDTO.RoleName);

                    await _imageService.SaveImage(new List<IFormFile> { accountDTO.Avatar }, "images/user", $"{applicationUser.Id}.png");

                    return new ResponseModel
                    {
                        Action = Domain.Enums.ActionType.Insert,
                        Message = "Insert successful.",
                        Status = true,
                    };
                }
            }
            else
            {
                var user = await _userManager.FindByIdAsync(accountDTO.Id);

                user.Fullname = accountDTO.Fullname;
                user.Email = accountDTO.Email;
                user.MobilePhone = accountDTO.MobilePhone;
                user.PhoneNumber = accountDTO.Phone;
                user.Address = accountDTO.Address;
                user.IsActive = accountDTO.IsActive;

                identityResult = await _userManager.UpdateAsync(user);

                if(identityResult.Succeeded)
                {
                    await _imageService.SaveImage(new List<IFormFile> { accountDTO.Avatar }, "images/user", $"{user.Id}.png");

                    var hasRole = await _userManager.IsInRoleAsync(user, accountDTO.RoleName);

                    if (!hasRole)
                    {
                        var oldRoleName = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

                        var removeResult = await _userManager.RemoveFromRoleAsync(user, oldRoleName);

                        if (removeResult.Succeeded)
                        {
                            await _userManager.AddToRoleAsync(user, accountDTO.RoleName);
                        }
                    }

                    return new ResponseModel
                    {
                        Status = true,
                        Message = "Update successful.",
                        Action = Domain.Enums.ActionType.Update
                    };
                }
            }

            errors = string.Join("<br />", identityResult.Errors.Select(x => x.Description));

            return new ResponseModel
            {
                Action = Domain.Enums.ActionType.Insert,
                Message = $"{(string.IsNullOrEmpty(accountDTO.Id) ? "Insert" : "Update")} failed. {errors}",
                Status = false,
            };
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if(user is not null)
            {
                user.IsActive = false;
                await _userManager.UpdateAsync(user);

                return true;
            }

            return false;
        }
    }
}

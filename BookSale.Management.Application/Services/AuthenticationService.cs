using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.Dtos;
using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace BookSale.Management.Application.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<ResponseModel> LoginAsync(string username, string password, bool rememberMe)
        {
            var signInResult = await _signInManager.PasswordSignInAsync(username, password, rememberMe, lockoutOnFailure: true);

            var user = await _userManager.FindByNameAsync(username);

            if (signInResult.IsLockedOut)
            {
                if (user?.LockoutEnd.HasValue == true)
                {
                    var remainningLockOut = user.LockoutEnd.Value - DateTimeOffset.UtcNow;

                    var minutes = Math.Max(1, Math.Round(remainningLockOut.TotalMinutes));

                    return new ResponseModel
                    {
                        Success = false,
                        Message = $"Your account has been locked, Please try again in {minutes}"
                    };
                }
                else
                {
                    return new ResponseModel
                    {
                        Success = false,
                        Message = $"Your account has been locked"
                    };
                }
            }

            if (!signInResult.Succeeded)
            {
                return new ResponseModel
                {
                    Success = false,
                    Message = "Username or password is incorrect"
                };
            }

            var accessFailCount = await _userManager.GetAccessFailedCountAsync(user);

            if (accessFailCount > 0)
            {
                await _userManager.ResetAccessFailedCountAsync(user);
            }

            return new ResponseModel
            {
                Success = true,
                Message = "Login Successful"
            };
        }
    }
}

using BookSale.Management.Application.Abstracts;
using BookSale.Management.Domain.Entities;
using BookSale.Management.UI.Areas.Admin.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [AllowAnonymous]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthenticationController(IAuthenticationService authenticationService, SignInManager<ApplicationUser> signInManager)
        {
            _authenticationService = authenticationService;
            _signInManager = signInManager;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Login()
        {
            var mdLogin = new LoginModel();

            return View(mdLogin);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("error", "Invalid Model");

                return View(loginModel);
            }

            var result = await _authenticationService.LoginAsync(loginModel.Username, loginModel.Password, 
                    loginModel.HasRemember);

            if (!result.Success)
            {
                ModelState.AddModelError("error", result.Message);
            }

            return RedirectToAction("Index", "Dashboard");
        }

        [HttpGet]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();

            return View("Login");
        }

    }
}

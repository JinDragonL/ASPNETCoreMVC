using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.User;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;

        public AccountController(IUserService userService, IRoleService roleService)
        {
            _userService = userService;
            _roleService = roleService;
        }

        [Breadscrumb("Account List", "System")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetAccountPagination(RequestDatatable requestDatatable)
        {
            var data = await _userService.GetUserByPaginationAsync(requestDatatable);
            
            return Json(data);
        }

        [HttpGet]
        [Breadscrumb("Account Form", "System")]
        public async Task<IActionResult> SaveData(string? id)
        {
            AccountDTO accountDto = !string.IsNullOrEmpty(id) ? await _userService.GetUserByIdAsync(id) : new();

            ViewBag.Roles = await _roleService.GetRoleForDropdownlistAsync();

            return View(accountDto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SaveData(AccountDTO accountDTO)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Roles = await _roleService.GetRoleForDropdownlistAsync();
                ModelState.AddModelError("errorsModel", "Invalid model");

                return View(accountDTO);
            }

            var result = await _userService.SaveAsync(accountDTO);

            if (result.Status)
            {
                return RedirectToAction("", "Account");
            }

            ModelState.AddModelError("errorsModel", result.Message);
            ViewBag.Roles = await _roleService.GetRoleForDropdownlistAsync();

            return View(accountDTO);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            return Json(await _userService.DeleteAsync(id));
        }
    }
}

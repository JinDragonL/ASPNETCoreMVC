using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public AccountController(IUserService userService, IRoleService roleService,
            UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userService = userService;
            _roleService = roleService;
            _mapper = mapper;
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetAccountPagination(RequestDatatable requestDatatable)
        {
            var data = await _userService.GetUserByPagination(requestDatatable);

            return Json(data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var accountDto = new CreateAccountDto();

            ViewBag.Roles = await GetDropdownlistRolesAsync();

            return View(accountDto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateAccountDto createAccountDto)
        {
            if (ModelState.IsValid)
            {
                var user = _mapper.Map<ApplicationUser>(createAccountDto);

                var result = await _userService.CreateAsync(user, createAccountDto.RoleName);

                if (!result.Success)
                {
                    ModelState.AddModelError("error", result.Message);
                }
            }
            else
            {
                ModelState.AddModelError("error", "Create account failed");
            }

            ViewBag.Roles = await GetDropdownlistRolesAsync();

            return View(createAccountDto);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string id)
        {
            var accountDto = new EditAccountDto();

            var user = await _userService.GetByIdAsync(id);

            if (user is null)
            {
                ModelState.AddModelError("error", "User is not exist");
            }

            accountDto = _mapper.Map<EditAccountDto>(user);

            var roles = await _userManager.GetRolesAsync(user);

            accountDto.RoleName = roles.FirstOrDefault() ?? "";

            ViewBag.Roles = await GetDropdownlistRolesAsync();

            return View(accountDto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(EditAccountDto editAccountDto)
        {
            var user = await _userManager.FindByIdAsync(editAccountDto.Id!);

            if (user is null)
            {
                ModelState.AddModelError("error", "User is not exist.");
            }

            if (ModelState.IsValid)
            {
                _mapper.Map(editAccountDto, user);

                var result = await _userService.EditAsync(user!);
            }

            ViewBag.Roles = await GetDropdownlistRolesAsync();

            return View(editAccountDto);
        }

        private async Task<IEnumerable<SelectListItem>> GetDropdownlistRolesAsync()
        {
            return await _roleService.GetRoleForDropdownlist();
        }

        [HttpDelete]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(string id)
        {
            var result = _userService.DeleteAsync(id);

            return Json(result);
        }
    }
}

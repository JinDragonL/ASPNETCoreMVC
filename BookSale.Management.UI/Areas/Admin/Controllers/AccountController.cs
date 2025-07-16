using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.Dtos;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Domain.Abstracts;
using BookSale.Management.Domain.Entities;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookSale.Management.UI.Areas.Admin.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly string _imagePath;

        public AccountController(IUserService userService, IRoleService roleService,
           UserManager<ApplicationUser> userManager,
           IMapper mapper,
           IImageService imageService,
           IWebHostEnvironment webHostEnvironment)
        {
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
            _userService = userService;
            _roleService = roleService;
            _userManager = userManager;
            _imageService = imageService;

            _imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images/user");
        }

        [Breadcrumb("Apps", "Account List")]
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

                if (createAccountDto.Image is not null)
                {
                    user.Avatar = Path.GetExtension(createAccountDto.Image.FileName);
                }

                var result = await _userService.CreateAsync(user, createAccountDto.RoleName);

                if (!result.Success)
                {
                    ModelState.AddModelError("error", result.Message);
                }
                else
                {
                    if (createAccountDto.Image is not null)
                    {
                        var resultImages = await _imageService.SaveImageAsync(new List<IFormFile> { createAccountDto.Image },
                                                                           _imagePath, result.Data);

                        if (!resultImages.Success)
                        {
                            ModelState.AddModelError("error", resultImages.Message);
                        }
                    }
                }
            }
            else
            {
                ModelState.AddModelError("error", "Invalid Model");
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

            var roles = await _userManager.GetRolesAsync(user!);

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

                if (editAccountDto.Image is not null)
                {
                    user.Avatar = Path.GetExtension(editAccountDto.Image.FileName);
                }

                var result = await _userService.EditAsync(user!);

                if (editAccountDto.Image is not null)
                {
                    var resultImages = await _imageService.SaveImageAsync(new List<IFormFile> { editAccountDto.Image },
                                                                       _imagePath, editAccountDto.Id);

                    if (!resultImages.Success)
                    {
                        ModelState.AddModelError("error", resultImages.Message);
                    }
                }
            }

            ViewBag.Roles = await GetDropdownlistRolesAsync();

            return View(editAccountDto);
        }
        private async Task<IEnumerable<SelectListItem>> GetDropdownlistRolesAsync()
        {
            return await _roleService.GetRoleForDropdownlist();
        }
    }
}

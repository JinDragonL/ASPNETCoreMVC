using BookSale.Management.Application.Abstracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace BookSale.Management.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleService(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<IEnumerable<SelectListItem>> GetRoleForDropdownlistAsync()
        {
            var roles = await _roleManager.Roles.ToListAsync();

            return roles.Select(x => new SelectListItem
            {
                Value = x.Name,
                Text = x.Name
            });
        }
    }
}

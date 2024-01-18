using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookSale.Management.Application.Abstracts
{
    public interface IRoleService
    {
        Task<IEnumerable<SelectListItem>> GetRoleForDropdownlistAsync();
    }
}
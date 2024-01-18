using BookSale.Management.UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BookSale.Management.UI.Ultility
{
    public class BreadscrumbAttribute : ActionFilterAttribute, IActionFilter
    {
        private readonly string _masterName;
        private readonly string _title;

        public BreadscrumbAttribute(string title, string masterName = "")
        {
            _masterName = masterName;
            _title = title;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.Controller is Controller controller)
            {
                string controllerName = controller.GetType().Name.Replace("Controller", "");

                string path = string.IsNullOrEmpty(_masterName) ? $"{controllerName}" : $"{_masterName}/{controllerName}/{_title}";

                controller.ViewData["Breadscrumb"] = new BreadscrumbModel
                {
                    Title = _title,
                    Path = path
                };
            }
        }
    }
}

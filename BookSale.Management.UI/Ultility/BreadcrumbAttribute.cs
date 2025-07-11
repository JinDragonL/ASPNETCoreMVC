using BookSale.Management.UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BookSale.Management.UI.Ultility
{
    public class BreadcrumbAttribute : ActionFilterAttribute, IActionFilter
    {
        private readonly string _masterName;
        private readonly string _title;
        private readonly bool _hasShowPageName;

        public BreadcrumbAttribute(string masterName, string title, bool hasPageName = true) { 

            _masterName = masterName;
            _title = title;
            _hasShowPageName = hasPageName;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if(context.Controller is Controller controller)
            {
                string controllerName = context.Controller.GetType().Name.Replace("Controller", "");

                string pageName = _hasShowPageName ? _title : string.Empty;

                string path = $"{_masterName}/{controllerName}/{pageName}";

                controller.ViewData["Breadscumb"] = new BreadcrumbModel
                {
                    Title = _title,
                    Path = path
                };
            }
        }
    }
}

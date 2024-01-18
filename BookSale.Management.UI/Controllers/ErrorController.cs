using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace BookSale.Management.UI.Controllers
{
    public class ErrorController : Controller
    {
        private readonly ILogger<ErrorController> _logger;

        public ErrorController(ILogger<ErrorController> logger)
        {
            _logger = logger;
        }
        public IActionResult Index()
        {
            var exception = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            _logger.LogError(exception?.Error.Message);

            if(exception?.Endpoint?.Metadata is EndpointMetadataCollection metadata)
            {
                var controller = metadata.GetMetadata<ControllerActionDescriptor>();

                string areaName = controller.RouteValues["area"];

                if(!string.IsNullOrEmpty(areaName))
                {
                    return Redirect("/admin/error");
                }
            }

            return View();
        }
    }
}

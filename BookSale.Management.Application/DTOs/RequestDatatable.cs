using Microsoft.AspNetCore.Mvc;

namespace BookSale.Management.Application.DTOs
{
    public class RequestDatatable
    {
        [BindProperty(Name = "length")]
        public int PageSize { get; set; }
        [BindProperty(Name = "start")]
        public int SkipItems { get; set; }

        [BindProperty(Name = "search[value]")]
        public string? Keyword { get; set; }
        public int Draw { get; set; }
    }
}

using DinkToPdf;
using DinkToPdf.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSale.Management.Infrastruture.Services
{
    public class PDFService : IPDFService
    {
        private readonly IConverter _conventor;

        public PDFService(IConverter conventor)
        {
            _conventor = conventor;
        }

        public byte[] GeneratePDF(string contentHTML, 
                                    Orientation orientation = Orientation.Portrait,
                                    PaperKind paperKind = PaperKind.A4)
        {
            var globalSetting = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = orientation,
                PaperSize = paperKind,
                Margins = new MarginSettings() { Top = 10, Bottom = 10 },
            };

            var objectSettings = new ObjectSettings()
            {
                PagesCount = true,
                HtmlContent = contentHTML,
                WebSettings = { DefaultEncoding = "utf-8" },
                //HeaderSettings = { FontSize = 9, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 },
                //FooterSettings  = { }
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSetting,
                Objects = { objectSettings }
            };

            return _conventor.Convert(pdf);
        }
    }
}

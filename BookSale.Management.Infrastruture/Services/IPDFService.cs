﻿using DinkToPdf;

namespace BookSale.Management.Infrastruture.Services
{
    public interface IPDFService
    {
        byte[] GeneratePDF(string contentHTML,
                                    Orientation orientation = Orientation.Portrait,
                                    PaperKind paperKind = PaperKind.A4);
    }
}
﻿using BookSale.Management.Application.DTOs.Book;

namespace BookSale.Management.UI.Models
{
    public class BookForSiteDTO
    {
        public int TotalRecord { get; set; }
        public int CurrentRecord { get; set; }
        public bool IsDisable { get; set; }
        public double ProgressingValue { get; set; }
        public IEnumerable<BookDTO> Books { get; set; }

    }
}
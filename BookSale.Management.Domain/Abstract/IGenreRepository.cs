﻿using BookSale.Management.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSale.Management.Domain.Abstract
{
    public interface IGenreRepository
    {
        Task<IEnumerable<Genre>> GetAllGenre();
        Task<Genre> GetById(int id);
    }
}

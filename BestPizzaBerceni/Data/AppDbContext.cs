﻿using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }
    }
}

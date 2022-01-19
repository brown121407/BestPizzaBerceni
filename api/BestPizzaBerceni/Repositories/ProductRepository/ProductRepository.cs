#nullable enable

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.ProductRepository
{
    public class ProductRepository : Repository<Product, int>, IProductRepository
    {
        public ProductRepository(AppDbContext dbContext) : base(dbContext)
        {
            
        }

        public override async Task<Product?> GetByIdAsync(int id)
        {
            return await DbContext.Products
                .Include(p => p.Ingredients)
                .Include(p => p.ProductVariants)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public override async Task<List<Product>> GetAllAsync()
        {
            return await DbContext.Products
                .Include(p => p.Ingredients)
                .Include(p => p.ProductVariants)
                .ToListAsync();
        }
    }
}
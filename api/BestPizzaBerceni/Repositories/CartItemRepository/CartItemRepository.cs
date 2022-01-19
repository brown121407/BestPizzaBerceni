#nullable enable

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.CartItemRepository
{
    public class CartItemRepository : Repository<CartItem, int>, ICartItemRepository
    {
        public CartItemRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
        
        public override Task<List<CartItem>> GetAllAsync()
        {
            return DbContext.CartItems
                .Include(x => x.User)
                .Include(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Ingredients)
                .ToListAsync();
        }

        public override Task<CartItem?> GetByIdAsync(int id)
        {
            return DbContext.CartItems
                .Include(x => x.User)
                .Include(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Ingredients)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task<List<CartItem>> GetByUserId(int userId)
        {
            return DbContext.CartItems
                .Include(x => x.User)
                .Include(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Ingredients)
                .Where(x => x.User.Id == userId)
                .ToListAsync();
        }
    }
}
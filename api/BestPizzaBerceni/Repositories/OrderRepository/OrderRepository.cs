#nullable enable

using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.OrderRepository
{
    public class OrderRepository : Repository<Order, int>, IOrderRepository
    {
        public OrderRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public override Task<List<Order>> GetAllAsync()
        {
            return DbContext.Orders
                .Include(x => x.Address)
                .ThenInclude(x => x.User)
                .Include(x => x.OrderItems)
                .ThenInclude(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .Include(x => x.OrderStatusUpdates)
                .ToListAsync();
        }

        public override Task<Order?> GetByIdAsync(int id)
        {
            return DbContext.Orders
                .Include(x => x.Address)
                .ThenInclude(x => x.User)
                .Include(x => x.OrderItems)
                .ThenInclude(x => x.ProductVariant)
                .ThenInclude(x => x.Product)
                .Include(x => x.OrderStatusUpdates)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
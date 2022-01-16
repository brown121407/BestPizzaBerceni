#nullable enable

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.CouponRepository
{
    public class CouponRepository : Repository<Coupon, int>, ICouponRepository 
    {
        public CouponRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public override async Task<List<Coupon>> GetAllAsync()
        {
            return await DbContext.Coupons
                .Include(c => c.User)
                .ToListAsync();
        }

        public override async Task<Coupon?> GetByIdAsync(int id)
        {
            return await DbContext.Coupons
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
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

        public override List<Coupon> GetAll()
        {
            return DbContext.Coupons
                .Include(c => c.User)
                .ToList();
        }

        public override async Task<List<Coupon>> GetAllAsync()
        {
            return await DbContext.Coupons
                .Include(c => c.User)
                .ToListAsync();
        }

        public override Coupon? GetById(int id)
        {
            return DbContext.Coupons
                .Include(c => c.User)
                .FirstOrDefault(c => c.Id == id);
        }
        
        public override async Task<Coupon?> GetByIdAsync(int id)
        {
            return await DbContext.Coupons
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
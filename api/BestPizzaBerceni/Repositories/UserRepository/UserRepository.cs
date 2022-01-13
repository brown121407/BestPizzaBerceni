#nullable enable

using System.Collections.Generic;
using System.Linq;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.UserRepository
{
    public class UserRepository : Repository<User, int>, IUserRepository
    {
        public UserRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public override List<User> GetAll()
        {
            return DbContext.Users
                .Include(u => u.Roles)
                .Include(u => u.Addresses)
                .ToList();
        }

        public override async Task<List<User>> GetAllAsync()
        {
            return await DbContext.Users
                .Include(u => u.Roles)
                .Include(u => u.Addresses)
                .ToListAsync();
        }

        public override User? GetById(int id)
        {
            return DbContext.Users
                .Include(u => u.Roles)
                .Include(u => u.Addresses)
                .FirstOrDefault(u => u.Id == id);
        }

        public override async Task<User?> GetByIdAsync(int id)
        {
            return await DbContext.Users
                .Include(u => u.Roles)
                .Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await DbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetByEmailWithRolesAsync(string email)
        {
            return await DbContext.Users.Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetByIdWithRolesAsync(int id)
        {
            return await DbContext.Users.Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
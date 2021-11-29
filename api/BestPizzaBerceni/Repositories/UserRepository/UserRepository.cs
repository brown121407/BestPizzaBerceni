using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.UserRepository
{
    public class UserRepository : Repository<User, int>, IUserRepository
    {
        public UserRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await DbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetByIdWithRolesAsync(int id)
        {
            return await DbContext.Users.Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
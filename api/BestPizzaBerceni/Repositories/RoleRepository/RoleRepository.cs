using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Models;
using Microsoft.EntityFrameworkCore;

namespace BestPizzaBerceni.Repositories.RoleRepository
{
    public class RoleRepository: Repository<Role, int>, IRoleRepository
    {
        public RoleRepository(AppDbContext dbContext) : base(dbContext)
        {
            
        }

        public Role? GetByName(string name)
        {
            return DbContext.Roles.FirstOrDefault(r => r.Name == name);
        }

        public async Task<Role?> GetByNameAsync(string name)
        {
            return await DbContext.Roles.FirstOrDefaultAsync(r => r.Name == name);
        }
    }
}
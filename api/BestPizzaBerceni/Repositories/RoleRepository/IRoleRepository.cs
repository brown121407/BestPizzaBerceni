using System.Threading.Tasks;
using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Repositories.RoleRepository
{
    public interface IRoleRepository: IRepository<Role, int>
    {
        public Role? GetByName(string name);
        public Task<Role?> GetByNameAsync(string name);
    }
}
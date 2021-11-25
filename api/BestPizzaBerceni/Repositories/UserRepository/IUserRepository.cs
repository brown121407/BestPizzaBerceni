using System.Threading.Tasks;
using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Repositories.UserRepository
{
    public interface IUserRepository : IRepository<User, int>
    {
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByIdWithRolesAsync(int id);
    }
}
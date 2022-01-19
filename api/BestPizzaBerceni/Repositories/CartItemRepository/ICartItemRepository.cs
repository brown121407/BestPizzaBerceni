using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.Models;

namespace BestPizzaBerceni.Repositories.CartItemRepository
{
    public interface ICartItemRepository : IRepository<CartItem, int>
    {
        public Task<List<CartItem>> GetByUserId(int userId);
    }
}
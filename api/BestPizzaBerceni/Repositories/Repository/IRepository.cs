#nullable enable

using System.Collections.Generic;
using System.Threading.Tasks;

namespace BestPizzaBerceni.Repositories
{
    public interface IRepository<TEntity, TId> where TEntity : class
    {
        public Task<TEntity?> GetByIdAsync(TId id);

        public Task<List<TEntity>> GetAllAsync();
        
        public Task CreateAsync(TEntity entity);

        public Task UpdateAsync(TEntity entity);

        public Task DeleteAsync(TEntity entity);
    }
}

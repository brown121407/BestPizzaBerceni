#nullable enable

using System.Collections.Generic;
using System.Threading.Tasks;

namespace BestPizzaBerceni.Repositories
{
    public interface IRepository<TEntity, TId> where TEntity : class
    {
        public TEntity? GetById(TId id);
        public Task<TEntity?> GetByIdAsync(TId id);

        public List<TEntity> GetAll();
        public Task<List<TEntity>> GetAllAsync();
        
        public void Create(TEntity entity);
        public Task CreateAsync(TEntity entity);

        public void Update(TEntity entity);
        public Task UpdateAsync(TEntity entity);

        public void Delete(TEntity entity);
        public Task DeleteAsync(TEntity entity);
    }
}

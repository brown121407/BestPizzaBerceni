#nullable enable

using BestPizzaBerceni.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BestPizzaBerceni.Repositories
{
    public class Repository<TEntity, TId> : IRepository<TEntity, TId> where TEntity : class
    {
        protected readonly AppDbContext DbContext;

        public Repository(AppDbContext dbContext)
        {
            DbContext = dbContext;
        }
        
        public virtual async Task<TEntity?> GetByIdAsync(TId id)
        {
            return await DbContext.Set<TEntity>().FindAsync(id);
        }
        
        public virtual async Task<List<TEntity>> GetAllAsync()
        {
            return await DbContext.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        public virtual async Task CreateAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);
            await DbContext.SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Update(entity);
            await DbContext.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Remove(entity);
            await DbContext.SaveChangesAsync();
        }
    }
}

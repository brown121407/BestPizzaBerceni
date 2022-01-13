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

        public virtual TEntity? GetById(TId id)
        {
            return DbContext.Set<TEntity>().Find(id);
        }

        public virtual async Task<TEntity?> GetByIdAsync(TId id)
        {
            return await DbContext.Set<TEntity>().FindAsync(id);
        }

        public virtual List<TEntity> GetAll()
        {
            return DbContext.Set<TEntity>().AsNoTracking().ToList();
        }

        public virtual async Task<List<TEntity>> GetAllAsync()
        {
            return await DbContext.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        public void Create(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);
            DbContext.SaveChanges();
        }

        public async Task CreateAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);
            await DbContext.SaveChangesAsync();
        }

        public void Update(TEntity entity)
        {
            DbContext.Set<TEntity>().Update(entity);
            DbContext.SaveChanges();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Update(entity);
            await DbContext.SaveChangesAsync();
        }

        public void Delete(TEntity entity)
        {
            DbContext.Set<TEntity>().Remove(entity);
            DbContext.SaveChanges();
        }

        public async Task DeleteAsync(TEntity entity)
        {
            DbContext.Set<TEntity>().Remove(entity);
            await DbContext.SaveChangesAsync();
        }
    }
}

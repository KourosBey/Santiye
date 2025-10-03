using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<T> GetByIdAsync(Guid id);
        public Task<IReadOnlyList<T>> GetAllAsync();
        public Task<T> AddAsync(T entity);
        public Task UpdateAsync(T entity);
        public Task DeleteAsync(T entity);
    }
}

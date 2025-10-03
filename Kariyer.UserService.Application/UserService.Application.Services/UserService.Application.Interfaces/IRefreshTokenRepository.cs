using Kariyer.UserService.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.Interfaces
{
    public interface IRefreshTokenRepository
    {
        // Token'ı DB'ye ekler (TokenService çağırır)
        public Task AddAsync(RefreshToken token);
        // Token string'i ile DB'den token objesini bulur
        public Task<RefreshToken> GetByTokenAsync(string token);
        // Token durumunu günceller (IsRevoked=true yapmak için)
        public Task UpdateAsync(RefreshToken token);
    }
}

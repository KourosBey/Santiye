using Kariyer.UserService.Application.Interfaces;
using Kariyer.UserService.Domain.Entity;
using Kariyer.UserService.Persistence;
using Kariyer.UserService.Persistence.Context.USDBContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Persistence.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly USDBContext _context;

        // DbContext Enjeksiyonu
        public RefreshTokenRepository(USDBContext context)
        {
            _context = context;
        }

        // 1. Token'ı Veritabanına Ekleme (Create)
        public async Task AddAsync(RefreshToken token)
        {
            // DbSet'i kullanarak Entity'yi ekle
            _context.RefreshTokens.Add(token);

            // Değişiklikleri kalıcı hale getir
            await _context.SaveChangesAsync();
        }

        // 2. Token Değeriyle Veritabanından Okuma (Read)
        public async Task<RefreshToken> GetByTokenAsync(string token)
        {
            // LINQ sorgusu ile token string'ini buluruz.
            // .Include(t => t.ApplicationUser) ile ilişkili kullanıcıyı da çekebiliriz, 
            // ancak sadece token objesi yeterliyse bu satırı silebilirsin.
            return await _context.RefreshTokens
                                 .FirstOrDefaultAsync(t => t.Token == token);
        }

        // 3. Token Durumunu Güncelleme (Update/Revoke)
        public async Task UpdateAsync(RefreshToken token)
        {
            // EF Core, zaten takip ettiği bir Entity'yi Update metoduyla günceller.
            _context.RefreshTokens.Update(token);

            // Veya daha basit: sadece SaveChangesAsync() çağırmak da yeterli olabilir
            // çünkü 'token' nesnesi hafızada değişti.
            await _context.SaveChangesAsync();
        }
    }
}

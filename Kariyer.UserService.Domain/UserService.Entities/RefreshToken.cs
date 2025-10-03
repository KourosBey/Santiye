
using Kariyer.UserService.Domain.UserService.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Domain.Entity
{
    public class RefreshToken
    {
        [Key]
        public Guid Id { get; set; }
        public string Token { get; set; }
        public Guid ApplicationUserId { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime Expires { get; set; }
        public bool IsRevoked { get; set; }
        public DateTime? Revoked { get; set; }
        public string RemoteIpAddress { get; set; }

        // Refresh token tek kullanımlık mı? (Eğer false ise, token süresi bitene kadar tekrar tekrar kullanılabilir.)
        // public bool IsUsed { get; set; } 

        // Token'ın geçerli olup olmadığını kolayca kontrol etmeye yarar
        public bool IsActive => !IsRevoked && (DateTime.UtcNow <= Expires);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication
{
    public class AuthResultDTO
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public Guid UserID { get; set; }
        public string UserName { get; set; }
        public DateTime Expiration { get; set; }
    }
}

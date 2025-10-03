using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Domain.Entity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public long UserNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string VKN { get; set; }
        public string VDIl { get; set; }
        public string VDIsmi { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set; }
        public bool IsActive { get; set; }
        public string UserType { get; set; }

    }
}

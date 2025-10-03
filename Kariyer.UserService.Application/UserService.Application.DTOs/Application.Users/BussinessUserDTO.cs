using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users
{
    public class BussinessUserDTO
    {
        public Guid ID { get; set; }
        public string Username { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TelephoneNumber { get; set; }
        public string VKN { get; set; }
        public string VDIl { get; set; }
        public string VDIsmi { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}

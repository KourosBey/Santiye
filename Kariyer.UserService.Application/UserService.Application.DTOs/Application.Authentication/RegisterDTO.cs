using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication
{
    public class RegisterDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TelephoneNumber { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }

    }
    public class RegisterBussinessDTO
    {
        public string Username { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TelephoneNumber { get; set; }
        public string VKN { get; set; }
        public string VDIl { get; set; }
        public string VDIsmi { get; set; }
    }
}

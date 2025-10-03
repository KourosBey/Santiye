using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users
{
    public class UpdateUserDTO
    {
         public Guid Id { get; set; }

 // Token Claim'lerinde kullanılacak ana kullanıcı adı
 public string Email { get; set; }

 // Opsiyonel: Eğer kullanıcı adını kullanıyorsan
 public string UserName { get; set; }

 // Kullanıcının sahip olduğu rolleri tutan liste.
 // Senin durumunda sadece 1 eleman içerecek.
 public List<string> Roles { get; set; } = new List<string>();

 // Opsiyonel: Eğer ismini de token'a eklemek istersen
 // public string FullName { get; set; }
    }

}

using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces
{
    public interface IPasswordService
    {
        public Response ForgotPasswordRequestAsync(string email);
        public Response ResetPasswordAsync(string email);
        public Response ChangePasswordAsync(string email, string currentPassword, string newPassword);
    }
}

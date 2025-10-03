using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces
{
    public interface IUserService
    {
        public Task<Response<UserDTO>> UpdateProfileAsync(string token, UpdateUserDTO updateDto);
        public Task<Response<UserDTO>> DeleteUserAsync(string token);
        public Task<Response<UserDTO>> GetUserByIdAsync(string token);

    }
}

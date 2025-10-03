using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users;
using Kariyer.UserService.Domain.UserService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<Response<AuthResultDTO>> LoginAsync(LoginDTO request);
        public Task<Response> RegisterAsync(RegisterDTO request);
        public Task<Response> RegisterBussiness(RegisterBussinessDTO request);
        public Task<Response> ConfirmEmailAsync(string userToken,string confirmToken);
        public Task<Response<AuthResultDTO>> RefreshToken(string token);

    }
}

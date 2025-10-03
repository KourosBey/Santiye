using AutoMapper;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users;
using Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces;
using Kariyer.UserService.Domain.UserService.Entities;
using Kariyer.UserService.Domain.Entity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AuthenticationService(UserManager<ApplicationUser> userManager, ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        public Task<Response> ConfirmEmailAsync(string userToken, string confirmToken)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<AuthResultDTO>> LoginAsync(LoginDTO request)
        {

            var user = await _userManager.FindByNameAsync(request.Username);
            List<string> Error = new List<string>();
            if (user == null)
            {
                Error.Add("User not found");

                return new Response<AuthResultDTO> { Data = new AuthResultDTO { }, Errors = Error };
            }
            var passwordCheck = request.Password == user.Password ? true:false;
            if (!passwordCheck)
            {
                Error.Add("Password is incorrect");
                return new Response<AuthResultDTO> { Data = new AuthResultDTO { }, Errors = Error };
            }
            var roles = await _userManager.GetRolesAsync(user);
            var userDto = _mapper.Map<UserDTO>(user);
            var token = await _tokenService.GenerateAuthTokensAsync(userDto);
            if (token == null)
            {
                Error.Add("Token generation failed");
                return new Response<AuthResultDTO> { Data = new AuthResultDTO { }, Errors = Error };
            }
            return new Response<AuthResultDTO> { Data = token, Errors = Error };
        }

        public async Task<Response<AuthResultDTO>> RefreshToken(string token)
        {
            List<string> Error = new List<string>();
            var refreshToken = await _tokenService.RefreshTokenAsync(token);
            if (!refreshToken.IsSuccess)
            {
                Error.AddRange(refreshToken.Errors);
                return new Response<AuthResultDTO> { Data = new AuthResultDTO { }, Errors = Error };
            }
            return new Response<AuthResultDTO> { Data = refreshToken.Data, Errors = Error };
        }

        public async Task<Response> RegisterAsync(RegisterDTO request)
        {
            List<string> errors = new List<string>();
            if (request == null)
            {
                errors.Add("Request is null");
                return new Response { Errors = errors };
            }
            var creatingResponse = await _userManager.CreateAsync(new ApplicationUser
            {
                UserName = request.Username,
                Email = request.Email,
                Password=request.Password,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Il = request.Il,
                PhoneNumber = request.TelephoneNumber,
                Ilce = request.Ilce,
                CreatedTime = DateTime.Now,
                UpdatedTime = DateTime.Now,
                IsActive = true,
                UserType = "Applicant"
            }, request.Password);
            if (creatingResponse.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                var roleAssignResult = await _userManager.AddToRoleAsync(user, "Applicant");
                if (roleAssignResult.Succeeded)
                {
                    UserDTO userDTO = new UserDTO
                    {
                        Id = user.Id,
                        Email = user.Email,
                        UserName = user.UserName,
                        Roles = new List<string> { "Applicant" }
                    };
                    var a = await _tokenService.GenerateAuthTokensAsync(userDTO);
                    if (a == null)
                    {
                        var deleteRole = await _userManager.RemoveFromRoleAsync(user, "Applicant");
                        var delete = await _userManager.DeleteAsync(user);

                        if (delete.Succeeded)
                        {
                            errors.Add("Token generation failed");
                            return new Response { Errors = errors };
                        }
                    }
                    return new Response { };
                }
                else
                {
                    errors.AddRange(roleAssignResult.Errors.Select(e => e.Description));
                    return new Response { Errors = errors };
                }
            }
            else
            {
                errors.Add("User creation failed");
                return new Response { Errors = errors };
            }
        }

        public async Task<Response> RegisterBussiness(RegisterBussinessDTO request)
        {
            List<string> errors = new List<string>();
            if (request == null)
            {
                errors.Add("Request is null");
                return new Response { Errors = errors };
            }
            var creatingResponse = await _userManager.CreateAsync(new ApplicationUser
            {
                UserName = request.Username,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Password=request.Password,
                VKN = request.VKN,
                VDIl = request.VDIl,
                VDIsmi = request.VDIsmi,
                PhoneNumber=request.TelephoneNumber,
                Il = request.Il,
                Ilce = request.Ilce,
                Address = request.Address,
                CreatedTime = DateTime.Now,
                UpdatedTime = DateTime.Now,
                IsActive = true,
                UserType = "Bussiness",
               
               
            });
            if (creatingResponse.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(request.Username);
                var roleAssignResult = await _userManager.AddToRoleAsync(user, "Bussiness");
                if (roleAssignResult.Succeeded)
                {
                    UserDTO userDTO = new UserDTO
                    {
                        Id = user.Id,
                        Email = user.Email,
                        UserName = user.UserName,
                        Roles = new List<string> { "Bussiness" }
                    };
                    var a = await _tokenService.GenerateAuthTokensAsync(userDTO);
                    if (a == null)
                    {
                        var deleteRole = await _userManager.RemoveFromRoleAsync(user, "Bussiness");
                        var delete = await _userManager.DeleteAsync(user);

                        if (delete.Succeeded)
                        {
                            errors.Add("Token generation failed");
                            return new Response { Errors = errors };
                        }
                    }
                    return new Response { };
                }
                else
                {
                    errors.AddRange(roleAssignResult.Errors.Select(e => e.Description));
                    return new Response { Errors = errors };
                }
            }
            else
            {
                errors.Add("User creation failed");
                return new Response { Errors = errors };
            }
        }
    }
}
